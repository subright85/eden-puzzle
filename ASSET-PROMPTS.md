# 이든의 퍼즐 — 이미지 생성 프롬프트 세트

작성 2026-09-08 (Robin). Gemini(재미나이) 등 이미지 생성기에 복붙용.
앱 캔버스는 **4:3 (800×600 논리 크기)** — 비율이 다르면 잘리니 프롬프트의 4:3 지시를 지울 것.

## 사용법

1. 아래 **공통 스타일**을 프롬프트 맨 앞에 붙인다.
2. 그 뒤에 씬별 프롬프트를 이어 붙인다.
3. 마음에 안 들면 같은 프롬프트로 2~3회 재생성이 수정 지시보다 빠르다.
4. 씬당 최고 1장을 골라 Robin 텔레그램 채팅에 던지면 리사이즈+앱 탑재는 Robin이 한다.

## 공통 스타일 (모든 프롬프트 앞에)

```
Colorful children's illustration for young kids, flat vector style,
thick dark outlines, bright crayon colors, cute rounded smiling characters,
cheerful and friendly, colorful details spread evenly across the ENTIRE image
with no large empty single-color areas, no text, no letters, no watermark,
4:3 landscape aspect ratio
```

> ⚠️ 프롬프트에 "jigsaw puzzle"을 넣지 말 것 — 생성기가 그림 위에 퍼즐 조각 선을
> 그려버린다. 조각 나누기는 앱이 한다 (성철 정정 2026-09-08).
> "no large empty single-color areas"가 퍼즐 핵심 제약 — 넓은 단색 하늘이 있으면
> 그 구역 조각들이 전부 똑같이 생겨서 못 맞춘다.

## 씬별 프롬프트

| # | 씬 | 이어 붙일 프롬프트 |
|---|---|---|
| 1 | 우주 | — a happy rocket flying past a ringed planet, waving astronaut, twinkling stars, colorful comets and small planets filling the sky |
| 2 | 바닷속 | — underwater world with a big smiling whale, clownfish, sea turtle, octopus, colorful coral reef, bubbles and sun rays |
| 3 | 공룡 | — happy dinosaurs (t-rex, triceratops, long-neck) among palm trees, a volcano with puffy pink smoke, little flowers everywhere |
| 4 | 열기구 | — colorful hot air balloons over green rolling hills, fluffy clouds, birds, a rainbow, tiny houses below |
| 5 | 농장 | — red barn, smiling cow, pig, chicken and sheep, sunflowers, a small tractor, sun with a happy face |
| 6 | 불꽃놀이 | — night festival sky FILLED with many colorful firework bursts of different shapes over a cozy town with glowing lanterns |
| 7 | 공사장 | — busy construction site with a friendly excavator, dump truck, crane and cement mixer with smiling faces, traffic cones, dirt piles |
| 8 | 기차 | — a cheerful train with colorful cars riding through mountains, tunnel, bridge, waving animals as passengers |
| 9 | 아이스크림 나라 | — candy land with ice cream mountains, donut trees, chocolate river, candy houses, marshmallow clouds |
| 10 | 사파리 | — safari with smiling lion, elephant, giraffe and zebra, acacia trees, a jeep, birds in a sunny sky |

## 명화 팩 — 생성 대신 CC0 원본

별밤(고흐)·큰 파도(호쿠사이)·정글(루소) 등은 생성하지 않는다.
메트로폴리탄(Met) · 시카고 미술관(AIC) · 레익스뮤지엄이 **CC0**(조건 없음) 고해상도
원본을 공식 API로 제공 — Robin이 직접 다운로드→리사이즈→탑재.
원하면 기기 내 그림변환 필터를 통과시켜 "심플 버전"도 가능.

## 비용 참고 (2026-09 조사)

- Gemini 앱에서 직접 생성: 구독 내 무료.
- API 자동화: Nano Banana 2 기준 1K 한 장 ~$0.067 → 씬 15장 ~$1. Pro ~$0.13/장. Batch는 반값.
