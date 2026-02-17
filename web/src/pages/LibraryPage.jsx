// src/pages/LibraryPage.jsx
import "../styles/layout.css";
import "../styles/library.css";
import { Link, useNavigate } from "react-router-dom";

export default function LibraryPage() {
  const navigate = useNavigate();

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
          <article className="library-card">
            <div className="card-top-row">
              <span className="status-pill">완성</span>
              <span className="length-label">문장 12개</span>
            </div>
            <h3 className="library-card-title">
              <Link to="/essay/1">나의 첫 번째 이야기</Link>
            </h3>
            <p className="library-card-meta">
              <time dateTime="2025-02-10">2025.02.10</time> · 기분: 즐거워요
            </p>
            <p className="library-card-excerpt">
              오늘은 날씨가 참 좋았어요. 학교에서 친구들과 함께 운동장에서 달리기를
              했어요...
            </p>
            <div className="library-card-tags">
              <span className="tag-pill">일기</span>
              <span className="tag-pill">학교</span>
            </div>
          </article>

          <article className="library-card">
            <div className="card-top-row">
              <span className="status-pill status-draft">임시 저장</span>
              <span className="length-label">문장 7개</span>
            </div>
            <h3 className="library-card-title">
              <Link to="/essay/2">우주 탐험 이야기</Link>
            </h3>
            <p className="library-card-meta">
              <time dateTime="2025-02-08">2025.02.08</time> · 기분: 설레요
            </p>
            <p className="library-card-excerpt">
              나는 작은 우주선을 타고 달에 갔어요. 까만 하늘에 반짝이는 별들이
              가득했어요...
            </p>
            <div className="library-card-tags">
              <span className="tag-pill">상상</span>
              <span className="tag-pill">우주</span>
            </div>
          </article>

          <article className="library-card">
            <div className="card-top-row">
              <span className="status-pill">완성</span>
              <span className="length-label">문장 4개</span>
            </div>
            <h3 className="library-card-title">
              <Link to="/essay/3">오늘의 한 줄</Link>
            </h3>
            <p className="library-card-meta">
              <time dateTime="2025-02-05">2025.02.05</time> · 기분: 고마워요
            </p>
            <p className="library-card-excerpt">
              오늘 엄마가 나를 꼭 안아주었어요. 따뜻한 마음이 전해져서 나도 기분이
              좋아졌어요.
            </p>
            <div className="library-card-tags">
              <span className="tag-pill">일상</span>
            </div>
          </article>
        </section>

        {/* 리스트 뷰: 행 레이아웃 */}
        <section className="library-list view-panel" aria-label="리스트 보기">
          <article className="library-row">
            <div className="row-main">
              <h3 className="row-title">
                <Link to="/essay/1">나의 첫 번째 이야기</Link>
              </h3>
              <p className="row-meta">
                <time dateTime="2025-02-10">2025.02.10</time> · 문장 12개 · 기분:
                즐거워요
              </p>
            </div>
            <div className="row-tags">
              <span className="row-status">완성</span>
              <span className="row-pill">일기</span>
              <span className="row-pill">학교</span>
            </div>
          </article>

          <article className="library-row">
            <div className="row-main">
              <h3 className="row-title">
                <Link to="/essay/2">우주 탐험 이야기</Link>
              </h3>
              <p className="row-meta">
                <time dateTime="2025-02-08">2025.02.08</time> · 문장 7개 · 기분:
                설레요
              </p>
            </div>
            <div className="row-tags">
              <span className="row-status row-status-draft">임시 저장</span>
              <span className="row-pill">상상</span>
              <span className="row-pill">우주</span>
            </div>
          </article>

          <article className="library-row">
            <div className="row-main">
              <h3 className="row-title">
                <Link to="/essay/3">오늘의 한 줄</Link>
              </h3>
              <p className="row-meta">
                <time dateTime="2025-02-05">2025.02.05</time> · 문장 4개 · 기분:
                고마워요
              </p>
            </div>
            <div className="row-tags">
              <span className="row-status">완성</span>
              <span className="row-pill">일상</span>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
