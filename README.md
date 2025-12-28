# React WebSocket Chat Client

A real-time chat application built with React, TypeScript, and WebSocket.

## Prerequisites

- **Node.js** v20.19.0 or higher
- **npm** v8.0.0 or higher
- **WebSocket Server** running on port 8080

```bash
node --version
npm --version
```

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Davezu/coding-exam.git
cd coding-exam
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Application

```bash
npm run dev
```

The app will start on `http://localhost:5173`

## How to Connect to WebSocket Server

### WebSocket Endpoint

```
ws://localhost:8080/ws?username=<username>&channel=<channel>
```

### Message Format (Client to Server)

```json
{
  "type": "message",
  "content": "Hello World!",
  "channel": "general"
}
```

### Message Format (Server to Client)

```json
{
  "type": "user_connected",
  "user_id": 123,
  "username": "testKabaw",
  "channel": "general",
  "content": "User connected"
}
```

### Using the Chat Client

1. **Enter username and channel** (default: `testKabaw` / `general`)
2. **Click Connect** to establish WebSocket connection
3. **Type and send messages** in the chat window
4. **Open multiple tabs** to test multi-user chat

### Server Endpoints

| Endpoint                       | Description          |
| ------------------------------ | -------------------- |
| `ws://localhost:8080/ws`       | WebSocket connection |
| `http://localhost:8080/health` | Health check         |
| `http://localhost:8080/stats`  | Server statistics    |

## Available Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Check code quality       |

## Technology Stack

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Tailwind CSS 4.1.18
- WebSocket API

## Troubleshooting

### WebSocket Connection Failed

- Verify server is running on port 8080
- Check server accepts `ws://localhost:8080/ws`
- Ensure server supports `username` and `channel` query parameters

### Module Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Happy coding! 🚀**
