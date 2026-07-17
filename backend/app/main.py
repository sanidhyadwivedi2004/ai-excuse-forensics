from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.engine.scoring import calculate_suspicion_score
from app.models import ExcuseRequest
from app.engine.analyzer import analyze_text
from app.engine.verdict import (
    generate_case_id,
    get_risk_level,
    generate_verdict,
)


app = FastAPI(
    title="AI Excuse Forensics API",
    description="Analyzes linguistic risk signals in excuses.",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Excuse Forensics API is running",
        "status": "online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/api/analyze")
def analyze_excuse(request: ExcuseRequest):

    # Step 1: Detect linguistic patterns
    analysis = analyze_text(
    request.excuse,
    request.context
)

    # Step 2: Calculate forensic scores
    scoring = calculate_suspicion_score(
        request.excuse,
        analysis
    )

    suspicion_score = scoring["suspicion_score"]
    signals = scoring["signals"]

    # Step 3: Generate report metadata
    case_id = generate_case_id()
    risk_level = get_risk_level(suspicion_score)

    # Step 4: Generate investigator's verdict
    verdict = generate_verdict(
        suspicion_score,
        signals
    )

    return {
        "case_id": case_id,
        "context": request.context,
        "excuse": request.excuse,
        "suspicion_score": suspicion_score,
        "risk_level": risk_level,
        "signals": signals,
        "flagged_phrases": analysis["flagged_phrases"],
        "verdict": verdict,
        "disclaimer": (
            "This score measures linguistic risk signals "
            "and is not a lie detector."
        )
    }