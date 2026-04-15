import "../styles/layout.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="property-page">
      {/* 페이지 제목 */}
      <section className="page-title">
        <h2>글쓰기 유형 선택</h2>
        <p>원하는 유형을 고르고 글쓰기를 시작해보세요.</p>
      </section>

      <section className="property-grid writing-type-grid">
        <article
          className="property-card freewrite-card writing-type-card fairy-card"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/keywords")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/keywords");
            }
          }}
        >
          <div className="writing-type-top">
            <span className="writing-type-badge">키워드 모드</span>
            <span className="writing-type-arrow" aria-hidden="true">↗</span>
          </div>
          <div className="writing-type-text">
            <p className="writing-type-headline">동화 글쓰기</p>
            <p className="writing-type-subtitle">Creative Fairy Tale</p>
            <p className="writing-type-footer">상상력을 펼쳐서 이야기를 만들어보세요</p>
          </div>
          <div className="writing-type-shape" aria-hidden="true" />
        </article>

        <article
          className="property-card freewrite-card writing-type-card diary-card"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/write")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/write");
            }
          }}
        >
          <div className="writing-type-top">
            <span className="writing-type-badge">일상 기록</span>
            <span className="writing-type-arrow" aria-hidden="true">↗</span>
          </div>
          <div className="writing-type-text">
            <p className="writing-type-headline">일기쓰기</p>
            <p className="writing-type-subtitle">Daily Journal</p>
            <p className="writing-type-footer">오늘의 경험과 감정을 편하게 적어보세요</p>
          </div>
          <div className="writing-type-shape" aria-hidden="true" />
        </article>
      </section>
    </div>
  );
}
