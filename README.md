# Flaggr - Harmful Speech Detection & Moderation


Flaggr is an AI-powered harmful speech detection and moderation chatbot designed to help identify toxic and harmful language in online conversations. It combines a **interactive interface**, a **Flask REST API**, and **fine tuned DistilBERT model** to analyze user messages and provide feedback.

The project is designed with use cases such as **community platforms, social platforms, and customer support systems**, where moderators need to identify harmful behavior quickly without manually reviewing every message.

---

## Features

*  **Harmful Speech Detection**

  * Detects whether a message is safe or harmful using a fine-tuned DistilBERT model.

* **Multi-Label Classification**

  * Identifies different types of harmful behavior from a harmful message.
    
* **Violation Management**

  * Designed to track repeated harmful behavior and support moderation actions.
    
* **Conversational Chat Interface**

  * Users can interact with Flaggr through a simple chatbot style interface.

*  **Real Time API Communication**

  * React communicates with the Flask backend through REST API requests.

* **Responsive Design**

  * Optimized for desktop, tablet and mobile screens.

*  **Modern UI**

  * Built with Tailwind CSS with a minimal interface.

*  **Smooth UI Animations**

  * Framer Motion is used for chat and interface transitions.

---

#  How It Works

Flaggr follows a simple pipeline:

```text
             User
               │
               ▼
        React Chat Interface
               │
               │ POST /predict
               ▼
        Flask REST API
               │
               ▼
       Text Preprocessing
               │
               ▼
        DistilBERT Model
               │
        ┌──────┴──────┐
        ▼             ▼
      Safe          Harmful
                      │
                      ▼
             Multi-Label Analysis
                      │
                      ▼
           Real Time Feedback
                      │
                      ▼
              React Chat UI
```

The frontend does not directly interact with the model. The Flask backend acts as an intermediary between the React application and the machine learning models.

---

# 🏗️ Project Architecture

The project is divided into three major layers:

### 1. Frontend

Built using:

* React
* Tailwind CSS
* Axios
* React Router
* Framer Motion
* Lucide React
* React Icons

Responsible for:

* User interaction
* Chat interface
* Message rendering
* Loading and typing states
* Responsive navigation
* API communication
* Displaying moderation results

### 2. Backend

Built using:

* Python
* Flask
* Flask-CORS
* PyTorch
* Hugging Face Transformers

Responsible for:

* Receiving user messages
* Loading trained models
* Running inference
* Returning moderation results
* Providing REST API endpoints

### 3. Machine Learning

Built using:

* DistilBERT
* PyTorch
* Hugging Face Transformers

The model is fine-tuned on labeled harmful speech dataset and used for text classification.

---

# 🤖 Machine Learning Pipeline

## 1. Dataset
## Source dataset: UCBerkeley D-Lab Measuring Hate Speech dataset
The project uses UCBerkley dataset for training and evaluating the classification models.

Original Dataset: 135,556 annotated instances
After Aggregation: 39,565 unique comment text
Experimental subset: 15,000 comment text
---

## 2. Text Preprocessing

Before being passed to the model, text goes through preprocessing to reduce unnecessary noise.

The pipeline is:

```text
Raw Text
   │
   ▼
Text Cleaning
   │
   ▼
Regex Processing
   │
   ▼
Tokenization
   │
   ▼
DistilBERT Input
```

---

## 3. Binary Classification

The first stage determines whether a message is harmful.

```text
             Input Message
                  │
                  ▼
              DistilBERT
                  │
          ┌───────┴───────┐
          ▼               ▼
        SAFE            HARMFUL
```

Example:

```text
"Thank you for helping me."
            ↓
           SAFE
```

A harmful message is passed to the next stage for more detailed analysis.

---

## 4. Multi-Label Classification

The second stage provides more detailed information about harmful content.

A hateful message can belong to multiple categories.

## Categories in Flaggr project :
Insult, Humiliate, Dehumanize, Genocide, Violence

---

# 🧪 Model Training

The models are fine tuned rather than training a language model from scratch.

General training pipeline:

```text
Dataset
   │
   ▼
Preprocessing
   │
   ▼
Train / Validation Split
   │
   ▼
DistilBERT Tokenization
   │
   ▼
Fine-Tuning
   │
   ▼
Evaluation
   │
   ▼
Saved Model + Tokenizer
```

The trained model and tokenizer are saved locally and loaded by the Flask backend during application startup.

---

# Backend API

The Flask backend exposes an endpoint for text classification.

### Endpoint

```http
POST /predict
```

### Request

```json
{
  "text": "Your message here"
}
```

### Example Response

```json
{
  "message": "Harmful speech detected."
}
```

The backend processes the input using the trained model and returns the result as JSON.

---

# Frontend Architecture

The React frontend follows a component-based architecture.

```text
src/
│
├── api/
│   └── api.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── SidebarButton.jsx
│   ├── ChatWindow.jsx
│   ├── ChatBubble.jsx
│   ├── UserBubble.jsx
│   ├── BotBubble.jsx
│   ├── TypingBubble.jsx
│   ├── MessageInput.jsx
│   └── EmptyState.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── pages/
│   └── ChatPage.jsx
│
├── App.jsx
└── main.jsx
```

---

# React State Management

The chat page uses React's `useState` to manage dynamic UI data.

### Messages

```jsx
const [messages, setMessages] = useState([]);
```

Stores the conversation between the user and Flaggr.

### Input

```jsx
const [input, setInput] = useState("");
```

Stores the text currently being entered by the user.



#  Frontend ↔ Backend Communication

Axios is used to communicate with the Flask API.

The process is:

```text
User enters message
        │
        ▼
React state updated
        │
        ▼
Axios POST request
        │
        ▼
Flask /predict
        │
        ▼
DistilBERT inference
        │
        ▼
JSON response
        │
        ▼
React updates messages
        │
        ▼
Response displayed
```

---

#  User Interface


### Main UI components

* Hero interface
* Chat interface
* User and bot message bubbles
* AI typing indicator
* Responsive sidebar
* Navigation bar
* Message input
* Moderation result cards
* User profile area
* Violation related interface

---

# Responsive Design

The application is designed to work across different screen sizes.

### Desktop

```text
┌──────────────┬──────────────────────────────┐
│              │                              │
│   Sidebar    │          Chat Area           │
│              │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

### Mobile

```text
┌─────────────────────────┐
│ ☰   Flaggr              │
├─────────────────────────┤
│                         │
│       Chat Area         │
│                         │
│                         │
├─────────────────────────┤
│   Type your message...  │
└─────────────────────────┘
```

The desktop sidebar transforms into a mobile navigation drawer controlled through React state.

---

# 🛠️ Technologies

| Technology                | Purpose                       |
| ------------------------- | ----------------------------- |
| React                     | Frontend UI                   |
| Tailwind CSS              | Styling and responsive design |
| Framer Motion             | UI animations                 |
| Axios                     | API communication             |
| React Router              | Frontend routing              |
| Lucide React              | Interface icons               |
| React Icons               | Additional icons              |
| Flask                     | Backend REST API              |
| Flask-CORS                | Cross-origin communication    |
| Python                    | Backend and ML                |
| PyTorch                   | Model inference               |
| Hugging Face Transformers | DistilBERT implementation     |
| DistilBERT                | Text classification           |

---

# Backend Structure

The backend structure:

```text
new_NLP/
│
├── app.py
│
├── utils/
│   └── predictor.py
│
├── models/
│   ├── binary_model/
│   │   ├── config.json
│   │   ├── model.safetensors
│   │   ├── tokenizer.json
│   │   └── tokenizer_config.json
│   │
│   └── multilabel_model/
│       └── ...
│
└── requirements.txt
```

`predictor.py` is responsible for loading the trained models and performing inference.

The models are loaded when the backend starts rather than being loaded for every individual request.

---

# Installation & Setup

## Prerequisites

For the project to run, we need:

* Node.js
* npm
* Python 3.x
* Git

---

## 1. Clone the Repository

```bash
git clone <repository-url>

cd Flaggr
```

---

# Frontend Setup

Navigate to the frontend directory:

```bash
cd hate_speech
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local development URL shown by Vite.

---

# Backend Setup

Open another terminal and navigate to the backend:

```bash
cd new_NLP
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend will run locally on the configured Flask port.

---

# 🔐 Environment Variables

API configuration should be kept separate from the source code.

For example:

```env
VITE_API_URL=http://localhost:5000
```

The frontend API configuration can then use the environment variable instead of hardcoding the backend URL.

---

# 🧪 Testing the API

The `/predict` endpoint can be tested using tools such as Postman.

### Request

```http
POST http://localhost:5000/predict
```

### Body

```json
{
  "text": "Example message"
}
```

The response can then be inspected before connecting it to the React frontend.

---

# Future Improvements

Planned improvements include:

*  User authentication and profiles
* Persistent chat history
* More detailed moderation reports
* Safer alternative wording suggestions
* Model improvement with additional training data



---

## ⭐ Conclusion

Flaggr demonstrates how **NLP and modern web technologies can work together to create safer online communication**.

By combining **DistilBERT-based text classification, a Flask REST API, and a responsive React interface**, the project provides a foundation for an AI-assisted moderation platform that can detect harmful content, classify problematic behavior, and help online communities maintain healthier conversations.


