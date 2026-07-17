# -----------------------------------------
# AI Excuse Forensics
# Linguistic Pattern Library
# -----------------------------------------


# Vague language avoids concrete details
VAGUE_PHRASES = [
    "something came up",
    "some issue",
    "some problem",
    "some stuff",
    "things happened",
    "a lot happened",
    "for some reason",
    "somehow",
    "somewhere",
    "someone",
    "stuff happened",
    "personal reasons",
    "personal issue",
    "family issue",
    "family emergency",
    "unexpected circumstances",
    "unforeseen circumstances",
    "due to circumstances",
    "couldn't help it",
]


# Hedging reduces commitment or certainty
HEDGING_PHRASES = [
    "maybe",
    "probably",
    "perhaps",
    "I think",
    "I guess",
    "I believe",
    "I might have",
    "I may have",
    "as far as I know",
    "I don't really remember",
    "I can't remember exactly",
    "I am not sure",
    "I'm not sure",
    "kind of",
    "sort of",
]


# Emotional language that may reinforce credibility
EMOTIONAL_PADDING = [
    "honestly",
    "seriously",
    "literally",
    "trust me",
    "believe me",
    "I swear",
    "I promise",
    "I feel terrible",
    "I feel really bad",
    "please believe me",
    "you have to believe me",
    "I would never lie",
    "I am telling the truth",
    "I'm telling the truth",
]


# Words associated with convenient or sudden timing
TIMING_PHRASES = [
    "suddenly",
    "at the last minute",
    "just before",
    "right before",
    "unexpectedly",
    "out of nowhere",
    "randomly",
    "all of a sudden",
    "at that exact moment",
    "at the worst possible time",
]


# Common phrases that deserve additional forensic attention
SUSPICIOUS_PHRASES = [
    "my internet stopped working",
    "the internet went down",
    "my wifi stopped working",
    "my alarm didn't go off",
    "my phone died",
    "my battery died",
    "my laptop crashed",
    "my computer crashed",
    "the file got corrupted",
    "the file disappeared",
    "I forgot to click submit",
    "I thought I submitted it",
    "I didn't see the message",
    "I didn't get the notification",
    "traffic was terrible",
    "there was an emergency",
]


# Context-specific patterns
CONTEXT_PATTERNS = {

    "College": [
        "assignment",
        "professor",
        "teacher",
        "class",
        "exam",
        "submission",
        "attendance",
        "project",
        "deadline",
        "portal",
    ],

    "Work": [
        "boss",
        "manager",
        "client",
        "office",
        "task",
        "report",
        "email",
        "work",
        "project",
    ],

    "Relationship": [
        "message",
        "call",
        "phone",
        "busy",
        "forgot",
        "reply",
        "text",
        "sleep",
    ],

    "Meeting": [
        "meeting",
        "calendar",
        "notification",
        "invite",
        "call",
        "schedule",
        "traffic",
        "late",
    ],

    "Deadline": [
        "deadline",
        "submit",
        "upload",
        "file",
        "internet",
        "portal",
        "finished",
        "almost finished",
    ],
}

CONTEXT_RISK_PHRASES = {
    "College": [
        "forgot the assignment",
        "forgot to submit",
        "thought I submitted",
        "portal was not working",
        "portal stopped working",
        "couldn't upload",
        "could not upload",
        "missed the deadline",
        "alarm didn't go off",
    ],

    "Work": [
        "didn't see the email",
        "did not see the email",
        "forgot the task",
        "thought it was done",
        "computer crashed",
        "system was down",
        "client didn't respond",
        "waiting for the client",
        "forgot to send",
    ],

    "Relationship": [
        "didn't see your message",
        "did not see your message",
        "phone was on silent",
        "fell asleep",
        "was too busy",
        "forgot to reply",
        "battery died",
        "phone died",
    ],

    "Meeting": [
        "forgot the meeting",
        "didn't see the invite",
        "did not see the invite",
        "calendar didn't notify me",
        "calendar did not notify me",
        "lost track of time",
        "traffic was terrible",
        "call didn't connect",
    ],

    "Deadline": [
        "almost finished",
        "upload failed",
        "internet stopped working",
        "file got corrupted",
        "file was corrupted",
        "forgot to submit",
        "thought I submitted",
        "portal stopped working",
        "missed the deadline",
    ],
}