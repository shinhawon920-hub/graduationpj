import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/layout.css";

const FAIRY_TALE_KEYWORDS = [
  "마법",
  "숲",
  "용기",
  "우정",
  "별",
  "비밀",
  "왕국",
  "모험",
];
const KEYWORD_DESCRIPTIONS = {
  마법: "신비로운 힘과 마법 같은 장면",
  숲: "숲 속에서 펼쳐지는 이야기",
  용기: "두려움을 이기는 마음",
  우정: "함께하는 친구와의 관계",
  별: "밤하늘과 소원, 희망",
  비밀: "숨겨진 진실과 반전",
  왕국: "왕과 성, 나라의 이야기",
  모험: "새로운 곳으로 떠나는 여정",
};

export default function KeywordPage() {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : [...prev, keyword]
    );
  };

  return (
    <div className="property-page">
      <section className="page-title">
        <h2>동화 키워드 고르기</h2>
        <p>동화 글쓰기에 넣고 싶은 키워드를 선택해보세요.</p>
      </section>

      <section className="property-grid">
        <article className="property-card property-card-wide">
          <h3 className="property-title">추천 키워드</h3>
          <p className="property-description">
            여러 개를 골라도 좋아요. 선택한 키워드는 글쓰기에 참고할 수 있어요.
          </p>
          <div className="keyword-card-grid">
            {FAIRY_TALE_KEYWORDS.map((keyword) => (
              <button
                key={keyword}
                type="button"
                className={`keyword-card ${
                  selectedKeywords.includes(keyword) ? "selected" : ""
                }`}
                onClick={() => toggleKeyword(keyword)}
              >
                <span className="keyword-card-title">{keyword}</span>
                <span className="keyword-card-desc">
                  {KEYWORD_DESCRIPTIONS[keyword]}
                </span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="bottom-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/")}
        >
          메인으로
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={() =>
            navigate("/fairy-write", {
              state: {
                writingType: "fairy-tale",
                keywords: selectedKeywords,
              },
            })
          }
        >
          동화 글쓰기 시작
        </button>
      </section>
    </div>
  );
}
