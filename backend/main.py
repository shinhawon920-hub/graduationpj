from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FeedbackRequest(BaseModel):
    body: str = Field(..., description="사용자 글 본문")
    title: Optional[str] = None
    grade: Optional[int] = Field(default=None, ge=1, le=6)

class FeedbackResponse(BaseModel):
    score: int = Field(..., ge=0, le=100)
    goodPoints: List[str]
    improvePoints: List[str]
    meta: Dict[str, Any] = {}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/feedback", response_model=FeedbackResponse)
def feedback(req: FeedbackRequest):
    try:
        text = (req.body or "").strip()

        # 입력 검증(B)
        if not text:
            raise HTTPException(status_code=400, detail="body is required")
        if len(text) > 1000:
            raise HTTPException(status_code=400, detail="body is too long (max 1000)")

        # TODO: 실제 피드백 로직 연결 전 임시 stub
        score = 85
        good = [
            "주제가 분명해서 글의 방향이 잘 보여요.",
            "시간 순서대로 내용을 적어서 읽기 쉬워요.",
        ]
        improve = [
            "문장을 조금 더 짧게 나누면 이해하기 쉬워요.",
            "맞춤법을 한 번만 더 확인해보면 글이 더 좋아져요.",
        ]

        return FeedbackResponse(
            score=score,
            goodPoints=good,
            improvePoints=improve,
            meta={"engine": "stub-v1"}
        )

    except HTTPException:
        raise
    except Exception as e:
        # 에러 처리(C) - 일단 500으로 명확히
        raise HTTPException(status_code=500, detail=f"internal error: {type(e).__name__}")
