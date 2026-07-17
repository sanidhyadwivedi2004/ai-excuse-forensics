<div align="center">

# 🕵️ AI Excuse Forensics

### Investigating language. Not people.

An explainable NLP-powered forensic analyzer that examines linguistic risk signals inside excuses using a custom Python engine.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-yellow?logo=python)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 🎥 Demo

> Add your demo GIF or LinkedIn video here.

![Demo](demo.gif)

---

# 🚀 Features

- 🔍 Linguistic forensic analysis
- 📊 Explainable 0–100 suspicion score
- 🧠 Custom NLP heuristic engine
- 🎯 Context-aware analysis
- 📝 Highlighted suspicious phrases
- 📈 Signal breakdown visualization
- 🆔 Unique Case ID generation
- 📄 Investigator verdict
- 📸 Export report as PNG
- ⚡ Beautiful animated interface

---

# ⚙️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Motion
- Lucide React

## Backend

- FastAPI
- Python
- Custom NLP Engine

No paid APIs.

No LLMs.

Everything runs locally.

---

# 🧠 How it Works

```
User Input
      │
      ▼
Context Selection
      │
      ▼
Phrase Detection
      │
      ▼
Signal Extraction
      │
      ▼
Specificity Analysis
      │
      ▼
Verifiability Analysis
      │
      ▼
Weighted Scoring
      │
      ▼
Risk Classification
      │
      ▼
Forensic Report
```

---

# 🔬 Linguistic Signals

The engine analyzes language using handcrafted heuristics.

Current signals include:

- Vagueness
- Hedging
- Emotional Padding
- Convenient Timing
- Context-specific Patterns
- Specificity
- Verifiability


# 📂 Project Structure

```
frontend/
    src/
    public/

backend/
    app/
        engine/
            analyzer.py
            patterns.py
            scoring.py
            verdict.py
```

---

# ▶️ Installation

## Clone

```bash
git clone https://github.com/YOUR_USERNAME/ai-excuse-forensics.git

cd ai-excuse-forensics
```

---

## Backend

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

Install packages

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📊 Calibration

The scoring engine includes regression tests to keep scoring consistent.

Run

```bash
python test_engine.py
```

Example

```
Passed: 6

Failed: 0
```

---

# ⚠️ Disclaimer

AI Excuse Forensics is **not** a lie detector.

It analyzes linguistic patterns and produces an explainable linguistic risk assessment.

The generated score should not be interpreted as proof that a statement is true or false.

---

# 🚧 Limitations

- Uses handcrafted heuristic rules.
- Limited English linguistic coverage.
- Does not use Large Language Models.
- No external AI APIs.
- Intended for educational and demonstration purposes.

---

# 💡 Future Improvements

- Better linguistic coverage
- Multilingual support
- Excuse comparison mode
- Custom rule builder
- Explainable confidence analysis
- Dashboard analytics

---

# ⭐ Support

If you enjoyed this project, consider giving it a ⭐ on GitHub.

Feedback and contributions are always welcome.