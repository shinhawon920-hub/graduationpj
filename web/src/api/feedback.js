// 로컬: VITE_API_URL 없으면 127.0.0.1:8000 / 배포: 없으면 Render URL 사용
const DEFAULT_API = "http://127.0.0.1:8000";
const RENDER_API = "https://graduationpj-api.onrender.com";
const isLocal =
  typeof window === "undefined" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const API =
  import.meta.env.VITE_API_URL || (isLocal ? DEFAULT_API : RENDER_API);

export async function requestFeedback(content, grade = 3) {
  const url = `${API}/api/feedback`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: content, grade }),
  });

  if (!res.ok) {
    let msg = `API 오류 (${res.status})`;
    try {
      const data = await res.json().catch(() => ({}));
      if (data.detail) msg += `: ${typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail)}`;
    } catch (_) {}
    throw new Error(msg);
  }

  return await res.json();
}
