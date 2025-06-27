import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { io } from "socket.io-client";
import { Session } from "bc-react-session";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";
import icon_main from "../../../../../application/Assets/img/icon_main.png";

export default function Chat() {
  const session = Session.get("user_information");
  const currentUserId = session.payload["user_id"];
  const [friends, setFriends] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const router = new GlobalAPIRouter();

  // Socket reference to keep the instance
  const socketRef = useRef(null);

  // Conectar socket una vez
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API); // URL backend socket

    // Unirse a sala con el id del usuario actual para recibir mensajes directos
    socketRef.current.emit("join_room", currentUserId);

    // Escuchar mensajes nuevos enviados al usuario
    socketRef.current.on("receive_message", (message) => {
      // Solo agregar mensaje si viene del usuario con el que chateamos
      if (message.sender === selectedFriendId || message.sender === "me") {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentUserId, selectedFriendId]);

  // Cargar contactos igual que antes
  useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await axios.post(router.routerUser.callMember);
        if (res.data && Array.isArray(res.data)) {
          const contacts = res.data
            .filter(user => String(user[0]) !== String(currentUserId) && user[1] !== 0)
            .map(user => ({
              id: String(user[0]),
              name: user[2],
              avatar: user[9] ? `${router.routerUser.callImage}${user[9]}` : icon_main,
            }));
          setFriends(contacts);
        }
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    }
    fetchFriends();
  }, [router.routerUser.callMember, router.routerUser.callImage, currentUserId]);

  // Cargar mensajes cuando selecciono contacto
  useEffect(() => {
    if (!selectedFriendId) {
      setMessages([]);
      return;
    }
    setLoadingMessages(true);
    async function fetchMessages() {
      try {
        const res = await axios.post(router.routerMessage.getMessage, {
          from_id: currentUserId,
          to_id: selectedFriendId,
        });
        if (res.data && Array.isArray(res.data)) {
          const msgs = res.data.map((msg) => ({
            id: msg.id,
            sender: msg.sender_id === currentUserId ? "me" : msg.sender_id,
            text: msg.message,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(msgs);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    }
    fetchMessages();
  }, [selectedFriendId, currentUserId, router.routerMessage.getMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar mensaje
  const handleSend = async () => {
    if (!input.trim() || !selectedFriendId) return;
    const newMessage = {
      id: `m_${Date.now()}`,
      sender: "me",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      // Enviar por HTTP para guardar en BD
      await axios.post(router.routerMessage.sendMessage, {
        by_id: currentUserId,
        to_id: selectedFriendId,
        message: newMessage.text,
        timestamp: newMessage.timestamp.toISOString(),
      });

      // Emitir mensaje por socket para entrega en tiempo real
      socketRef.current.emit("send_message", {
        sender: currentUserId,
        receiver: selectedFriendId,
        text: newMessage.text,
        timestamp: newMessage.timestamp.toISOString(),
      });
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };
  return (
    <ChatWrapper>
      <ContactsPanel>
        <h2>Contactos</h2>
        <ContactList>
          {friends.map((friend) => (
            <ContactItem
              key={friend.id}
              selected={friend.id === selectedFriendId}
              onClick={() => setSelectedFriendId(friend.id)}
            >
              <Avatar src={friend.avatar} alt={friend.name} />
              <Name>{friend.name}</Name>
            </ContactItem>
          ))}
        </ContactList>
      </ContactsPanel>

      <ChatPanel>
        {!selectedFriendId && (
          <EmptyState>Selecciona un contacto para comenzar</EmptyState>
        )}

        {selectedFriendId && (
          <>
<ChatHeader>
  <UserHeaderInfo>
    <AvatarMini
      src={
        friends.find((f) => f.id === selectedFriendId)?.avatar || icon_main
      }
      alt="avatar"
    />
    <h3>{friends.find((f) => f.id === selectedFriendId)?.name || ""}</h3>
  </UserHeaderInfo>
</ChatHeader>
            <MessagesContainer>
              {loadingMessages ? (
                <Loading>Cargando mensajes...</Loading>
              ) : messages.length === 0 ? (
                <NoMessages>No hay mensajes aún</NoMessages>
              ) : (
                messages.map((msg) => (
                  <MessageBubble key={msg.id} isMine={msg.sender === "me"}>
                    {msg.text}
            
                  </MessageBubble>
                ))
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputArea
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <TextInput
                type="text"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <SendButton type="submit" disabled={!input.trim()}>
                Enviar
              </SendButton>
            </InputArea>
          </>
        )}
      </ChatPanel>
    </ChatWrapper>
  );
}

const ChatWrapper = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #121212;
  color: #eee;
  width: 100%;
`;

const ContactsPanel = styled.div`
  width: 20%;
  border-right: 1px solid #333;
  background: #1f1f1f;
  padding: 20px;
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 20px;
    font-weight: 600;
  }
`;

const ContactList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${({ selected }) => (selected ? "#333" : "transparent")};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #444;
  }
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

const ChatPanel = styled.div`
  flex-grow: 1;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  margin: auto;
  font-size: 1.25rem;
  color: #666;
`;

const ChatHeader = styled.header`
  padding: 20px;
  border-bottom: 1px solid #333;
  font-weight: 700;
  font-size: 1.3rem;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #181818;
`;

const Loading = styled.div`
  margin: auto;
  color: #999;
`;

const NoMessages = styled.div`
  margin: auto;
  color: #777;
  font-style: italic;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 12px 16px;
  background: ${({ isMine }) => (isMine ? "#4a90e2" : "#333")};
  color: ${({ isMine }) => (isMine ? "#fff" : "#ddd")};
  align-self: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  border-radius: 20px;
  position: relative;
  font-size: 0.95rem;
  box-shadow: ${({ isMine }) =>
    isMine ? "0 1px 4px rgba(74,144,226,.5)" : "none"};
`;

const Timestamp = styled.span`
  position: absolute;
  bottom: -16px;
  right: 14px;
  font-size: 10px;
  color: #aaa;
`;

const InputArea = styled.form`
  display: flex;
  padding: 15px 20px;
  border-top: 1px solid #333;
  background: #1f1f1f;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 12px 16px;
  border-radius: 20px;
  border: none;
  font-size: 1rem;
  background: #333;
  color: #eee;
  outline: none;
  transition: background 0.3s ease;
  &:focus {
    background: #444;
  }
`;

const SendButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  margin-left: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
  &:disabled {
    background: #7fa9d9;
    cursor: not-allowed;
  }
  &:hover:enabled {
    background: #357abd;
  }
`;
const UserHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarMini = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4a90e2;
`;