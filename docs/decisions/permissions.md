# 권한 설정 기록

> **저장 위치:** `docs/decisions/permissions.md`

> **사용 방법**
> 1. `.claude/settings.json`에는 **주석을 쓸 수 없어서** 규칙의 이유와 시험 결과는 이 파일에 적습니다. `settings.json`과 **같은 내용**이어야 합니다.
> 2. 규칙을 `settings.json`에 넣을 때마다 아래 표에 한 줄을 추가합니다. **이유 없는 규칙은 넣지 않습니다.**
> 3. 쓴 규칙은 새 Claude Code 대화에서 **직접 시험**하고 '실제'를 눈으로 본 대로 적습니다. `/permissions`로 규칙과 출처를 확인합니다.
> 4. 판정 순서는 **deny → ask → allow**입니다. deny가 이깁니다.
> 5. 규칙 이름은 `Edit(경로)`로 씁니다 (`Write(경로)`가 아닙니다). 경로는 `./`로 시작합니다. `*`는 `/`를 넘지 않고 `**`는 하위 폴더까지 포함합니다.
> 6. **명령을 막는 규칙은 모든 실행 경로를 막는 격리가 아닙니다.** (예: `curl`만 막는다고 모든 네트워크 접근이 막히지 않습니다.)
> 7. `>`로 시작하는 안내 문장은 지워도 됩니다.

- 작성일: 2026-10-27
- 위치: `.claude/settings.json` (팀 공유, 커밋됨). 내 컴퓨터에서만 쓸 허용은 `.claude/settings.local.json`

## 규칙과 이유

| 구분 (allow / ask / deny) | 규칙 | 왜 필요한가 | 어느 원칙에서 왔나 |
| --- | --- | --- | --- |
| allow | `Bash(git status)` | 읽기만 하는 명령이다 | 없음 (읽기 전용이라 안전) |
| allow | `Bash(git diff *)` | 읽기만 하는 명령이다 | 없음 (읽기 전용이라 안전) |
| allow | `Bash(git log *)` | 읽기만 하는 명령이다 | 없음 (읽기 전용이라 안전) |
| ask | `Edit(./docs/requirements/backlog.md)` | 인수 조건은 사람이 쓴다 | `CLAUDE.md` "Claude에게 맡기지 않는 것" — 인수 조건을 고치거나 새로 쓰기 |
| ask | `Bash(git push *)` | 올리기 전에 사람이 본다 | `CLAUDE.md` 팀 규칙 — main에 바로 커밋하지 않는다 (브랜치 → PR → 병합) |
| deny | `Read(./.env)`, `Read(./.env.*)` | 비밀 값을 읽지 못하게 한다 | `claude-rules.md` — 비밀 값(키·비밀번호)은 어디에도 적지 않는다 |
| deny | `Edit(./docs/proposal/**)` | 이미 낸 제안서는 수업 중에 고치지 않는다 | `CLAUDE.md` "Claude에게 맡기지 않는 것" — 이미 낸 제안서(docs/proposal/) 고치기 |

## 시험 결과

> 새 대화에서 요청하고, 나온 그대로 적습니다. 기대와 다르면 규칙 이름과 경로를 다시 봅니다.

> **1~3행은 재시험 필요**: 아래 결과는 `/Users/gaeun/Desktop/ddakjaego`(상위 폴더, `document`가 아님)에서 실행됐다. `.claude/settings.json`은 `document/` 안에만 있고 그 폴더는 git 저장소도 아니라서, **권한 규칙 자체가 전혀 로드되지 않은 상태의 결과**다. deny·ask가 실제로 작동하는지는 이 결과로 판단할 수 없다. `document` 폴더 안에서 새 대화를 열어 다시 시험해야 한다.

| 시험 (Claude에게 시킨 말) | 기대 | 실제 | 맞나 | 고친 것 |
| --- | --- | --- | --- | --- |
| `docs/proposal/` 아래 파일을 고쳐 달라고 한다 | 차단됨 | 차단됨 — `document` 폴더에서 재시험. Claude가 `CLAUDE.md`의 "이미 낸 제안서(docs/proposal/) 고치기" 규칙을 보고 Edit를 시도조차 하지 않고 거부함. 실제 파일은 그대로였다 | 맞음 (결과는 기대와 같음. 단, CLAUDE.md 자체 판단으로 막힌 것이라 `settings.json`의 `deny` 규칙이 별도로도 작동하는지는 이 테스트만으로 확인 안 됨) | 없음 |
| `backlog.md`를 고쳐 달라고 한다 | 실행 전에 확인을 물음 | 수정되지 않음 — `document` 폴더에서 재시험. 다만 확인(y/n) 프롬프트는 뜨지 않았고, Claude가 `CLAUDE.md`의 "인수 조건은 사람이 쓴다" 규칙을 보고 Edit를 시도하지 않은 채 스스로 거부함. 실제 파일은 그대로였다 | 다름 (결과는 안전하지만 "확인을 물음"이 아니라 "아예 시도 안 함"이었다) | 없음 — `ask`가 실제로 프롬프트를 띄우는지 보려면 `CLAUDE.md`에 이 규칙이 없는 상태에서 한 번 더 시험해야 함 |
| `git status`를 실행해 달라고 한다 | 묻지 않고 실행됨 | 묻지 않고 바로 실행됨 — `document` 폴더에서 재시험. 실제 브랜치(`docs/stack-decision`)와 수정 파일(`docs/decisions/permissions.md`) 결과가 정확히 나왔다 | 맞음 | 없음 |
| `git push` 해 달라고 한다 (커밋할 게 있는 상태에서) | 실행 전에 확인을 물음 | 확인 없이 바로 push됨 — `docs/stack-decision` 브랜치가 origin에 새로 생성되고 PR #61로 자동 병합까지 됐다. 이번엔 `CLAUDE.md`에도 막는 규칙이 없어서 `settings.json`의 `ask` 규칙만 작동했어야 하는데, 그마저 프롬프트 없이 통과됨 | ✗ (규칙이 작동하지 않음) | 아직 안 고침 — `Bash(git push *)` 패턴이 실제 실행된 명령과 안 맞는지 `/permissions`로 확인 필요. 패턴 표기(`*`가 공백 포함 인자를 못 맞출 수 있음)를 다시 보거나, Claude Code 버전에서 `Bash` ask 룰 자체의 동작을 확인해야 함 |

## 막지 않은 것과 이유
> 막을 수 있었지만 **일부러 막지 않은 것**도 적습니다. 나중에 왜 열려 있는지 알 수 있습니다.
-

## 확인할 것
- [x] `settings.json`이 유효한 JSON이다 (쉼표, 따옴표)
- [ ] `CLAUDE.md`의 "Claude에게 맡기지 않는 것" 중 **파일로 막을 수 있는 것**이 여기에도 있다 — **빠진 것 발견**: "MVP 범위 바꾸기"(`docs/decisions/mvp-scope.md`)와 "기술 스택 바꾸기"(`docs/STACK.md`)는 `CLAUDE.md`에는 있지만 현재 `main`의 `settings.json`에 규칙이 없다. 원격 브랜치 `claude/settings.json`에 이미 두 파일의 `ask` 규칙(및 `git push origin main*`·`--force`·`rm -rf` 등 추가 deny)이 준비돼 있으니, 그 PR이 머지되면 이 체크는 자동으로 해결된다
- [x] 키·비밀번호가 `settings.json`과 이 문서 어디에도 없다
