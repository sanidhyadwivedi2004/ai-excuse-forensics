import re

from app.engine.patterns import (
    VAGUE_PHRASES,
    HEDGING_PHRASES,
    EMOTIONAL_PADDING,
    TIMING_PHRASES,
    SUSPICIOUS_PHRASES,
    CONTEXT_RISK_PHRASES
)


# Explanation shown in the final forensic report
CATEGORY_REASONS = {
    "vagueness": "Uses vague or non-specific language",
    "hedging": "Reduces certainty or commitment",
    "emotional_padding": "Uses language that reinforces credibility emotionally",
    "convenient_timing": "Describes sudden or conveniently timed circumstances",
    "suspicious_phrase": "Matches a commonly used excuse pattern",
    "context_pattern": "Matches an excuse pattern associated with the selected context",
}


def find_phrases(text: str, phrases: list[str], category: str) -> list[dict]:
    """
    Find all matching phrases inside the excuse.
    """

    matches = []

    for phrase in phrases:
        pattern = rf"\b{re.escape(phrase)}\b"

        for match in re.finditer(pattern, text, flags=re.IGNORECASE):
            matches.append(
                {
                    "text": match.group(),
                    "category": category,
                    "reason": CATEGORY_REASONS[category],
                    "start": match.start(),
                    "end": match.end(),
                }
            )

    return matches

def remove_duplicate_overlaps(matches: list[dict]) -> list[dict]:
    """
    Remove duplicate and overlapping matches.

    When two detected phrases overlap, keep the longer
    and more specific phrase.

    Example:
    "internet stopped working"
    "my internet stopped working"

    The longer match is kept.
    """

    if not matches:
        return []

    # Longer phrases get priority.
    sorted_matches = sorted(
        matches,
        key=lambda item: (
            -(item["end"] - item["start"]),
            item["start"],
        )
    )

    accepted = []

    for match in sorted_matches:
        overlaps = False

        for existing in accepted:
            if (
                match["start"] < existing["end"]
                and match["end"] > existing["start"]
            ):
                overlaps = True
                break

        if not overlaps:
            accepted.append(match)

    # Restore original text order.
    accepted.sort(
        key=lambda item: item["start"]
    )

    return accepted

def analyze_text(text: str, context: str) -> dict:

    vague_matches = find_phrases(
        text,
        VAGUE_PHRASES,
        "vagueness"
    )

    hedging_matches = find_phrases(
        text,
        HEDGING_PHRASES,
        "hedging"
    )

    emotional_matches = find_phrases(
        text,
        EMOTIONAL_PADDING,
        "emotional_padding"
    )

    timing_matches = find_phrases(
        text,
        TIMING_PHRASES,
        "convenient_timing"
    )

    suspicious_matches = find_phrases(
        text,
        SUSPICIOUS_PHRASES,
        "suspicious_phrase"
    )

    context_phrases = CONTEXT_RISK_PHRASES.get(
        context,
        []
    )

    context_matches = find_phrases(
        text,
        context_phrases,
        "context_pattern"
    )

    all_matches = (
        vague_matches
        + hedging_matches
        + emotional_matches
        + timing_matches
        + suspicious_matches
        + context_matches
    )

    clean_matches = remove_duplicate_overlaps(
        all_matches
    )

    counts = {
        "vagueness": 0,
        "hedging": 0,
        "emotional_padding": 0,
        "convenient_timing": 0,
        "suspicious_phrases": 0,
        "context_patterns": 0,
    }

    category_to_count = {
        "vagueness": "vagueness",
        "hedging": "hedging",
        "emotional_padding": "emotional_padding",
        "convenient_timing": "convenient_timing",
        "suspicious_phrase": "suspicious_phrases",
        "context_pattern": "context_patterns",
    }

    for match in clean_matches:

        count_key = category_to_count[
            match["category"]
        ]

        counts[count_key] += 1

    return {
        "counts": counts,
        "flagged_phrases": clean_matches,
    }