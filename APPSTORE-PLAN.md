# APPSTORE-PLAN — 이든의 퍼즐 앱스토어 제출 계획

작성 2026-09-09 (Robin, msg 2154 "진짜 모바일앱 배포" 리뷰 라운드). v27 기준.

## 코드 쪽 준비 상태 (v27에서 완료)

| 항목 | 상태 |
|---|---|
| 개인정보 처리방침 | ✅ `/privacy.html` (한/영, 수집 0 명시) — 설정에서 링크 |
| 노치·홈바 safe-area | ✅ home/gtop/panicHome/splash에 `env(safe-area-inset-*)` |
| iOS 제스처 방어 | ✅ user-select/touch-callout 차단, overscroll 차단, 더블탭 줌 방지 |
| 부트 대역폭 | ✅ 프리로드 63→26장 (씬 10 + 테마 콜라주 앞 4×4), 나머지 열 때 로드 |
| 배포 용량 | ✅ `.vercelignore`로 원본 소스 12MB 제외 |
| 오프라인 | ✅ SW 프리캐시(코어+씬 10+명화 3+타이틀) + 런타임 캐시 |
| PWA 메타 | ✅ viewport-fit=cover, apple-mobile-web-app-*, 아이콘 180/512, 매니페스트 |
| 광고/추적 | ✅ 0 (SDK 없음, 외부 요청은 구글 폰트뿐 — Capacitor 번들 시 로컬화 권장) |

## Capacitor 래핑 — ✅ 완료 (2026-09-10, Robin)

1. `npm init -y && npm i @capacitor/core @capacitor/cli @capacitor/ios`
2. `npx cap init "이든의 퍼즐" com.astrolabe.edenpuzzle --web-dir www`
3. `www/`에 index.html·sw.js·assets·manifest 복사 (빌드 스크립트로 자동화)
4. 구글 폰트 3종을 woff2로 받아 로컬 번들 (오프라인 앱에서 CDN 의존 제거)
5. `npx cap add ios && npx cap sync`
6. 앱 아이콘 1024×1024 + 스플래시 에셋 생성 (`@capacitor/assets`) — 타이틀 아트 마스코트 활용
7. Xcode 프로젝트 열어 서명 → 이 단계부터 성철

실행 기록: Capacitor 8.5.1, SPM 모드(CocoaPods 불필요), `build-www.sh`가 www/ 생성(폰트 로컬 8.5MB·계정 버튼 숨김·원본 제외), 아이콘 13종 생성(@capacitor/assets, resources/), 시뮬레이터 빌드 BUILD SUCCEEDED. 성철 다음 단계: `npx cap open ios` → Signing & Capabilities에서 팀 선택.

## 성철만 할 수 있는 것

- Xcode 서명 (Apple Developer 계정 로그인, 팀 선택) — 계정 보유 확인됨 (9/9 msg 2064)
- App Store Connect: 앱 등록, 번들 ID `com.astrolabe.edenpuzzle` 생성
- 심사 제출 버튼 + 스크린샷 업로드 승인 (스크린샷 초안은 Robin이 생성)
- 유료 요소 넣을 경우 계약·세금·은행 정보

## App Store Connect 입력값 (제안)

- **카테고리**: Kids > 5세 이하 (Kids Category 신청)
- **연령 등급**: 4+ (폭력·공포·도박 관련 전부 "없음")
- **App Privacy**: "데이터를 수집하지 않음" (Data Not Collected) — 전 항목 해당 없음
- **개인정보 처리방침 URL**: https://eden-puzzle.vercel.app/privacy.html
- **이름**: 이든의 퍼즐 (en: Ethan's Puzzle) / 부제: 광고 없는 아이 직소 퍼즐

## Kids Category 심사 체크리스트

- [x] 광고 없음
- [x] 외부 링크 없음 (개인정보 방침 링크는 허용 대상 — 설정 안, 필요시 부모 게이트 뒤로 이동 가능)
- [x] 데이터 수집 없음 (COPPA 안전)
- [x] 결제 없음 (현재) — 유료 패키지 도입 시 부모 게이트 필수 (ECONOMY-NOTES.md)
- [ ] 로그인 버튼 「준비 중」 상태로 제출할지, 숨기고 제출할지 결정 (심사관 혼란 여지 — **숨기고 제출 추천**)
- [x] 도박성 메커니즘 없음 (뽑기는 보류 중, 넣더라도 무료 재화 전용 — ECONOMY-NOTES.md)

## 남은 결정 (성철)

~~전부 결정됨~~ (msg 2158 "뭐든 ㄱㄱ", 2026-09-10): 번들 ID com.astrolabe.edenpuzzle · 제출 시 로그인 버튼 숨김(빌드 스크립트가 www에서만 숨김, 웹은 유지) · 이름 이든의 퍼즐/Ethan's Puzzle 병기 · Capacitor 완료.
