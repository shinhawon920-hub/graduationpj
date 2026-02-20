const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function requestFeedback(content, grade = 3) {
  const res = await fetch(`${API}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: content, grade }),
  });

  if (!res.ok) {
    throw new Error("Feedback API failed");
  }

  return await res.json();
}
