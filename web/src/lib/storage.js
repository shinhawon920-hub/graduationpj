// src/lib/storage.js
const KEY = "essays_v1";

export function loadEssays() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEssay(essay) {
  const list = loadEssays();
  const next = [essay, ...list]; // 최신 글이 위로
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
