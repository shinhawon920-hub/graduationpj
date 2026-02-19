import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import MainPage from "./pages/MainPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import WritePage from "./pages/WritePage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import PropertyPage from "./pages/PropertyPage.jsx";
import EssayDetailPage from "./pages/EssayDetailPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/essay/:id" element={<EssayDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}