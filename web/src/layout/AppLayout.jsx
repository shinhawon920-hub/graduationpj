import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

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
          <button className="back-button" onClick={() => navigate(-1)}>
            ←
          </button>
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

          <div className="sidebar-bottom">
            <button className="sidebar-mini-btn">도움말</button>
          </div>
        </aside>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

