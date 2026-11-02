# 코딩 스타일 (팀 합의)

> **저장 위치:** `docs/CODE-STYLE.md`

> **사용 방법**
> 1. 5명이 같은 규칙으로 쓰기 위한 **팀 규칙**만 적습니다. **테크리더가 씁니다.** 테스트 담당은 테스트 규칙을 한두 줄로 채팅에 전달하고(반영은 테크리더 한 사람), 팀이 결정합니다. 내 취향(응답 언어, 에디터 설정)은 `~/.claude/CLAUDE.md`나 `CLAUDE.local.md`에 둡니다.
> 2. **"깔끔하게"처럼 모호한 문장을 쓰지 않습니다.** 확인할 수 있는 규칙(포매터 설정, 이름 규칙)으로 씁니다. 지키는지 확인하는 **방법**을 오른쪽 칸에 적습니다.
> 3. 규칙은 **8개 이하**로 합니다. 지켜지지 않을 규칙은 없는 게 낫습니다.
> 4. 팀이 합의한 뒤 `CLAUDE.md`에서 `@docs/CODE-STYLE.md`로 가져옵니다 (`CLAUDE.md`는 짧게 둡니다). 2-2에서 `.claude/rules/`로 나눴다면 그 파일과 겹치지 않게 합니다.
> 5. Claude는 규칙끼리 모순되는지 점검하기만 합니다. 규칙의 내용은 팀이 정합니다.
> 6. `>`로 시작하는 안내 문장은 지워도 됩니다.

- 합의일:
- 근거: `STACK.md`, `CLAUDE.md`(또는 `.claude/rules/`)

## 규칙

| # | 규칙 | 지키는지 확인하는 방법 |
| --- | --- | --- |
| 1 | 이름 규칙: Python 파일·함수·변수는 `snake_case`, 클래스는 `PascalCase`. React 컴포넌트 이름과 파일은 `PascalCase`(예: `ReceiptUpload`), 함수·변수는 `camelCase`, 상수는 `UPPER_SNAKE_CASE`. 상태값·필드 이름은 `DATA-MODEL.md`에 적힌 그대로 쓴다 | PR 리뷰에서 확인. 린터를 도입하면 린터 규칙으로 확인 |
| 2 | 포매터·린터: Python은 Ruff(설정: `backend/pyproject.toml`), React는 ESLint + Prettier(설정: `frontend/`). 도입 여부는 뼈대를 세울 때 테크리더가 정한다 | 명령: 확인 필요 (`scaffold-log.md`에 실제로 돌려 본 명령이 기록되면 옮김) |
| 3 | 폴더: 화면은 `frontend/`, 서버는 `backend/`, 서버 테스트는 `backend/tests/`에 둔다. 공유 파일은 루트 설정, `.github/`, 의존성 파일, `.env.example`. 화면 테스트 위치는 미정 (아래 담당 폴더 표) | PR에서 바뀐 파일 경로가 자기 담당 폴더인지 확인 |
| 4 | 공유 파일(공통 코드, 설정, 의존성 파일)은 테크리더, 문서 공유 파일(`docs/API.md`, `docs/DATA-MODEL.md`)은 PM만 고친다 | PR에서 확인 |
| 5 | 커밋 메시지: `feat:` `fix:` `test:` `docs:` `logs:` + 내용, 한국어로 쓴다 (1커밋 = 1의도. 종류는 `CLAUDE.md` 브랜치 종류와 같음) | `git log --oneline` |
| 6 | 테스트 이름: 어떤 스토리·인수 조건을 확인하는지 알 수 있게 쓴다 | `US-xx`가 이름이나 주석에 있다 |
| 7 | 테스트의 기대값을 구현에 맞춰 바꾸지 않는다 | 구현 PR의 `git diff`에 기존 테스트 기대값 변경이 없다 |
| 8 | 비밀 값(키, 비밀번호)을 코드·문서에 쓰지 않는다 | `.env`만 사용, `.gitignore` 확인 |

## 담당 폴더
| 영역 | 폴더 | 수정할 수 있는 사람 |
| --- | --- | --- |
| 공유 (공통 코드, 설정, 의존성 파일) | 루트 설정, `.github/`, `backend/pyproject.toml`, `frontend/package.json`, `.env.example` | 테크리더 (요청은 PR 댓글로) |
| 서버 | `backend/` (`backend/tests/` 제외) | 개발자1 |
| 화면 | `frontend/` | 개발자2 |
| 테스트 | `backend/tests/` (화면 테스트 위치는 미정) | 테스트 담당 |
