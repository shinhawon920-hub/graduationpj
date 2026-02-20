// src/pages/WritePage.jsx
import "../styles/layout.css";
import "../styles/write.css";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { requestFeedback } from "../api/feedback";

export default function WritePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [goal, setGoal] = useState("");
  const [feeling, setFeeling] = useState("");
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [drafts, setDrafts] = useState([]);

  const charCount = body.length;
  const charLimit = 1000;

  const previewTitle = title.trim() ? title.trim() : "이야기 제목이 여기 보여요";
  const previewBody = body.trim()
    ? body.trim()
    : "여기에 내가 쓴 이야기가 어린이 책처럼 보여요. 문장이 너무 길지는 않은지, 어려운 말은 없는지 한 번 더 살펴볼 수 있어요.";

  // (임시) 속성은 추후 property 페이지/더미데이터 연동 시 교체
  const previewTags = useMemo(
    () => ["주인공: 나", "장소: 학교", "기분: 즐거워요"],
    []
  );

  const loadDraftsFromStorage = () => {
    try {
      const raw = sessionStorage.getItem("writingDrafts_v1");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveDraftsToStorage = (nextDrafts) => {
    try {
      sessionStorage.setItem("writingDrafts_v1", JSON.stringify(nextDrafts));
    } catch {
      // ignore
    }
  };

  const handleComplete = async () => {
    if (!body.trim()) {
      alert("글을 입력해주세요.");
      return;
    }
    try {
      const result = await requestFeedback(body.trim(), 3);
      navigate("/feedback", {
        state: {
          ...result,
          title: title.trim() || "제목 없음",
          body: body.trim(),
          goal: goal.trim(),
          feeling: feeling.trim(),
          // 백엔드가 score/goodPoints/improvePoints를 주지 않으면 피드백 페이지에서 fallback 사용
          score: result.score ?? 85,
          goodPoints: result.goodPoints,
          improvePoints: result.improvePoints,
        },
      });
    } catch (err) {
      console.error(err);
      let message = err.message || "피드백 요청에 실패했습니다.";
      if (message.includes("Failed to fetch") || message === "피드백 요청에 실패했습니다.") {
        message += "\n\n(Vercel: VITE_API_URL, Render: ALLOWED_ORIGINS 확인)";
      }
      alert(message);
    }
  };

  const handleTempSave = () => {
    const draft = {
      id: String(Date.now()),
      title,
      body,
      goal,
      feeling,
      savedAt: new Date().toISOString(),
    };

    try {
      // 마지막 임시 저장본 (이전 호환용)
      sessionStorage.setItem("writingDraft", JSON.stringify(draft));

      // 여러 개 임시 저장 리스트
      const existing = loadDraftsFromStorage();
      const next = [draft, ...existing];
      saveDraftsToStorage(next);
    } catch (_) {}
    // UX는 추후 토스트로 교체 가능
    alert("임시 저장되었습니다.");
  };

  const handleOpenDraftModal = () => {
    const list = loadDraftsFromStorage();
    if (!list.length) {
      alert("임시 저장된 글이 없습니다.");
      return;
    }
    setDrafts(list);
    setShowDraftModal(true);
  };

  const handleCloseDraftModal = () => {
    setShowDraftModal(false);
  };

  const handleLoadDraft = (draft) => {
    setTitle(draft.title || "");
    setBody(draft.body || "");
    setGoal(draft.goal || "");
    setFeeling(draft.feeling || "");
    setShowDraftModal(false);
  };

 

  return (
    <div className="write-page">
      {/* 상단 소개 영역 */}
      <section className="write-header">
        <div className="write-header-text">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span className="write-badge">새 글 쓰기</span>
            <button
              type="button"
              className="secondary-button"
              style={{ padding: "6px 10px", fontSize: 12 }}
              onClick={handleOpenDraftModal}
            >
              임시 저장 불러오기
            </button>
          </div>
          <h2 className="write-title">오늘의 이야기를 써봐요</h2>
          <p className="write-subtitle">
            오늘 있었던 일, 느꼈던 감정을 어린이도 쉽게 읽을 수 있게 한 줄 한 줄
            적어보세요.
          </p>
        </div>

        <div className="write-meta">
          <div className="meta-item">
            <span className="meta-label">현재 글자 수</span>
            <span className="meta-value">
              {charCount.toLocaleString()} / {charLimit.toLocaleString()}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">난이도</span>
            <span className="meta-badge">쉬운 말</span>
          </div>
        </div>
      </section>

      {/* 본문 레이아웃: 왼쪽 에디터 / 오른쪽 미리보기/팁 */}
      <section className="write-layout">
        {/* 왼쪽: 글쓰기 에디터 */}
        <div className="editor-column">
          <div className="field-group">
            <label className="field-label" htmlFor="story-title">
              이야기 제목
            </label>
            <input
              id="story-title"
              className="text-input"
              type="text"
              placeholder="예) 학교에서 있었던 특별한 하루"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="story-body">
              이야기 본문
            </label>

            <div className="editor-card">
              <div className="editor-toolbar">
                <button type="button" className="toolbar-button">
                  굵게
                </button>
                <button type="button" className="toolbar-button">
                  밑줄
                </button>
                <button type="button" className="toolbar-button">
                  중요 표시
                </button>
                <span className="toolbar-divider"></span>
                <button type="button" className="toolbar-button small">
                  문장 나누기
                </button>
              </div>

              <textarea
                id="story-body"
                className="text-area"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  "글을 입력하세요."
                }
                
              />

              <p className="helper-text">
                너무 긴 문장은 둘로 나누고, 어려운 단어는 쉬운 말로 바꿔보세요.
              </p>
            </div>
          </div>

          <div className="field-group field-group-inline">
            <div className="field-half">
              <label className="field-label" htmlFor="story-goal">
                이 글의 목표
              </label>
              <input
                id="story-goal"
                className="text-input"
                type="text"
                placeholder="예) 친구와 사이좋게 지내고 싶어요."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <div className="field-half">
              <label className="field-label" htmlFor="story-feeling">
                전하고 싶은 기분
              </label>
              <input
                id="story-feeling"
                className="text-input"
                type="text"
                placeholder="예) 즐거운 마음, 고마운 마음"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽: 미리보기 & 팁 */}
        <aside className="preview-column">
          <div className="preview-card">
            <p className="preview-label">어린이 눈높이 미리보기</p>
            <h3 className="preview-title">{previewTitle}</h3>

            <div className="preview-tags">
              {previewTags.map((t) => (
                <span className="tag-pill" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <p className="preview-text">{previewBody}</p>
          </div>

          <div className="realtime-suggestions-card">
            <h4 className="realtime-suggestions-title">실시간 문법·어휘 추천</h4>
            <p className="realtime-suggestions-desc">
              글을 쓰면 여기에 맞춤 문법·어휘 추천이 표시돼요.
            </p>
            <div className="realtime-suggestions-list" aria-live="polite">
              {/* 추후 실시간 추천 결과를 여기에 렌더링 */}
              <p className="realtime-suggestions-empty">아직 추천이 없어요. 본문을 입력해 보세요.</p>
            </div>
          </div>

          <div className="tip-card">
            <h4 className="tip-title">어린이친화 글쓰기 꿀팁</h4>
            <ul className="tip-list">
              <li>한 문장은 한 가지 내용만 담아요.</li>
              <li>어려운 단어 대신 쉬운 단어를 골라보세요.</li>
              <li>친구에게 말하듯이, 부드러운 말을 사용해요.</li>
              <li>읽는 사람이 어떻게 느낄지 한 번 더 생각해봐요.</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* 하단 버튼 */}
      <section className="write-actions">
        <button className="secondary-button" type="button" onClick={handleTempSave}>
          임시 저장
        </button>
        <button className="primary-button" type="button" onClick={handleComplete}>
          완성하기
        </button>
      </section>

      {showDraftModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              backgroundColor: "white",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>임시 저장 불러오기</h3>
            <p style={{ marginTop: 0, marginBottom: 16, fontSize: 14, color: "#555" }}>
              아래에서 불러오고 싶은 임시 저장 글을 선택하세요.
            </p>
            <div
              style={{
                maxHeight: 320,
                overflowY: "auto",
                marginBottom: 16,
              }}
            >
              {drafts.map((d) => {
                const dateLabel = d.savedAt
                  ? new Date(d.savedAt).toLocaleString()
                  : "";
                const titlePreview = d.title?.trim() || "제목 없음";
                const bodyPreview = (d.body || "").slice(0, 80);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleLoadDraft(d)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #e2e2e2",
                      backgroundColor: "white",
                      cursor: "pointer",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {titlePreview}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#888",
                          marginLeft: 8,
                        }}
                      >
                        {dateLabel}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#555",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {bodyPreview || "본문이 없습니다."}
                    </p>
                  </button>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button
                type="button"
                className="secondary-button"
                onClick={handleCloseDraftModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
