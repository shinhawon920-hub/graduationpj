import "../styles/layout.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    character: "",
    location: "",
    time: "",
    mood: "",
    goal: "",
  });

  return (
    <div className="property-page">
      {/* 페이지 제목 */}
      <section className="page-title">
        <h2>이야기 속성 정하기</h2>
        <p>이야기에 들어갈 주인공, 장소, 기분 등을 골라보세요.</p>
      </section>

      {/* 속성 카드 영역 */}
      <section className="property-grid">
        {/* 주인공 카드 */}
        <article className="property-card">
          <h3 className="property-title">주인공</h3>
          <p className="property-description">
            이야기에 나올 주인공을 골라보세요.
          </p>
          <div className="chip-group">
            <button className="chip">나</button>
            <button className="chip">친구</button>
            <button className="chip">가족</button>
            <button className="chip">동물</button>
          </div>
        </article>

        {/* 장소 카드 */}
        <article className="property-card">
          <h3 className="property-title">장소</h3>
          <p className="property-description">
            이야기가 펼쳐지는 장소를 정해요.
          </p>
          <div className="chip-group">
            <button className="chip">학교</button>
            <button className="chip">집</button>
            <button className="chip">놀이터</button>
            <button className="chip">공원</button>
            <button className="chip">바닷가</button>
          </div>
        </article>

        {/* 시간 카드 */}
        <article className="property-card">
          <h3 className="property-title">시간</h3>
          <p className="property-description">
            이야기가 언제 일어나는지 골라보세요.
          </p>
          <div className="chip-group">
            <button className="chip">아침</button>
            <button className="chip">점심</button>
            <button className="chip">저녁</button>
            <button className="chip">밤</button>
          </div>
        </article>

        {/* 기분 카드 */}
        <article className="property-card">
          <h3 className="property-title">기분</h3>
          <p className="property-description">
            이야기의 전체 분위기를 골라보세요.
          </p>
          <div className="chip-group">
            <button className="chip">즐거워요</button>
            <button className="chip">신나요</button>
            <button className="chip">조금 슬퍼요</button>
            <button className="chip">깜짝 놀라요</button>
          </div>
        </article>

        {/* 목표 카드 */}
        <article className="property-card property-card-wide">
          <h3 className="property-title">이야기의 목표</h3>
          <p className="property-description">
            주인공이 이야기에서 이루고 싶은 것은 무엇인가요?
          </p>
          <textarea
            className="property-textarea"
            placeholder={
              "예) 친구와 사이좋게 지내고 싶어요.\n예) 잃어버린 인형을 찾고 싶어요."
            }
          />
        </article>
      </section>

      {/* 하단 버튼 */}
      <section className="bottom-actions">
        <button
          className="secondary-button"
          onClick={() => navigate("/")}
        >
          이전으로
        </button>
        <button
          className="primary-button"
          onClick={() => navigate("/write")}
        >
          글쓰러 가기
        </button>
      </section>
    </div>
  );
}
