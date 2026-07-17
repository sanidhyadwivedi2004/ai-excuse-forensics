import re


def calculate_specificity(text: str) -> int:
    """
    Estimate how specific the excuse is.

    Looks for:
    - Numbers
    - Times
    - Dates
    - Longer explanations
    """

    score = 20

    # Numbers can indicate concrete details
    if re.search(r"\d", text):
        score += 20

    # Time expressions
    time_patterns = [
        r"\b\d{1,2}:\d{2}\b",
        r"\b\d{1,2}\s?(am|pm)\b",
        r"\b(morning|afternoon|evening|night)\b",
    ]

    if any(
        re.search(pattern, text, re.IGNORECASE)
        for pattern in time_patterns
    ):
        score += 20

    # More detailed explanations get some specificity credit
    word_count = len(text.split())

    if word_count >= 15:
        score += 15

    if word_count >= 30:
        score += 15

    return min(score, 100)


def calculate_verifiability(text: str) -> int:
    """
    Estimate whether the excuse contains details
    that could potentially be checked or verified.
    """

    score = 20

    verifiable_terms = [
        "email",
        "message",
        "screenshot",
        "receipt",
        "doctor",
        "hospital",
        "ticket",
        "report",
        "portal",
        "notification",
        "calendar",
        "manager",
        "professor",
        "teacher",
        "client",
    ]

    text_lower = text.lower()

    matches = sum(
        1 for term in verifiable_terms
        if term in text_lower
    )

    score += matches * 15

    return min(score, 100)


def calculate_signal_score(count: int, points_per_match: int) -> int:
    """
    Convert the number of detected signals into
    a category score between 0 and 100.
    """

    return min(count * points_per_match, 100)


def calculate_suspicion_score(text: str, analysis: dict) -> dict:
    """
    Calculate the final linguistic suspicion score.

    Important:
    This measures linguistic risk signals.
    It does NOT determine whether someone is lying.
    """

    counts = analysis["counts"]

    vagueness = calculate_signal_score(
        counts["vagueness"],
        35
    )

    hedging = calculate_signal_score(
        counts["hedging"],
        30
    )

    emotional_padding = calculate_signal_score(
        counts["emotional_padding"],
        25
    )

    convenient_timing = calculate_signal_score(
        counts["convenient_timing"],
        30
    )

    suspicious_phrases = calculate_signal_score(
        counts["suspicious_phrases"],
        35
    )

    context_patterns = calculate_signal_score(
        counts["context_patterns"],
        25
    )

    specificity = calculate_specificity(text)
    verifiability = calculate_verifiability(text)

    # Weighted base risk score
    base_score = (
        vagueness * 0.20
        + hedging * 0.12
        + emotional_padding * 0.10
        + convenient_timing * 0.16
        + suspicious_phrases * 0.12
        + context_patterns * 0.10
        + (100 - specificity) * 0.10
        + (100 - verifiability) * 0.10
    )

    # Count active linguistic risk categories
    risk_values = [
        vagueness,
        hedging,
        emotional_padding,
        convenient_timing,
        suspicious_phrases,
        context_patterns,
    ]

    active_risk_categories = sum(
        1
        for value in risk_values
        if value > 0
    )

    # Multi-signal interaction bonus
    interaction_bonus_table = {
        0: 0,
        1: 0,
        2: 4,
        3: 9,
        4: 15,
        5: 22,
        6: 30,
    }

    interaction_bonus = interaction_bonus_table[
        active_risk_categories
    ]

    # Calibrate score to a wider 0-100 range
    calibrated_score = (
        base_score * 1.35
        + interaction_bonus
    )

    # Prevent statements with no detected risk categories
    # from scoring highly only because they lack
    # specificity or verifiable keywords.
    if active_risk_categories == 0:
        calibrated_score = min(
            calibrated_score,
            20
        )

    # Final safe 0-100 score
    final_score = round(
        min(
            max(calibrated_score, 0),
            100
        )
    )

    return {
        "suspicion_score": final_score,
        "signals": {
            "vagueness": vagueness,
            "hedging": hedging,
            "emotional_padding": emotional_padding,
            "convenient_timing": convenient_timing,
            "suspicious_phrases": suspicious_phrases,
            "context_patterns": context_patterns,
            "specificity": specificity,
            "verifiability": verifiability,
        }
    }

    