# 💬 ChatServer

A real-time chat application built with **Node.js** on the backend and **React.js** on the frontend,
using **Socket.IO** for live, bidirectional communication between users.

> Forked from [ngocluong/chatserver](https://github.com/ngocluong/chatserver)

---

## 📋 Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Architecture Diagram](#architecture-diagram)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ChatServer is a full-stack web application that lets multiple users exchange messages in real time
through a browser-based interface. There is no need to refresh the page — messages appear instantly
as other users type and send them.

This project separates the application into two independent parts:

| Part | Technology | Purpose |
|------|-----------|---------|
| **Server** | Node.js + Express + Socket.IO | Handles connections, routes messages between users |
| **Client** | React.js + TypeScript + Socket.IO client | Provides the chat user interface in the browser |

---

## How It Works

Real-time chat relies on a technology called **WebSockets** (managed here by the Socket.IO library).
Here is the simplified flow:

1. A user opens the app in their browser (the **client**).
2. The browser establishes a persistent, two-way connection to the **server**.
3. When a user types and sends a message, it travels from the browser → server instantly.
4. The server immediately **broadcasts** that message to every other connected browser.
5. All other users see the new message appear without refreshing.

This is different from a normal website where you must click a button and wait for a new page to load.

---

## Project Structure

```
chatserver/
│
├── client/                  # React.js frontend (what users see in the browser)
│   ├── public/              # Static HTML file loaded by the browser
│   ├── src/                 # React source code
│   │   ├── components/      # Individual UI pieces (e.g., message list, input box)
│   │   ├── App.tsx          # Main React component — assembles the full interface
│   │   └── index.tsx        # Entry point — mounts the React app into the browser page
│   ├── package.json         # Frontend dependencies and run scripts
│   └── tsconfig.json        # TypeScript compiler configuration
│
├── server/                  # Node.js backend (runs on your computer or a server)
│   ├── index.js             # Entry point — starts Express and Socket.IO
│   └── package.json         # Backend dependencies and run scripts
│
└── .gitignore               # Files and folders excluded from version control
```

---

## Technology Stack

| Layer | Tool | What It Does |
|-------|------|-------------|
| **Runtime** | [Node.js](https://nodejs.org/) | Runs JavaScript on the server (outside the browser) |
| **Web framework** | [Express.js](https://expressjs.com/) | Handles HTTP requests and serves files |
| **Real-time messaging** | [Socket.IO](https://socket.io/) | Manages live, two-way connections between server and browsers |
| **Frontend framework** | [React.js](https://react.dev/) | Builds the interactive chat user interface |
| **Type safety** | [TypeScript](https://www.typescriptlang.org/) | Adds type checking to JavaScript for fewer bugs |
| **Styling** | CSS | Visual appearance of the chat interface |

**Language breakdown (approximate):**
- JavaScript — 58%
- HTML — 26%
- TypeScript — 13%
- CSS — 3%

---

## Prerequisites

Before you can run this project, you need the following installed on your computer:

### 1. Node.js (version 14 or higher)
Node.js is the engine that runs the server-side code.

- **Check if you have it:** Open a terminal and type `node --version`
- **Download:** https://nodejs.org/en/download

### 2. npm (comes bundled with Node.js)
npm is the package manager that downloads all the libraries this project depends on.

- **Check if you have it:** `npm --version`

### 3. Git (to clone the repository)
- **Download:** https://git-scm.com/downloads

---

## Installation & Setup

Follow these steps in order. Each command is entered in your **terminal** (also called Command Prompt
on Windows, or Terminal on Mac/Linux).

### Step 1 — Clone the repository

Download a copy of the code to your computer:

```bash
git clone https://github.com/dabulseco/chatserver.git
cd chatserver
```

### Step 2 — Install server dependencies

Navigate into the server folder and download the required Node.js packages:

```bash
cd server
npm install
```

> `npm install` reads the `package.json` file and downloads all listed libraries automatically.
> This may take a minute.

### Step 3 — Install client dependencies

Navigate into the client folder and do the same for the React app:

```bash
cd ../client
npm install
```

---

## Running the Application

You will need **two separate terminal windows** — one for the server and one for the client.

### Terminal 1 — Start the backend server

```bash
cd server
npm start
```

You should see a message like:
```
Server listening on port 5000
```

The server is now running and waiting for browser connections.

### Terminal 2 — Start the frontend client

```bash
cd client
npm start
```

Your browser should automatically open to **http://localhost:3000**

> If it does not open automatically, type `http://localhost:3000` in your browser's address bar.

---

## Usage

1. Open the app in your browser at `http://localhost:3000`
2. Enter a username when prompted (or start typing in the message box)
3. Type a message and press **Enter** or click **Send**
4. To test real-time messaging, open a **second browser tab** (or another browser) to the same URL —
   messages sent in one window will appear instantly in the other

---

## Architecture Diagram

```
┌─────────────────────┐         WebSocket (Socket.IO)        ┌─────────────────────┐
│                     │  ◄──────────────────────────────────► │                     │
│   Browser / Client  │                                        │   Node.js Server    │
│   (React + TS)      │  User sends message ────────────────► │   (Express +        │
│                     │                                        │    Socket.IO)       │
│   Chat UI renders   │  ◄──────── Server broadcasts to all   │                     │
│   new messages      │             connected clients          │                     │
└─────────────────────┘                                        └─────────────────────┘
       Browser A                                                      Port 5000
       Browser B  ◄──── also receives the broadcast ─────────────────────────────────
       Browser C  ◄──── also receives the broadcast ─────────────────────────────────
```

When one user sends a message:
- The **client** emits a Socket.IO event to the server
- The **server** receives the event and emits it back out to **all connected clients**
- Every browser's React UI automatically updates to show the new message

---

## Contributing

Contributions are welcome! To suggest a change or fix:

1. **Fork** this repository (click the Fork button at the top of the GitHub page)
2. **Create a branch** for your change: `git checkout -b my-feature`
3. **Make your changes** and commit them: `git commit -m "Add my feature"`
4. **Push** to your fork: `git push origin my-feature`
5. **Open a Pull Request** on GitHub describing what you changed and why

---

## License

This project is open source. Please check the original repository
([ngocluong/chatserver](https://github.com/ngocluong/chatserver)) for license details.

---

*Built with Node.js · React · Socket.IO*
