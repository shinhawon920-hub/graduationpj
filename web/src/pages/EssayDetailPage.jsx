// src/pages/EssayDetailPage.jsx
import "../styles/layout.css";
import "../styles/write.css";
import "../styles/feedback.css";
import { useParams, useNavigate } from "react-router-dom";
import { loadEssays } from "../lib/storage";

export default function EssayDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const essays = loadEssays();
  const essay = essays.find((e) => String(e.id) === String(id));

  if (!essay) {
    return (
      <div className="write-page feedback-page">
        <section className="feedback-header">
          <div className="feedback-header-text">
            <h2 className="write-title">글을 찾을 수 없습니다</h2>
            <p className="write-subtitle">
              저장된 글이 없거나, 이미 삭제된 글일 수 있어요.
            </p>
          </div>
        </section>
        <div style={{ padding: "20px 0" }}>
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/library")}
          >
            글 도서관으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const created = essay.createdAt || essay.createdAT || null;
  const dateLabel = created
    ? new Date(created).toISOString().slice(0, 10).replace(/-/g, ".")
    : "";
  const tags = [];
  if (essay.goal) tags.push(`목표: ${essay.goal}`);
  if (essay.feeling) tags.push(`기분: ${essay.feeling}`);
  const goodPoints = Array.isArray(essay.goodPoints) ? essay.goodPoints : [];
  const improvePoints = Array.isArray(essay.improvePoints) ? essay.improvePoints : [];

  return (
    <div className="write-page feedback-page">
      <section className="feedback-header">
        <div className="feedback-header-text">
          <span className="write-badge feedback-badge">저장된 글</span>
          <h2 className="write-title">{essay.title || "제목 없음"}</h2>
          <p className="write-subtitle">
            {dateLabel && <span>{dateLabel}</span>}
            {essay.feeling && (
              <>
                {" "}
                · 기분: {essay.feeling}
              </>
            )}
          </p>
        </div>
      </section>

      {/* 작성한 글 전체 (피드백 페이지와 동일 카드) */}
      <section className="feedback-summary-card">
        <h3 className="feedback-section-title">작성한 이야기</h3>
        <div className="summary-content">
          <p className="summary-title">{essay.title || "제목 없음"}</p>
          <p className="summary-body essay-detail-body-full">
            {essay.body || "내용이 없어요."}
          </p>
          {tags.length > 0 && (
            <div className="summary-tags">
              {tags.map((t) => (
                <span className="tag-pill" key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 잘한 점 / 개선 제안 */}
      <section className="feedback-score-eval-box">
        <div className="feedback-detail-layout">
          <div className="feedback-card feedback-good">
            <h4 className="feedback-card-title">
              <span className="feedback-card-icon">👍</span> 잘한 점
            </h4>
            <ul className="feedback-list">
              {goodPoints.length > 0 ? (
                goodPoints.map((s, idx) => (
                  <li key={`${idx}-${s}`}>{s}</li>
                ))
              ) : (
                <li>저장된 피드백이 없어요.</li>
              )}
            </ul>
          </div>
          <div className="feedback-card feedback-improve">
            <h4 className="feedback-card-title">
              <span className="feedback-card-icon">💡</span> 더 좋아질 수 있어요
            </h4>
            <ul className="feedback-list">
              {improvePoints.length > 0 ? (
                improvePoints.map((s, idx) => (
                  <li key={`${idx}-${s}`}>{s}</li>
                ))
              ) : (
                <li>저장된 피드백이 없어요.</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="write-actions feedback-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/library")}
        >
          목록으로 돌아가기
        </button>
      </section>
    </div>
  );
}
