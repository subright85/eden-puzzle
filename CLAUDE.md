# CLAUDE.md — eden-puzzle

이든(유아)용 광고 없는 직소 퍼즐 PWA. 라이브: https://eden-puzzle.vercel.app

## 인프라 사실

- **Apple Developer 계정: 성철 보유** (2026-09-09 직접 확인, msg 2064) — 앱스토어 제출 트랙(Capacitor 래핑 → Xcode → 심사) 언제든 시작 가능.
- 남은 로그인 블로커: Google OAuth 클라이언트, Supabase 새 프로젝트 (둘 다 성철 액션).
- Vercel 프로젝트 eden-puzzle이 정본. eden-puzzle2는 진단용 잔재(삭제 후보).

## 구조·배포 루틴

- 단일 파일 앱: `index.html`에 CSS/JS 인라인. 외부 의존성 0.
- 배포마다 `BUILD` 상수(index.html)와 `sw.js` 캐시 이름을 함께 올린다 (관례: BUILD vN ↔ sw eden-v(N-1)).
- 파이프라인: 문법 체크(`new Function(<script> 추출)`) → jsdom 스모크(scratchpad/smoke*.js) → git commit → `vercel deploy --prod --yes` → `curl | grep BUILD`로 라이브 확인.
- 기하(edgeSegs/jigEdge) 수정 시 interlock 수치 검증(scratchpad/interlock2.js) 재실행 필수.

## 제품 결정 (성철 지시)

- 퍼즐 컷은 **standard만 활성** (9/8) — classic/wave/bubble 재개 조건 = 직선 구간을 곡선화한 뒤 성철 확인.
- 이미지 생성 프롬프트에 "jigsaw puzzle" 단어 금지 — 생성기가 퍼즐 컷 선을 그려버림 (9/8).
- 코인: ⭐별코인(완성 보상 1/2/3) + 🌈무지개코인(매일 3개, 프리미엄 1판=1개, 이어하기 무료) (9/9).
- 명화는 생성 대신 미술관 CC0/PD 원본 (Met·Commons 등), 아이 기준 큐레이션(누드·로맨스 제외).
