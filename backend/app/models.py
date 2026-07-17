from typing import Literal

from pydantic import BaseModel, Field


class ExcuseRequest(BaseModel):
    excuse: str = Field(
        ...,
        min_length=5,
        max_length=2000,
        description="The excuse to analyze"
    )

    context: Literal[
        "College",
        "Work",
        "Relationship",
        "Meeting",
        "Deadline"
    ]