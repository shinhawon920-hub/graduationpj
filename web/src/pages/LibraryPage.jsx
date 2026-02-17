// src/pages/LibraryPage.jsx
import "../styles/layout.css";
import "../styles/library.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadEssays } from "../lib/storage";

export default function LibraryPage() {
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    setEssays(loadEssays());
  }, []);


  return (
    <div className="library-page">
      {/* 뷰 모드 라디오 (CSS-only 토글용) */}
      <input
        type="radio"
        id="view-grid"
        name="library-view"
        className="view-input"
        defaultChecked
      />
      <input
        type="radio"
        id="view-list"
        name="library-view"
        className="view-input"
      />

      {/* 상단 제목 + 토글 */}
      <section className="library-header">
        <div className="library-header-text">
          <h2 className="library-title">글 도서관</h2>
          <p className="library-subtitle">
            내가 쓴 모든 글을 한눈에 보고, 보기 방식을 그리드와 리스트로 바꿔볼 수
            있어요.
          </p>
        </div>

        <div className="library-toolbar">
          <span className="library-toolbar-label">보기 방식</span>
          <div className="view-toggle" role="group" aria-label="보기 방식 선택">
            <label className="toggle-button toggle-grid" htmlFor="view-grid">
              그리드
            </label>
            <label className="toggle-button toggle-list" htmlFor="view-list">
              리스트
            </label>
          </div>
        </div>
      </section>

      {/* 실제 글 목록 영역 */}
      <div className="library-content">
        {/* 그리드 뷰: 카드 레이아웃 */}
        <section className="library-grid view-panel" aria-label="그리드 보기">
          {essays.length === 0 ? (
            <p style={{ padding: 16 }}>아직 저장된 글이 없어요. 먼저 글을 작성해 보세요.</p>
          ) : (
            essays.map((essay) => {
              const created =
                essay.createdAt || essay.createdAT || null;
              const dateLabel = created
                ? new Date(created).toISOString().slice(0, 10).replace(/-/g, ".")
                : "";
              const body = essay.body || "";
              const preview =
                body.length > 160 ? `${body.slice(0, 160)}…` : body;
              const sentenceCount = body
                ? body
                    .split(/(?:다\.)|[.!?。\n]/)
                    .filter((s) => s.trim().length > 0).length
                : 0;
              const title = essay.title || "제목 없음";
              const tags = [];
              if (essay.goal) tags.push(`목표: ${essay.goal}`);
              if (essay.feeling) tags.push(`기분: ${essay.feeling}`);

              return (
                <article className="library-card" key={essay.id}>
                  <div className="card-top-row">
                    <span className="status-pill">완성</span>
                    <span className="length-label">문장 {sentenceCount}개</span>
                  </div>
                  <h3 className="library-card-title">{essay.title}</h3>
                  <p className="library-card-meta">
                    {dateLabel && <time>{dateLabel}</time>}
                    {essay.feeling && <> · 기분: {essay.feeling}</>}
                  </p>
                  <p className="library-card-excerpt">
                    <Link to={`/essay/${essay.id}`}>{title}</Link>
                  </p>
                  <div className="library-card-tags">
                    {tags.map((tag) => (
                      <span className="tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })
          )}
        </section>

        {/* 리스트 뷰: 행 레이아웃 */}
        <section className="library-list view-panel" aria-label="리스트 보기">
          {essays.length === 0 ? (
            <p style={{ padding: 16 }}>아직 저장된 글이 없어요. 먼저 글을 작성해 보세요.</p>
          ) : (
            essays.map((essay) => {
              const created =
                essay.createdAt || essay.createdAT || null;
              const dateLabel = created
                ? new Date(created).toISOString().slice(0, 10).replace(/-/g, ".")
                : "";
              const body = essay.body || "";
              const sentenceCount = body
                ? body
                    .split(/(?:다\.)|[.!?。\n]/)
                    .filter((s) => s.trim().length > 0).length
                : 0;
              const title = essay.title || "제목 없음";
              const tags = [];
              if (essay.goal) tags.push(`목표: ${essay.goal}`);
              if (essay.feeling) tags.push(`기분: ${essay.feeling}`);

              return (
                <article className="library-row" key={essay.id}>
                  <div className="row-main">
                    <h3 className="row-title">
                      <Link to={`/essay/${essay.id}`}>{title}</Link>
                    </h3>
                    <p className="row-meta">
                      {dateLabel && <time>{dateLabel}</time>}
                      {` · 문장 ${sentenceCount}개`}
                      {essay.feeling && <> · 기분: {essay.feeling}</>}
                    </p>
                  </div>
                  <div className="row-tags">
                    <span className="row-status">완성</span>
                    {tags.map((tag) => (
                      <span className="row-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })
          )}
          <p style={{ marginTop: 8 }}>저장된 글: {essays.length}개</p>
        </section>
      </div>
    </div>
  );
}
