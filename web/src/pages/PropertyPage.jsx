// src/pages/PropertyPage.jsx
import "../styles/layout.css";
import "../styles/write.css";
import { Link, useNavigate } from "react-router-dom";

export default function PropertyPage() {
  const navigate = useNavigate();

  return (
    <div className="write-page">
      <section className="write-header">
        <div className="write-header-text">
          <span className="write-badge">속성</span>
          <h2 className="write-title">이야기 속성 정하기</h2>
          <p className="write-subtitle">
            (임시) 속성 페이지 UI는 나중에 붙이고, 지금은 흐름만 연결합니다.
          </p>
        </div>
      </section>

      <section className="write-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          이전으로
        </button>

        <button
          className="primary-button"
          type="button"
          onClick={() => navigate("/write")}
        >
          글쓰러 가기
        </button>
      </section>
    </div>
  );
}
