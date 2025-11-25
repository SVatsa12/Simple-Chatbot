# AI Task Assistant Chatbot

An intelligent task management application powered by AI that helps you organize your tasks through natural conversation. Built with React, Express, and Groq's Llama 3.3 model.

![AI Task Assistant](https://img.shields.io/badge/AI-Powered-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange)

## ✨ Features

- 🤖 **Natural Language Processing**: Chat with AI to manage tasks in plain English
- 📋 **Smart Task Management**: Add, view, complete, and delete tasks through conversation
- 📅 **Intelligent Date Parsing**: AI automatically extracts due dates from your messages
- 📊 **Real-time Statistics**: Track total tasks, completed tasks, and today's completions
- 💾 **Local Storage**: Your data stays private - all tasks stored locally in your browser
- 🎨 **Modern UI**: Clean, responsive interface with purple gradient theme
- ⚡ **Fast AI Responses**: Powered by Groq's ultra-fast inference engine

## 🚀 Demo

- **Landing Page**: Beautiful introduction with feature highlights
- **Chat Interface**: Conversational AI assistant for task management
- **Task Dashboard**: Visual task list with priority levels and due dates
- **Statistics Panel**: Live stats on your productivity

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite 6.4.1** - Build tool and dev server
- **React Router DOM 6.30.2** - Client-side routing
- **Axios 1.13.2** - HTTP client

### Backend
- **Node.js & Express 5.1.0** - Server framework
- **Groq SDK** - AI integration (Llama 3.3 70B)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Groq API key ([Get one here](https://console.groq.com))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SVatsa12/Simple-Chatbot.git
   cd Simple-Chatbot
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   
   Create `server/.env` file:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   NODE_ENV=development
   ```

4. **Start the application**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the app**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 💬 Usage Examples

### Adding Tasks
- "Add task: Buy groceries tomorrow"
- "Create a meeting reminder for 3pm"
- "Add task: Make a GenAI ppt and the due date is 1 Dec"

### Managing Tasks
- "Show me my tasks for today"
- "I completed the groceries task"
- "Mark presentation as done"
- "What tasks do I have?"

### General Conversation
- "Hello!"
- "What can you help me with?"

## 📂 Project Structure

```
TaskAssistantChatbot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS stylesheets
│   │   └── utils/         # Helper functions
│   ├── public/
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic (AI client)
│   │   └── index.js      # Server entry point
│   ├── .env              # Environment variables (not in repo)
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### POST `/api/chat`
Send a message to the AI assistant

**Request:**
```json
{
  "message": "Add task: Buy groceries tomorrow",
  "tasks": []
}
```

**Response:**
```json
{
  "success": true,
  "action": "add_task",
  "message": "Got it! I've added 'Buy groceries' to your tasks for tomorrow.",
  "task": {
    "title": "Buy groceries",
    "priority": "medium",
    "dueDate": "2025-11-26"
  }
}
```

### GET `/health`
Health check endpoint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for ultra-fast AI inference
- [Meta AI](https://ai.meta.com/) for Llama 3.3 model
- [React](https://react.dev/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

## 📧 Contact

Project Link: [https://github.com/SVatsa12/Simple-Chatbot](https://github.com/SVatsa12/Simple-Chatbot)

---

⭐ If you find this project helpful, please consider giving it a star!
