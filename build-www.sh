#!/bin/zsh
# www/ 빌드: 웹 소스 → Capacitor 네이티브 번들용 변환 사본
# 변환 3가지: ① 구글 폰트 CDN → 로컬 woff2  ② 준비 중 로그인 버튼 숨김 (Kids 심사)  ③ 원본 소스 이미지 제외
set -e
cd "$(dirname "$0")"
rm -rf www && mkdir www
cp index.html sw.js manifest.webmanifest privacy.html icon-180.png icon-512.png www/
rsync -a --exclude='puzzles/[0-9][0-9]_*.jpg' assets www/
python3 - <<'EOF'
s=open('www/index.html').read()
cdn='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&family=Gowun+Dodum&family=Noto+Serif+KR:wght@400;600&display=swap">'
assert s.count(cdn)==1 or 'href="assets/fonts/fonts.css"' in s, 'fonts link not found'
s=s.replace(cdn,'<link rel="stylesheet" href="assets/fonts/fonts.css">')
assert s.count('</style>')>=1
s=s.replace('</style>','#acctG,#acctA{display:none!important}\n</style>',1)
open('www/index.html','w').write(s)
print('www transform ok')
EOF
# preconnect 링크는 남아도 무해(연결만 미리 열고 요청 없음)지만 있으면 지운다
python3 - <<'EOF'
import re
s=open('www/index.html').read()
s=re.sub(r'<link rel="preconnect"[^>]*fonts[^>]*>\n?','',s)
open('www/index.html','w').write(s)
EOF
echo "www build done: $(du -sh www | cut -f1)"
