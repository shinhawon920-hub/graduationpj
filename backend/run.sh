#!/bin/bash
# 가상환경 활성화 없이 백엔드 실행 (프로젝트 루트에서: ./backend/run.sh)
cd "$(dirname "$0")"
.venv/bin/uvicorn main:app --reload --host 127.0.0.1 --port 8000
