#!/usr/bin/env python3
"""OGP 画像 (public/og.png, 1200x630) を生成する。

使い方: python3 scripts/make-ogp.py
要 Pillow。フォントは Ema の指定 (2026-11-17) で Noto Sans
(Noto Sans CJK JP, Bold)。デザインも Ema の指定で
「白背景に『今週のPHP（Re）』の文字だけ」。装飾・説明文・ドメイン表記なし。
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
DARK = (26, 26, 26)         # #1a1a1a
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"

img = Image.new("RGB", (W, H), (255, 255, 255))
d = ImageDraw.Draw(img)

# TTC の index 0 が Noto Sans CJK JP
font = ImageFont.truetype(FONT, 130, index=0)
text = "今週のPHP（Re）"
bbox = d.textbbox((0, 0), text, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text(((W - tw) / 2 - bbox[0], (H - th) / 2 - bbox[1]), text, font=font, fill=DARK)

img.save("public/og.png")
print("wrote public/og.png")
