# 프로젝트 뼈대 세우기 기록

> **저장 위치:** `docs/decisions/scaffold-log.md`

> **사용 방법**
> 1. **뼈대가 안 서도 이 파일은 제출합니다.** 오늘의 목표는 완성이 아니라 **어디서 막히는지 찾는 것**입니다.
> 2. 오늘 범위는 **빈 프로젝트가 실행되는 것**까지입니다. 화면 꾸미기, 로그인, DB 연결, 배포 설정은 다음 주입니다.
> 3. 계획을 먼저 받고 **범위를 넘는 것을 지운 뒤** 실행합니다. 계획 없이 바로 만들지 않습니다.
> 4. **'확인된 명령'에는 실제로 돌려 본 것만** 적습니다. 안 돌려 봤으면 `확인 필요`로 씁니다. 여기 적은 명령이 `CLAUDE.md`로 올라갑니다.
> 5. **'막힌 지점'에는 오류 메시지를 그대로** 붙여넣습니다. 요약하지 않습니다. 다음 주 첫 과제가 됩니다.
> 6. `>`로 시작하는 안내 문장은 지워도 됩니다.

- 작성일: 2026-10-27 (확인일: 2026-11-03, 아래 1~5절)
- 기술 담당: 미정이었으나 실제로는 진수화(pyproject.toml·app·frontend 뼈대), 권기범/yosi08(상품 API), 김지운(상품 화면·프론트 TS·프록시)이 나눠서 만들었다 (git log 기준). 오늘 1~5절 확인은 김가은이 했다
- 근거: `docs/STACK.md`
- 진행 상태: 뼈대와 US-08(상품·단위 정보 등록)까지 이미 코드로 만들어져 main에 머지돼 있었다 (`feat/pyproject`·`feat/app`·`feat/frontend`·`feat/89-products-api`·`feat/product-screen`). 이 문서만 그 사실을 반영하지 못한 상태였어서, 오늘 직접 설치·실행·테스트까지 돌려 보고 2~5절을 채운다

## 1. 받은 계획과 거른 것

> 뼈대·US-08 코드 자체는 이 세션이 받은 계획이 아니라 다른 세션(들)이 먼저 만들어 병합한 것이다. 참고로 같은 날 Claude Plan 모드로 세운 US-08 계획(저장: Claude 세션 플랜 파일)과 실제 코드를 대조한 결과는 아래와 같다.

| 계획에 있던 것 | 오늘 함 / 뺌 | 뺀 이유 |
| --- | --- | --- |
| DB 테이블 생성 방법 (Alembic vs `create_all()`) | `create_all()`로 단순화 (alembic은 의존성에는 넣었지만 아직 안 씀) | `backend/app/main.py` 주석: "Alembic 도입 여부는 팀 확인 필요" — 뼈대 단계는 빠르게 동작 확인이 우선 |
| 인증 처리 방식 | 로그인 대신 요청 헤더 `X-User-Id`로 임시 처리 | `API.md` 공통 규칙에 [제안]으로만 기록, 실제 로그인은 오늘 범위 아님 |
| 상품 수정 API | 오늘 안 만듦 | `backend/app/routers/products.py` 주석: "`first-feature.md` 2절 #2가 '오늘 만들지 않음'" |

**계획에서 알려준 "막힐 가능성이 있는 곳" — 오늘 실제로 확인해 본 결과**

- "필수값이 어느 필드인지 미정" → 실제로 막혀서, `backend/app/models/product.py`가 `product_code`만 필수(`nullable=False`)로 두고 나머지는 전부 선택값으로 구현했다. `DATA-MODEL.md`·`API.md`의 "필수 미정" 칸은 아직 이 결정을 안 따라가고 있다 (PM이 다음에 정리할 것)
- "DB 실행 방법 미정" → Docker로 Postgres 16을 띄워서 실제로 연결·동작까지 확인했다 (아래 3절)
- "테스트 프레임워크 미정" → `backend/pyproject.toml`에 pytest로 이미 정해져 있었고, 오늘 실제로 돌려서 확인했다 (전부 skip 상태, 5절 참고)
- "인증·권한 미정" → `X-User-Id` 헤더 임시 방식으로 실제 동작까지 확인했다 (다른 매장 상품 조회 시 빈 목록 반환 확인)

## 2. 만든 것

| 항목 | 내용 |
| --- | --- |
| 폴더 구조 (한 줄) | `backend/app/{models,routers,schemas}` + `backend/tests`, `frontend/src/{pages,components,api}` |
| 설치한 패키지 | 백엔드: fastapi, uvicorn, sqlalchemy, psycopg[binary], alembic + (dev) pytest, httpx, ruff (`backend/pyproject.toml`) / 프론트: react 19, vite 8, typescript, eslint, prettier (`frontend/package.json`) |
| 화면에 보이는 것 | 상품 목록·등록 화면(`ProductList`, `ProductForm`) — Vite 개발 서버로 직접 열어 200 응답 확인 |

## 3. 확인된 명령

> 실제로 돌려서 성공한 것만. 안 해 봤으면 `확인 필요`.

| 용도 | 명령 | 돌려 봤나 |
| --- | --- | --- |
| 설치 (백엔드) | `cd backend && python3 -m venv .venv && source .venv/bin/activate && pip install -e ".[dev]"` | 돌려 봄 — 성공 (Python 3.14.7) |
| 설치 (프론트) | `cd frontend && npm install` | 돌려 봄 — 기본 npm 캐시 경로 권한 오류로 실패, `npm install --cache <쓰기 가능한 경로>`로 우회해 성공 (5절 참고) |
| 실행 (백엔드, Postgres 먼저 필요) | `docker run -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ddakjaego -p 5432:5432 -d postgres:16` 띄운 뒤 `DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/ddakjaego uvicorn app.main:app --reload` | 돌려 봄 — 성공. `/docs` 200, `POST /products`·`GET /products` 정상 등록·중복 코드 거부·환산값 0 이하 거부·다른 매장 조회 차단까지 실제로 확인 |
| 실행 (프론트) | `cd frontend && npm run dev` | 돌려 봄 — 성공 (지정 포트가 이미 쓰이고 있어 자동으로 다른 포트에서 떴지만 정상 응답) |
| 빌드 (프론트) | `cd frontend && npm run build` | 돌려 봄 — 성공 (`tsc && vite build`) |
| 린트 (백엔드) | `cd backend && ruff check .` | 돌려 봄 — 실패, 오류 6개 (5절 참고) |
| 린트 (프론트) | `cd frontend && npm run lint` | 돌려 봄 — 성공, 오류 없음 |
| 테스트 | `cd backend && source .venv/bin/activate && pytest` | 돌려 봄 — 실행은 성공하지만 7개 전부 `skipped` (5절 참고) |

- [x] 위 명령을 `CLAUDE.md`에 옮겼다 (돌아간 것만)

## 4. 전원 실행 확인

> 한 사람 컴퓨터에서만 돌면 의미가 없습니다. 각자 받아서 실행해 봅니다.

| 이름 | 실행됨 / 안 됨 | 안 됐다면 오류 (그대로) |
| --- | --- | --- |
| 신은총 (Kr-Verified) | 확인 전 | |
| 김가은 (revlis09) | 실행됨 (2026-11-03, 위 3절 명령 전부) | |
| 진수화 (shusbox) | 확인 전 | |
| 권기범 (yosi08) | 확인 전 | |
| 김지운 (kimjiwoon3472) | 확인 전 | |

## 5. 막힌 지점

> 오류 메시지를 **그대로** 붙여넣습니다. 요약하지 않습니다.

| 어디서 | 오류 메시지 | 해 본 것 | 아직 모르는 것 |
| --- | --- | --- | --- |
| `npm install` (frontend, 기본 캐시) | `npm error code EEXIST` / `npm error syscall mkdir` / `npm error path /Users/gaeun/.npm/_cacache/content-v2/sha512/fe/c3` / `npm error errno -13` / `npm error EACCES: permission denied, mkdir '/Users/gaeun/.npm/_cacache/content-v2/sha512/fe/c3'` | `npm install --cache /tmp/npm-cache-ddakjaego`로 다른 캐시 경로를 지정해서 우회함 (성공) | 이 npm 캐시 폴더 권한이 왜 깨져 있는지(이 Mac만의 문제인지) 원인은 확인 안 함 |
| `ruff check .` (backend/tests/test_products.py) | `N802 Function name` 한글 테스트 함수 6개 전부에 대해 "should be lowercase" (예: `test_us08_상품_등록_후_목록에_표시`, `test_us08_같은_매장의_중복_상품_코드는_저장되지_않음` 등) — `Found 6 errors.` | 코드는 고치지 않고 오류만 확인함 | `CODE-STYLE.md`가 요구하는 "`US-xx`가 이름에 드러나는 한글 테스트 이름"과 `pyproject.toml`의 ruff `N`(pep8-naming) 규칙이 서로 충돌한다 — 어느 쪽을 바꿀지(규칙에서 N802 빼기 vs 테스트 이름 로마자로 바꾸기) 팀이 정해야 함 |
| `pytest` (backend/tests/test_products.py) | 오류는 아니고 전부 `skipped` — `product_api` 픽스처가 `pytest.skip("US-08 API·인증 계약과 테스트 클라이언트 연결 필요")`로 즉시 스킵함 | 서버는 직접 curl로 돌려서 확인함 (3절) | 테스트 코드 자체가 실제 FastAPI 테스트 클라이언트(httpx)와 안 이어져 있어, 지금은 테스트가 사실상 하나도 안 도는 상태 — 다음 과제로 필요 |

## 6. 다음 주 첫 과제

> 오늘 못 끝낸 것을 적습니다. 3주차 1일차 블록 1에 이것부터 합니다.

- `test_products.py`의 `product_api` 픽스처를 FastAPI `TestClient`/`httpx`와 실제로 연결해, 지금 전부 `skipped`인 테스트 7개가 실제로 돌게 만든다
- `ruff`의 `N802`(함수명 소문자 규칙)와 한글 테스트 이름 충돌을 팀이 정해서 해결한다 (규칙 예외 처리 vs 이름 변경)
- `DATA-MODEL.md`·`API.md`의 "필수값 미정"을 실제 구현(`product_code`만 필수)에 맞춰 PM이 확정해 반영한다
- STACK.md 확인할 것 3개를 확인한다: PostgreSQL 호스팅·비용 한도(신은총), FastAPI 비동기 업로드·판독 구조 채택 여부(김지운), Vercel에서 FastAPI 배포 가능 여부와 실행 시간 제한(신은총) — 모두 "뼈대 세우기 전"이 기한이었는데 이미 뼈대가 섰으므로 지금 바로 확인 필요
- 나머지 4명도 3절 명령을 각자 컴퓨터에서 실행해 4절 표를 채운다

## 7. 환경 제약 (겪은 것)

> `stack-inputs.md`에 적었던 제약이 실제로 걸렸는지 확인합니다.

| 제약 | 실제로 걸렸나 | 어떻게 넘겼나 |
| --- | --- | --- |
| 설치 권한 | 걸림 (김가은 Mac) — `npm install` 기본 캐시 경로(`~/.npm/_cacache`)에 권한 오류(EACCES)가 났다 | `npm install --cache <다른 쓰기 가능한 경로>`로 캐시 위치를 바꿔서 우회함. 근본 원인(그 폴더 권한이 왜 깨졌는지)은 안 고치고 넘어감 |
| 학교 네트워크 | 아직 확인 전 (stack-inputs.md에도 미기록) | |
| 개인 노트북 수 | 아직 확인 전 (stack-inputs.md에도 미기록) | |
