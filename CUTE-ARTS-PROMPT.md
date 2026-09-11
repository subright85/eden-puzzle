# 명화 → 아이용 귀여운 버전 변환 프롬프트 (Antigravity용)

작성 2026-09-08 (Robin). 아래 블록을 통째로 Antigravity에 붙여넣으면 된다.
원본은 건드리지 않고 원본 옆에 `.kid` 태그 파일명(`starry.kid.jpg`)으로 새로 만든다 — 탑재는 Robin이 한다 (성철 지시 msg 2227: 파일명 태그로 아동판 구분, 키드 모드에서만 노출).

---

## 붙여넣을 프롬프트

```
You are converting famous public-domain paintings into cute, toddler-friendly
versions for a children's jigsaw puzzle app.

For EACH painting listed below:
1. Open the input image file.
2. Generate a cute children's illustration VERSION of it that keeps the
   original composition and color mood clearly recognizable (a parent should
   instantly say "oh, that's Starry Night!"), but redrawn as:
   flat vector style, thick dark outlines, bright crayon colors, simplified
   rounded shapes, cute smiling faces on people and animals, cheerful and
   friendly, details spread evenly across the entire image, no scary or sad
   expressions, no text, no letters, no watermark, 4:3 landscape aspect ratio.
3. Save the result as JPEG, 1200×900 or larger, to the output path.
   Create the output directory if it does not exist:
   /Users/sukim/Documents/Agents/Robin/projects/eden-puzzle/assets/arts/  (filename: <orig>.kid.jpg)

Input directory:
/Users/sukim/Documents/Agents/Robin/projects/eden-puzzle/assets/arts/

| # | Painting | Input file | Output file | Style hint |
|---|---|---|---|---|
| 1 | The Starry Night (Van Gogh) | starry.jpg | starry.kid.jpg | swirly night sky with smiling moon and stars over a cozy village |
| 2 | Sunflowers (Van Gogh) | sunflower.jpg | sunflower.kid.jpg | happy sunflowers with cute faces in a vase |
| 3 | The Bedroom (Van Gogh) | bedroom.jpg | bedroom.kid.jpg | cozy little room, warm and inviting |
| 4 | Café Terrace at Night (Van Gogh) | cafeterrace.jpg | cafeterrace.kid.jpg | glowing yellow café, starry street, tiny friendly people |
| 5 | Water Lilies (Monet) | lilies.jpg | lilies.kid.jpg | pond with round lily pads, maybe a smiling frog or duck added |
| 6 | Impression, Sunrise (Monet) | sunrise.jpg | sunrise.kid.jpg | big smiling orange sun rising over little boats |
| 7 | La Grande Jatte (Seurat) | jatte.jpg | jatte.kid.jpg | park picnic day, cute people and pets on green grass |
| 8 | The Circus (Seurat) | circus.jpg | circus.kid.jpg | happy circus with white horse and acrobat, colorful ring |
| 9 | The Dance Class (Degas) | dance.jpg | dance.kid.jpg | little ballerinas practicing, pastel and joyful |
| 10 | Two Sisters (Renoir) | sisters.jpg | sisters.kid.jpg | big sister and little sister with a basket of yarn balls |
| 11 | The Great Wave (Hokusai) | wave.jpg | wave.kid.jpg | big friendly wave with foam fingers, tiny boats, Mount Fuji behind |
| 12 | Red Fuji (Hokusai) | redfuji.jpg | redfuji.kid.jpg | smiling red mountain with fluffy cloud pattern sky |
| 13 | Sudden Shower (Hiroshige) | shower.jpg | shower.kid.jpg | people with umbrellas hurrying over a bridge in gentle rain |
| 14 | Plum Garden (Hiroshige) | plum.jpg | plum.kid.jpg | blooming pink plum tree up close, petals floating |
| 15 | Jungle (Rousseau) | jungle.jpg | jungle.kid.jpg | lush jungle leaves with cute hidden monkeys and flowers |
| 16 | Surprised! (Rousseau) | tiger.jpg | tiger.kid.jpg | adorable wide-eyed tiger in windy jungle grass, playful not scary |
| 17 | The Child's Bath (Cassatt) | bath.jpg | bath.kid.jpg | mom gently washing toddler's feet, warm and tender |
| 18 | The Milkmaid (Vermeer) | milkmaid.jpg | milkmaid.kid.jpg | kind milkmaid pouring milk, cozy kitchen, warm light |
| 19 | Children's Games (Bruegel) | games.jpg | games.kid.jpg | town square FULL of kids playing dozens of little games |

Do all 19. If a generation looks off, retry that one up to 2 times and keep
the best. Do not modify or delete the original input files.
```

---

## 참고 (Robin 메모)

- 출력이 `assets/arts/cute/`에 다 모이면 Robin이 800×600 리사이즈 후 앱에 탑재
  (원작/귀여운 버전 토글로 갈지, 교체로 갈지는 그때 성철 결정).
- 스타일 힌트는 원작 구도 유지가 핵심 — "명화인 걸 알아볼 수 있는 귀여운 버전"이
  이 팩의 상품성이다.
