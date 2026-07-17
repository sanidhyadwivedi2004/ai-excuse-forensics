import secrets


def generate_case_id() -> str:
    """
    Generate a short unique forensic case ID.

    Example:
    AXF-7D3A91
    """

    random_code = secrets.token_hex(3).upper()

    return f"AXF-{random_code}"


def get_risk_level(score: int) -> str:
    """
    Convert the 0-100 suspicion score
    into a human-readable risk level.
    """

    if score <= 24:
        return "LOW"

    elif score <= 49:
        return "MODERATE"

    elif score <= 74:
        return "HIGH"

    else:
        return "CRITICAL"


def generate_verdict(score: int, signals: dict) -> str:
    """
    Generate an investigator-style verdict based
    on the strongest linguistic risk signals.
    """

    risk_signals = {
        "vagueness": signals["vagueness"],
        "hedging": signals["hedging"],
        "emotional padding": signals["emotional_padding"],
        "convenient timing": signals["convenient_timing"],
        "suspicious phrase patterns": signals["suspicious_phrases"],
    }

    # Sort signals from highest to lowest
    strongest_signals = sorted(
        risk_signals.items(),
        key=lambda item: item[1],
        reverse=True
    )

    # Keep only signals that were actually detected
    detected_signals = [
        name
        for name, value in strongest_signals
        if value > 0
    ]

    if score <= 24:
        return (
            "The statement shows relatively few linguistic risk signals. "
            "The explanation appears reasonably specific and does not contain "
            "many patterns commonly associated with vague or defensive excuses."
        )

    elif score <= 49:
        if detected_signals:
            strongest = detected_signals[0]

            return (
                f"The statement shows moderate linguistic risk signals, "
                f"with {strongest} being the strongest detected pattern. "
                "Some parts of the explanation may benefit from additional "
                "specific or verifiable details."
            )

        return (
            "The statement shows moderate linguistic uncertainty, "
            "but no single dominant risk pattern was detected."
        )

    elif score <= 74:
        top_signals = detected_signals[:2]

        if len(top_signals) >= 2:
            signal_text = (
                f"{top_signals[0]} and {top_signals[1]}"
            )
        elif top_signals:
            signal_text = top_signals[0]
        else:
            signal_text = "multiple linguistic patterns"

        return (
            f"The statement contains elevated linguistic risk signals, "
            f"particularly {signal_text}. "
            "The explanation may contain limited specificity or details "
            "that are difficult to independently verify."
        )

    else:
        return (
            "The statement contains a high concentration of linguistic "
            "risk signals across multiple categories. The combination of "
            "vague, defensive, or conveniently timed language warrants "
            "closer examination and additional context."
        )