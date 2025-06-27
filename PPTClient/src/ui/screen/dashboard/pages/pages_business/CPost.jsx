import React, { useState, useRef } from "react";
import axios from "axios";
import { Session } from "bc-react-session";
import styled from "styled-components";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";

export function PublicacionScreen() {
  const session = Session.get("user_information");
const currentUserId = session.payload["user_id"];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result.split(",")[1]);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    setImageBase64(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !imageBase64) {
      alert("Por favor completa todos los campos");
      return;
    }
    let router = new GlobalAPIRouter();

    setIsLoading(true);
    try {
      const timestamp = new Date().toISOString();
      const response = await axios.post(`${router.auditoria.savePost}`, {
        title: title.trim(),
        content: content.trim(),
        image_base64: imageBase64,
        iduser: currentUserId,
        timestamp: timestamp,
      });

      if (response.status === 200 || response.status === 201) {
        if (response.data === "BAD_QUERY_RESPONSE") {
          alert("Error: Hubo un error en el guardado, intente más tarde.");
        } else {
          alert("Publicación guardada con éxito");
          setTitle("");
          setContent("");
          resetImage();
        }
      } else {
        alert(`Error: ${response.status}`);
      }
    } catch (error) {
      alert(`Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <FormCard>
        <Title>Crear Publicación</Title>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa el título de la publicación"
          disabled={isLoading}
          autoComplete="off"
        />
        <Label htmlFor="content">Contenido</Label>
        <Textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe el contenido aquí..."
          disabled={isLoading}
        />

        <Label>Imagen</Label>
        {!imagePreview ? (
          <ImageUploadButton
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            disabled={isLoading}
            aria-label="Seleccionar imagen"
          >
            Seleccionar Imagen
          </ImageUploadButton>
        ) : (
          <ImagePreviewContainer>
            <PreviewImage src={imagePreview} alt="Preview" />
            <ChangeImageButton
              type="button"
              onClick={resetImage}
              disabled={isLoading}
              aria-label="Cambiar imagen"
            >
              Cambiar Imagen
            </ChangeImageButton>
          </ImagePreviewContainer>
        )}

        <HiddenFileInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          disabled={isLoading}
        />

        <SubmitButton onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Cargando..." : "Guardar Publicación"}
        </SubmitButton>
      </FormCard>
    </Wrapper>
  );
}

// Styled Components

const Wrapper = styled.div`
  background: #1a1919;
  min-height: 100vh;
  width: 100vw;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const FormCard = styled.div`
  background: #acacac;
  padding: 32px 36px;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  border: 1px solid #d1d5db;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #374151;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2563eb;
  user-select: none;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #6b7280;
  user-select: none;
`;

const inputStyles = `
  width: 100%;
  padding: 12px 18px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  outline: none;
  color: #111827;
  background-color: #f9fafb;
  transition: border-color 0.25s ease;

  &:focus {
    border-color: #2563eb;
    background-color: #fff;
  }

  &:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  ${inputStyles}
   width: 100%;
  padding: 5px;
`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  width: 100%;
  padding: 5px;
`;

const ImageUploadButton = styled.button`
  margin-top: 10px;
  padding: 14px 24px;
  background: #2563eb;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ImagePreviewContainer = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 320px;
  border-radius: 10px;
  object-fit: contain;
  user-select: none;
  border: 1px solid #cbd5e1;
`;

const ChangeImageButton = styled.button`
  padding: 12px 28px;
  border-radius: 8px;
  border: 1px solid #6b7280;
  background-color: transparent;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease;

  &:hover:not(:disabled) {
    background-color: #e0e7ff;
    color: #2563eb;
    border-color: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 16px 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  background-color: #2563eb;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
