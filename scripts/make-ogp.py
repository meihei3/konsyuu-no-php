#!/usr/bin/env python3
"""OGP 画像 (public/og.png, 1200x630) を生成する。

使い方: python3 scripts/make-ogp.py
要 Pillow と Noto Sans CJK フォント。サイトの配色 (#0b5cad / #f2f7fc) に合わせた
シンプルなデザイン。タイトルなどを変えたら再実行して og.png を更新すること。
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BLUE = (11, 92, 173)        # #0b5cad
DARK = (26, 26, 26)         # #1a1a1a
GRAY = (68, 68, 68)
LIGHT = (242, 247, 252)     # #f2f7fc

BOLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
REG = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"

img = Image.new("RGB", (W, H), (255, 255, 255))
d = ImageDraw.Draw(img)

# 上部の帯と淡い背景パネル
d.rectangle([0, 0, W, 18], fill=BLUE)
d.rectangle([0, H - 90, W, H], fill=LIGHT)

title_font = ImageFont.truetype(BOLD, 118)
sub_font = ImageFont.truetype(REG, 41)
foot_font = ImageFont.truetype(BOLD, 37)

d.text((80, 168), "今週のPHP（Re）", font=title_font, fill=DARK)
d.rectangle([84, 330, 204, 338], fill=BLUE)
d.text((80, 372), "php.internals の過去1週間の議論を、", font=sub_font, fill=GRAY)
d.text((80, 428), "日本語で噛み砕いてまとめる週次レポート", font=sub_font, fill=GRAY)
d.text((80, H - 62), "weekly-php.meihei.dev", font=foot_font, fill=BLUE)

img.save("public/og.png")
print("wrote public/og.png")
