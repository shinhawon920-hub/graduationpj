# 배포 가이드 (친구에게 링크 공유하기)

프론트엔드(React)는 **Vercel**, 백엔드(FastAPI)는 **Render**에 무료로 배포하는 방법입니다.

---

## 준비

- GitHub에 이 프로젝트가 올라가 있어야 합니다 (`git push origin main` 등).
- [Vercel](https://vercel.com) 계정, [Render](https://render.com) 계정 (GitHub로 가입 가능).

---

## 1단계: 백엔드 배포 (Render Web Service)

1. [Render 대시보드](https://dashboard.render.com) 로그인 후 **New +** → **Web Service** 선택.
2. 이 프로젝트가 있는 **GitHub 저장소** 연결 (연결이 안 되어 있으면 먼저 "Connect account"로 GitHub 연동).
3. 아래처럼 설정한 뒤 **Create Web Service** 클릭.

   | 항목 | 값 |
   |------|-----|
   | **Name** | 원하는 이름 (예: `graduationpj-api`) |
   | **Region** | 가까운 지역 선택 |
   | **Root Directory** | `backend` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

4. 배포가 끝나면 **서비스 URL**이 생깁니다. 예: `https://graduationpj-api.onrender.com`
5. **Environment** 탭에서 환경 변수 추가:
   - **Key**: `ALLOWED_ORIGINS`  
   - **Value**: 아직 프론트 URL이 없으면 `http://localhost:5173` 입력해 두고, 2단계에서 Vercel URL이 생긴 뒤 **Vercel 사이트 주소**로 바꿉니다.  
     (여러 개면 쉼표로 구분, 예: `https://myapp.vercel.app`)

---

## 2단계: 프론트엔드 배포 (Vercel)

1. [Vercel 대시보드](https://vercel.com/dashboard) 로그인 후 **Add New → Project**.
2. 같은 GitHub 저장소 선택.
3. **Root Directory**를 `web`으로 지정 (반드시 설정).
4. **Environment Variables** 추가:
   - **Name**: `VITE_API_URL`  
   - **Value**: 1단계에서 적어둔 Render 백엔드 URL (예: `https://graduationpj-api.onrender.com`)  
   - 트레일링 슬래시 없이 입력.
5. **Deploy** 실행. 끝나면 프론트 URL이 생깁니다. 예: `https://graduationpj-xxx.vercel.app`

---

## 3단계: CORS 연결

1. Render 서비스 **Environment**로 다시 이동.
2. **ALLOWED_ORIGINS** 값을 **Vercel에서 준 프론트 URL**로 수정 (예: `https://graduationpj-xxx.vercel.app`).
3. 저장하면 자동으로 재배포됩니다.

이제 Vercel에서 준 주소를 친구에게 보내면, 같은 와이파이가 아니어도 접속할 수 있습니다.

---

## 요약

| 구분        | 서비스  | URL 예시                          |
|------------|--------|------------------------------------|
| 프론트엔드 | Vercel | `https://graduationpj-xxx.vercel.app` |
| 백엔드     | Render | `https://graduationpj-api.onrender.com` |

- 프론트: `VITE_API_URL` = 백엔드 URL  
- 백엔드: `ALLOWED_ORIGINS` = 프론트 URL  

둘만 맞춰 주면 됩니다.

---

## "Failed to fetch" 나올 때 (완성하기 눌렀을 때)

대부분 **Render 쪽 CORS** 설정 때문입니다. 아래만 확인하세요.

1. **Render** → [dashboard.render.com](https://dashboard.render.com) 로그인
2. **graduationpj-api** (백엔드 서비스) 클릭
3. 왼쪽 메뉴 **Environment** 클릭
4. **ALLOWED_ORIGINS** 찾기 (없으면 Add → Key: `ALLOWED_ORIGINS`)
5. **Value**에 **지금 글 쓰는 페이지가 열려 있는 주소** 그대로 넣기  
   - 예: `https://graduationpj.vercel.app`  
   - ❌ `https://graduationpj.vercel.app/` (끝에 `/` 넣지 말 것)  
   - ❌ `http://...` (반드시 `https`)
6. **Save Changes** → Render가 자동으로 재배포 (1~2분 소요)
7. 재배포 끝난 뒤 브라우저에서 **완성하기** 다시 시도
