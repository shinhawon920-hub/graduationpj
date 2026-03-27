import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isMyPageSection = !isHome;

  const isSidebarActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1 className="logo">어린이친화 글쓰기</h1>
        </div>
        <nav className="header-right">
          <Link to="/" className={`nav-link ${isHome ? "active" : ""}`}>
            홈
          </Link>
          <Link
            to="/library"
            className={`nav-link ${isMyPageSection ? "active" : ""}`}
          >
            마이페이지
          </Link>
          <button
            type="button"
            className="header-help-btn"
            onClick={() => setIsHelpOpen(true)}
          >
            도움말
          </button>
        </nav>
      </header>

      <div className="layout-with-sidebar">
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
            <Link
              to="/"
              className={`sidebar-item ${isSidebarActive("/") ? "active" : ""}`}
            >
              <span className="sidebar-icon">🏠</span>
              <span className="sidebar-label">홈</span>
            </Link>

            <Link
              to="/library"
              className={`sidebar-item ${
                isSidebarActive("/library") ? "active" : ""
              }`}
            >
              <span className="sidebar-icon">📘</span>
              <span className="sidebar-label">글 도서관</span>
            </Link>

            <Link
              to="/property"
              className={`sidebar-item ${
                isSidebarActive("/property") ? "active" : ""
              }`}
            >
              <span className="sidebar-icon">🔧</span>
              <span className="sidebar-label">속성</span>
            </Link>

            <Link
              to="/settings"
              className={`sidebar-item ${
                isSidebarActive("/settings") ? "active" : ""
              }`}
            >
              <span className="sidebar-icon">⚙️</span>
              <span className="sidebar-label">설정</span>
            </Link>
          </nav>

        </aside>

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {isHelpOpen && (
        <div
          className="help-modal-backdrop"
          onClick={() => setIsHelpOpen(false)}
        >
          <div
            className="help-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="help-modal-title">이 서비스는 무엇을 하나요?</h2>
            <p className="help-modal-text">
              어린이도 이해하기 쉬운 글을 쓰도록 돕는 글쓰기 도구입니다.
              이야기 속성을 정하고, 본문을 쓰고, AI 피드백으로 글을 다듬을 수 있어요.
            </p>
            <ul className="help-modal-list">
              <li>홈: 주인공, 장소, 기분 등을 간단히 정해요.</li>
              <li>글 쓰기: 오늘 있었던 일을 쉽게 읽을 수 있게 작성해요.</li>
              <li>글 도서관: 저장된 글들을 한 곳에서 모아볼 수 있어요.</li>
            </ul>
            <button
              type="button"
              className="primary-button"
              onClick={() => setIsHelpOpen(false)}
            >
              알겠어요
            </button>
          </div>
        </div>
      )}
    </>
  );
}

