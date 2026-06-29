#!/usr/bin/env python3
"""Generate a branded QR code for Hotel Casa Mónica"""
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

URL = "https://hotel-casa-monica.vercel.app/"
OUTPUT = "/home/z/my-project/download/casa-monica-qr.png"

# Create QR code with high error correction (so the logo in center doesn't break it)
qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(URL)
qr.make(fit=True)

# Brand colors
FILL = (61, 40, 23)    # dark wood (#3D2817)
BACK = (253, 246, 232) # cream (#FDF6E8)

qr_img = qr.make_image(fill_color=FILL, back_color=BACK).convert('RGB')

# Add the Casa Mónica logo in the center
logo_path = "/home/z/my-project/public/casa-monica-logo.png"
try:
    logo = Image.open(logo_path).convert("RGBA")
    # Resize logo to ~22% of QR code size
    qr_width, qr_height = qr_img.size
    logo_size = int(qr_width * 0.22)
    logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

    # Create a white rounded background for the logo for contrast
    padding = 10
    bg_size = logo_size + padding * 2
    bg = Image.new('RGBA', (bg_size, bg_size), (255, 255, 255, 255))

    # Paste logo onto white background
    bg.paste(logo, (padding, padding), logo)

    # Paste the logo+bg combo onto the QR code (centered)
    pos = ((qr_width - bg_size) // 2, (qr_height - bg_size) // 2)
    qr_img.paste(bg, pos, bg)
    print("✓ Logo added to center")
except Exception as e:
    print(f"⚠ Could not add logo: {e}")

# Add a caption below
try:
    # Try to load a serif font
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.otf", 28)
    except:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 28)

    # Create wider canvas for caption
    caption_height = 60
    new_img = Image.new('RGB', (qr_img.width, qr_img.height + caption_height), BACK)
    new_img.paste(qr_img, (0, 0))

    draw = ImageDraw.Draw(new_img)
    caption = "Hotel Casa Mónica · Mompox"
    bbox = draw.textbbox((0, 0), caption, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (new_img.width - text_w) // 2
    y = qr_img.height + (caption_height - text_h) // 2
    draw.text((x, y), caption, fill=(200, 84, 42), font=font)  # terracotta

    qr_img = new_img
    print("✓ Caption added")
except Exception as e:
    print(f"⚠ Could not add caption: {e}")

# Save
qr_img.save(OUTPUT, 'PNG', optimize=True)
print(f"\n✓ QR code saved to: {OUTPUT}")
print(f"  Size: {qr_img.size}")
import os
print(f"  File: {os.path.getsize(OUTPUT) / 1024:.0f} KB")
print(f"  URL:  {URL}")
