
# 📦 PPT System – Full-Stack Platform


| Componente       | Tecnología                       | Propósito                                     |
|------------------|----------------------------------|-----------------------------------------------|
| 🔙 **Backend**    | Python 3 · Flask · MySQL         | API REST, autenticación, carga de imágenes    |
| 🖥️ **Web Admin**  | Flutter React + Electron            | Desarrollo en web y escritorio |
| 📱 **App Móvil**  | Flutter (Android / iOS)          | Aplicación ligera para los usuarios finales   |

---

## ⚙️ Funcionalidades Principales

| Módulo            | Detalles                                                             |
|------------------|----------------------------------------------------------------------|
| 🔐 Autenticación  | Inicio de sesión, registro, JWT, recuperación de contraseña          |
| ✅ Verificación   | Cola de aprobación, botones de aprobar/rechazar, seguimiento de logs |
| 👥 Gestión miembros | Listado, búsqueda, edición, eliminación, carga de avatar             |
| 💬 Mensajería     | Chat 1-a-1 interno, con respuestas simuladas                         |
| 📂 Subida de medios | Almacenamiento de avatares en `instance/uploads/avatars`            |
| 🌙 UI adaptable   | Responsive, soporte dark mode, navegación con drawer/top-bar         |

---

## 📁 Estructura del Proyecto

```plaintext
.
├─ PPTAPIServer/                    # Backend Flask
│  ├─ index.py
│  ├─ routes/
│  ├─ models/
│  ├─ environment/
│  ├─ controllers/
│  ├─ database/
│  ├─ models/
│  ├─ interface/
│  └─ instance/uploads/    # Avatares

├─ PPTClient/              # Aplicación React&Electron Web
│  ├─ src/
│  ├─ env/
│  └─ public/
├─ PPTAPP/                 # Aplicación Flutter Móvil
│  └─ lib/
└─ README.md
```

---

## 🚀 Cómo Empezar

### ▶️ Backend (Flask API)

```bash
PROXIMAMENTE
```

---

### 💻 Frontend Web (React&Electron Web)

```bash
CD PPTClient 
npm install .
npm run electron

```

---

### 📱 Frontend Móvil (Flutter)

```bash
cd PPTAPP
flutter pub get
flutter run -d android-emulator   # o dispositivo físico

## 🗃️ Estructura de Base de Datos (Resumen)

```
PROXIMAMENTE
```

## 📜 Licencia

MIT © 2025 — Proyecto **PPT System**  
**Software libre para conectar, verificar y comunicar**
