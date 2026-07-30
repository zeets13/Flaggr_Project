# Flaggr

An AI-powered harmful speech detection platform that analyzes user messages in real time using Natural Language Processing (NLP). Flaggr combines a modern chatbot interface with transformer based language models to detect toxic content and encourage healthier online conversations.

# Overview

Flaggr is an AI moderation assistant designed to identify harmful language in digital conversations. The application allows users to submit messages through an interactive chatbot interface and instantly receive AI generated feedback.
The system was built with use cases such as:

-  Community forums
-  Social media platforms
-  Customer support systems
-  Educational discussion platforms

where moderators need to identify toxic behavior quickly without manually reviewing every message.

## Features

### AI-Powered Detection

- Binary Hate Speech Detection (Safe / Harmful)
- Transformer based BERT model
- Real-time prediction

###  Modern Chat Interface

- Responsive chatbot UI
- Smooth message animations
- Typing indicator
- Auto scroll
- Landing page 

### Intelligent Moderation

- Instant moderation feedback
- AI-generated response
- Context-aware prediction

### User Experience

- User profile (planned)
- Chat history (planned)
- SQLite database integration (planned)
- Theme switching (planned)

---

# 🏗️ System Architecture

```
                React Frontend
                      │
          REST API (Axios Requests)
                      │
                Flask Backend
                      │
              BERT Hate Speech Model
                      │
                Prediction Result
                      │
           Chatbot Response Display
```

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Axios
- Lucide React
- React Icons

---

## Backend

- Flask
- Flask-CORS
- Python

---

## AI / NLP

- Hugging Face Transformers
- DistilBERT
- RoBERTa
- PyTorch
- Scikit-learn
- Pandas

---

## Database

- SQLite

---

# AI Model

The application currently uses a fine-tuned **DistilBERT** model for binary hate speech classification.

### Input

```
"I hate you."
```

↓

### Output

```
Harmful speech detected.

Please consider using more respectful language.
```

The model is loaded once during server startup and reused for all incoming requests to minimize inference time.

---

# How It Works

1. User enters a message.
2. React sends the message to the Flask API.
3. Flask preprocesses the request.
4. DistilBERT predicts whether the text is harmful.
5. Flask returns the prediction.
6. React displays the AI response in the chatbot.

---

# Author

**Jarifa Tasnim**

Computer Science & Engineering

Jagannath University
