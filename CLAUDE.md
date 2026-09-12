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
- 코인 (9/11 변경): 단일 코인. 매일 3개 + 완성 1/2/3개. 프리미엄 새 판 1개, 오늘의 퍼즐·사진·이어하기 무료. 기존 별코인과 당일 잔여 무지개코인은 한 번만 합산 이전한다.
- 보상 (9/11): 고정 별 3개 제거. 작품별 최고 완료 조각 수를 bestPieces에 저장. 놀이터 6/12/24/48조각, 작업실 24/48/96/150조각에서 테마별 4단계 프레임. 낮은 난도로 재완성해도 다운그레이드하지 않는다. 사진 교체 시 이전 사진의 완료·프레임·모든 난도 진행을 초기화한다.
- 상단은 한 줄: 로고 / 놀이터·작업실 토글 / 코인 / 설정. 계정·기록은 설정에 통합. 사진 퍼즐은 두 모드 홈에 직접 노출. 작업실은 따뜻한 종이·초록색 테마. 놀이터는 상상놀이/동화/명화/세계여행 한 단계 분류이며 성경 그림은 홈과 앨범 모두에서 제외한다.
- 프레임 스킨: 작업실은 원목/도자기/월넛/골드 원본, 놀이터는 별도 *-kid-v1.png 햇살/숲속/꽃밭/무지개. 앨범 기본 탭은 내 액자, 전체 그림은 보조 탭.
- 명화는 생성 대신 미술관 CC0/PD 원본 (Met·Commons 등), 아이 기준 큐레이션(누드·로맨스 제외).
- **아동판 에셋 컨벤션 (msg 2227):** 명화의 아동용 리제너레이트본은 원본 옆 `assets/arts/<id>.kid.jpg` + 해당 ARTS 엔트리에 `kimg:` 필드 추가. kimg 있는 그림만 키드 캐러셀에 노출(기본 그림 10장 뒤), 키드 모드의 썸네일·게임 렌더 전부 kimg 사용(artSrc/artKey). kimg 필드는 실제 파일이 존재할 때만 넣는다.
