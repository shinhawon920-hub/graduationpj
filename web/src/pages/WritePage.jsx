// src/pages/WritePage.jsx
import "../styles/layout.css";
import "../styles/write.css";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function WritePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [goal, setGoal] = useState("");
  const [feeling, setFeeling] = useState("");

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

  const handleComplete = () => {
    const data = {
      title: title.trim() || "제목 없음",
      body: body.trim() || "내용이 없어요.",
      goal: goal.trim(),
      feeling: feeling.trim(),
      // 아래는 추후 더미/백엔드에서 내려주는 값으로 교체 예정
      score: 85,
      goodPoints: [
        "한 문장에 한 가지 내용만 담아서 읽기 쉬워요.",
        "친구에게 말하듯 부드러운 말을 사용했어요.",
        "어려운 단어를 쉬운 말로 잘 바꿨어요.",
      ],
      improvePoints: [
        "이 부분 문장을 나누면 어린이가 더 잘 이해할 수 있어요.",
        "'~했습니다' 대신 '~했어요'처럼 말하기 쉬운 표현을 쓰면 좋아요.",
      ],
    };

    // 기존 sessionStorage 흐름 유지 (추후 더미 API/백엔드로 교체)
    try {
      sessionStorage.setItem("writingFeedbackData", JSON.stringify(data));
    } catch (_) {}

    navigate("/feedback");
  };

  const handleTempSave = () => {
    const draft = {
      title,
      body,
      goal,
      feeling,
      savedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("writingDraft", JSON.stringify(draft));
    } catch (_) {}
    // UX는 추후 토스트로 교체 가능
    alert("임시 저장되었습니다.");
  };

  return (
    <div className="write-page">
      {/* 상단 소개 영역 */}
      <section className="write-header">
        <div className="write-header-text">
          <span className="write-badge">새 글 쓰기</span>
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
                placeholder={
                  "어린이가 읽을 수 있도록, 짧고 쉬운 문장으로 써보세요.\n예) 오늘 나는 학교에서 새로운 친구를 만났어요."
                }
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, charLimit))}
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
    </div>
  );
}
