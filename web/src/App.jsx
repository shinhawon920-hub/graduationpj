import "./mainhome.css";


function App() {
  return (
    <>
      {/* 상단 헤더 */}
      <header className="header">
        <div className="header-left">
          {/* 필요하면 a 태그로 홈으로 이동 */}
          <button className="back-button" onClick={() => history.back()}>
            ←
          </button>
          <h1 className="logo">어린이친화 글쓰기</h1>
        </div>
        <nav className="header-right">
          <a href="mainpage.html" className="nav-link">
            홈
          </a>
          <a href="#" className="nav-link active">
            마이페이지
          </a>
        </nav>
      </header>

      {/* 전체 레이아웃 래퍼 (왼쪽 네비 + 오른쪽 내용) */}
      <div className="layout-with-sidebar">
        {/* 왼쪽 네비게이션 바 */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span className="logo-icon">✏️</span>
            <span className="logo-text">
              김재현님
              <br />
              안녕하세요
            </span>
          </div>

          <nav className="sidebar-menu">
            <a href="mainpage.html" className="sidebar-item active">
              <span className="sidebar-icon">🏠</span>
              <span className="sidebar-label">홈</span>
            </a>
            <a href="library.html" className="sidebar-item">
              <span className="sidebar-icon">📘</span>
              <span className="sidebar-label">글 도서관</span>
            </a>
            <a href="property.html" className="sidebar-item">
              <span className="sidebar-icon">🔧</span>
              <span className="sidebar-label">속성</span>
            </a>
            <a href="#" className="sidebar-item">
              <span className="sidebar-icon">⚙️</span>
              <span className="sidebar-label">설정</span>
            </a>
          </nav>

          <div className="sidebar-bottom">
            <button className="sidebar-mini-btn">도움말</button>
          </div>
        </aside>

        {/* 오른쪽 실제 페이지 내용 */}
        <main className="page-content">
          {/* 기존 HTML에 main이 중복되어 있었는데, 그대로 두면 마크업은 유효하지만 구조상 불필요한 중첩입니다.
              우선은 원본을 최대한 유지하되, 한 번만 쓰는 형태로 정리했습니다. */}
          <main className="property-page">
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
                onClick={() => (window.location.href = "mainpage.html")}
              >
                이전으로
              </button>
              <button
                className="primary-button"
                onClick={() => (window.location.href = "writepage.html")}
              >
                글쓰러 가기
              </button>
            </section>
          </main>
        </main>
      </div>
    </>
  );
}

export default App;
