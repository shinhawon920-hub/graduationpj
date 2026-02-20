// src/pages/FeedbackPage.jsx
import "../styles/layout.css";
import "../styles/write.css";
import "../styles/feedback.css";
import { useLocation, useNavigate } from "react-router-dom";
import { saveEssay } from "../lib/storage";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 기본 더미(데이터 없을 때 화면 뼈대 유지)
  const fallback = {
    title: "이야기 제목이 여기 보여요",
    body: "여기에 작성한 본문 내용이 요약되어 보여요.",
    goal: "친구와 사이좋게",
    feeling: "즐거운 마음",
    goodPoints: [
      "한 문장에 한 가지 내용만 담아서 읽기 쉬워요.",
      "친구에게 말하듯 부드러운 말을 사용했어요.",
      "어려운 단어를 쉬운 말로 잘 바꿨어요.",
    ],
    improvePoints: [
      "이 부분 문장을 나누면 어린이가 더 잘 이해할 수 있어요.",
      "‘~했습니다’ 대신 ‘~했어요’처럼 말하기 쉬운 표현을 쓰면 좋아요.",
    ],
  };

  const stateData = state && typeof state === "object" ? state : null;
  const data = stateData ? { ...fallback, ...stateData } : fallback;

  const summaryBody = (() => {
    const text = data?.body ?? "";
    if (!text) return fallback.body;
    return text.length > 200 ? text.slice(0, 200) + "…" : text;
  })();

  const tags = (() => {
    const t = [];
    if (data?.goal) t.push(`목표: ${data.goal}`);
    if (data?.feeling) t.push(`기분: ${data.feeling}`);
    return t.length ? t : [`목표: ${fallback.goal}`, `기분: ${fallback.feeling}`];
  })();

  const goodPoints =
    (data?.goodPoints?.length ? data.goodPoints : fallback.goodPoints) ?? [];
  const improvePoints =
    (data?.improvePoints?.length ? data.improvePoints : fallback.improvePoints) ?? [];

  const onSave = () => {
    //저장할 글이 없는 경우 막아두기
    if (!data?.title || !data?.body) {
        alert("제목과 내용을 입력해주세요.");
        return;
    }

    const essay = {
      id: String(Date.now()),
      title: data.title ?? "제목 없음",
      body: data.body ?? "내용이 없어요.",
      goal: data.goal ?? "",
      feeling: data.feeling ?? "",
      goodPoints,
      improvePoints,
      createdAt: new Date().toISOString(),
    };
    saveEssay(essay);
    navigate("/library");
  };

  const onEdit = () => {
    navigate("/write");
  };

  const onGoLibrary = () => {
    navigate("/library");
  };

  return (
    <div className="write-page feedback-page">
      {/* 완성 헤더 */}
      <section className="feedback-header">
        <div className="feedback-header-text">
          <span className="write-badge feedback-badge">피드백</span>
          <h2 className="write-title">글을 완성했어요!</h2>
          <p className="write-subtitle">
            어린이가 읽기 좋은 글로 잘 썼는지 피드백을 확인해 보세요.
          </p>
        </div>
      </section>

      {/* 작성한 글 요약 카드 */}
      <section className="feedback-summary-card">
        <h3 className="feedback-section-title">작성한 이야기</h3>
        <div className="summary-content">
          <p className="summary-title">{data.title ?? fallback.title}</p>
          <p className="summary-body">{summaryBody}</p>
          <div className="summary-tags">
            {tags.map((t) => (
              <span className="tag-pill" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 잘한 점 / 개선 제안 */}
      <section className="feedback-detail-layout">
        <div className="feedback-card feedback-good">
          <h4 className="feedback-card-title">
            <span className="feedback-card-icon">👍</span> 잘한 점
          </h4>
          <ul className="feedback-list">
            {goodPoints.map((s, idx) => (
              <li key={`${idx}-${s}`}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="feedback-card feedback-improve">
          <h4 className="feedback-card-title">
            <span className="feedback-card-icon">💡</span> 더 좋아질 수 있어요
          </h4>
          <ul className="feedback-list">
            {improvePoints.map((s, idx) => (
              <li key={`${idx}-${s}`}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 하단 액션 */}
      <section className="write-actions feedback-actions">
        <button className="secondary-button" type="button" onClick={onEdit}>
          다시 수정하기
        </button>
        <button className="secondary-button" type="button" onClick={onSave}>
        저장하기
        </button>

        <button className="primary-button" type="button" onClick={onGoLibrary}>
          글 도서관으로
        </button>
      </section>
    </div>
  );
}
