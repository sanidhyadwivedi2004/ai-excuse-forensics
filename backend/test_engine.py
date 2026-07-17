from app.engine.analyzer import analyze_text
from app.engine.scoring import calculate_suspicion_score
from app.engine.verdict import get_risk_level


TEST_CASES = [
    {
        "name": "Detailed portal failure",
        "context": "College",
        "excuse": (
            "I tried to submit the assignment at 8:30 PM, but the portal "
            "returned an error. I emailed my professor immediately and "
            "attached a screenshot of the error and the completed file."
        ),
        "expected_min": 0,
        "expected_max": 15,
    },
    {
        "name": "Vague college excuse",
        "context": "College",
        "excuse": (
            "Something came up and for some reason I could not submit "
            "the assignment."
        ),
    },
    {
        "name": "Classic deadline excuse",
        "context": "Deadline",
        "excuse": (
            "Honestly, something suddenly came up and my internet stopped "
            "working right before the deadline. Trust me."
        ),
        "expected_min": 45,
        "expected_max": 70,

    },
    {
        "name": "Detailed work explanation",
        "context": "Work",
        "excuse": (
            "I sent the report to my manager by email at 4:15 PM, but I "
            "accidentally attached the previous version. I noticed the mistake "
            "at 4:22 PM and sent the corrected file seven minutes later."
        ),
        "expected_min": 0,
        "expected_max": 15,
    },
    {
        "name": "Vague work excuse",
        "context": "Work",
        "excuse": (
            "There were some issues and things happened, so I could not "
            "finish the work."
        ),
    },
    {
        "name": "Relationship excuse",
        "context": "Relationship",
        "excuse": (
            "My phone was on silent and I forgot to reply because I was "
            "too busy."
        ),
    },
    {
        "name": "Detailed meeting explanation",
        "context": "Meeting",
        "excuse": (
            "The previous client call ended at 2:12 PM, twelve minutes after "
            "the scheduled start of our meeting. I sent a message to my "
            "manager and joined immediately afterward."
        ),
    },
    {
        "name": "Vague meeting excuse",
        "context": "Meeting",
        "excuse": (
            "Something came up suddenly and I lost track of time."
        ),
    },
    {
        "name": "Heavy emotional padding",
        "context": "Deadline",
        "excuse": (
            "Honestly, I swear I am telling the truth. Trust me, I would "
            "never lie about this. Something came up."
        ),
    },
    {
        "name": "Heavy hedging",
        "context": "Work",
        "excuse": (
            "I think maybe I might have misunderstood the deadline. "
            "I am not sure, but perhaps I thought it was due later."
        ),
    },
    {
        "name": "Short but concrete",
        "context": "Meeting",
        "excuse": (
            "My train was delayed by 25 minutes. I sent a message at 9:05 AM."
        ),
    },
    {
        "name": "Pure vagueness",
        "context": "Deadline",
        "excuse": (
            "Somehow something happened for some reason and I couldn't help it."
        ),
        "expected_min": 35,
        "expected_max": 65,

    },
    {
        "name": "No predefined patterns",
        "context": "Work",
        "excuse": (
            "I underestimated how long the analysis would take and did not "
            "allocate enough time to complete it."
        ),
    },
    {
        "name": "Convenient technology failure",
        "context": "Deadline",
        "excuse": (
            "My laptop crashed and the file got corrupted at the last minute."
        ),
    },
    {
        "name": "Direct responsibility",
        "context": "College",
        "excuse": (
            "I forgot the deadline and did not submit the assignment on time."
        ),
        "expected_min": 0,
        "expected_max": 30,
    },
    {
    "name": "Stacked linguistic risk signals",
    "context": "Deadline",
    "excuse": (
        "Honestly, I think maybe something suddenly came up and for some "
        "reason my internet stopped working right before the deadline. "
        "I am not really sure what happened, but trust me, I swear I was "
        "almost finished."
    ),
    "expected_min": 65,
    "expected_max": 100,
    },
]


def get_strongest_risk_signal(signals: dict) -> tuple[str, int]:
    risk_keys = [
        "vagueness",
        "hedging",
        "emotional_padding",
        "convenient_timing",
        "suspicious_phrases",
        "context_patterns",
    ]

    strongest_key = max(
        risk_keys,
        key=lambda key: signals.get(key, 0),
    )

    return (
        strongest_key,
        signals.get(strongest_key, 0),
    )


def run_tests():
    print()
    print("=" * 105)
    print("AI EXCUSE FORENSICS - ENGINE CALIBRATION")
    print("=" * 105)
    passed = 0
    failed = 0

    for index, test in enumerate(TEST_CASES, start=1):
        analysis = analyze_text(
            test["excuse"],
            test["context"],
        )

        scoring = calculate_suspicion_score(
            test["excuse"],
            analysis,
        )

        score = scoring["suspicion_score"]
        signals = scoring["signals"]
        expected_min = test.get("expected_min")
        expected_max = test.get("expected_max")

        status = "INFO"

        if (
            expected_min is not None
            and expected_max is not None
        ):
            if expected_min <= score <= expected_max:
                status = "PASS"
                passed += 1
            else:
                status = "FAIL"
                failed += 1

        strongest_name, strongest_value = (
            get_strongest_risk_signal(signals)
        )

        print()
        print(f"{index:02}. {test['name']}")
        print(f"    Context:       {test['context']}")
        print(f"    Score:         {score}/100")
        print(f"    Risk:          {get_risk_level(score)}")
        print(
            f"    Strongest:     "
            f"{strongest_name} ({strongest_value})"
        )
        print(
            f"    Specificity:   "
            f"{signals['specificity']}"
        )
        print(
            f"    Verifiability: "
            f"{signals['verifiability']}"
        )
        print(
            f"    Flags:         "
            f"{len(analysis['flagged_phrases'])}"
        )

        print(f"    Status:        {status}")
        if (
            expected_min is not None
            and expected_max is not None
        ):
            print(
                f"    Expected:      "
                f"{expected_min}-{expected_max}"
            )

    print()
    print("=" * 105)
    print()
    print("CALIBRATION SUMMARY")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")


if __name__ == "__main__":
    run_tests()
    