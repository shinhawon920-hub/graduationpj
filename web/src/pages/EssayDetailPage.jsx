// src/pages/EssayDetailPage.jsx
import "../styles/layout.css";
import "../styles/library.css";
import { useParams, useNavigate } from "react-router-dom";
import { loadEssays } from "../lib/storage";

export default function EssayDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const essays = loadEssays();
  const essay = essays.find((e) => String(e.id) === String(id));

  if (!essay) {
    return (
      <div className="library-page">
        <section className="library-header">
          <div className="library-header-text">
            <h2 className="library-title">글을 찾을 수 없습니다</h2>
            <p className="library-subtitle">
              저장된 글이 없거나, 이미 삭제된 글일 수 있어요.
            </p>
          </div>
        </section>

        <div className="library-content">
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

  return (
    <div className="library-page">
      <section className="library-header">
        <div className="library-header-text">
          <h2 className="library-title">{essay.title || "제목 없음"}</h2>
          <p className="library-subtitle">
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

      <div className="library-content">
        <section className="library-grid view-panel" aria-label="글 상세">
          <article className="library-card">
            <p
              className="library-card-excerpt"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {essay.body || "내용이 없어요."}
            </p>
            <div className="library-card-tags">
              {essay.goal && (
                <span className="tag-pill">목표: {essay.goal}</span>
              )}
              {essay.feeling && (
                <span className="tag-pill">기분: {essay.feeling}</span>
              )}
              {typeof essay.score === "number" && (
                <span className="tag-pill">점수: {essay.score}점</span>
              )}
            </div>
          </article>
        </section>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/library")}
          style={{ marginTop: 16 }}
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

