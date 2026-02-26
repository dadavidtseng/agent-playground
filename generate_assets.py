"""generate_assets.py
Generates pixel-art warrior assets:
- assets/warrior_64.png (64x64)
- assets/warrior_128.png (128x128)

Requires Pillow (PIL). Run: python generate_assets.py
"""
from PIL import Image
import os

os.makedirs('assets', exist_ok=True)

# Palette: index 0 is transparent
palette = [
    (0,0,0,0),        # 0 transparent
    (0,0,0,255),      # 1 black
    (90,62,43,255),   # 2 brown
    (200,76,46,255),  # 3 red/orange
    (242,217,116,255),# 4 gold
    (255,255,255,255) # 5 white highlight
]

# Create a small 16x16 sprite (indexed) as a base then scale nearest-neighbor
base_w = 16
base_h = 16
# Simple warrior pixel map using palette indices
# 0 transparent, other numbers refer to palette indices above
sprite = [
    [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,2,3,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,3,3,3,2,2,2,0,0,0,0],
    [0,0,0,2,2,3,3,3,3,3,2,2,2,0,0,0],
    [0,0,0,2,3,3,3,4,3,3,3,2,2,0,0,0],
    [0,0,0,2,3,3,4,4,4,3,3,2,2,0,0,0],
    [0,0,2,2,3,4,4,4,4,4,3,2,2,0,0,0],
    [0,0,2,2,3,4,5,4,4,4,3,2,2,0,0,0],
    [0,0,0,2,3,3,4,4,4,3,3,2,2,0,0,0],
    [0,0,0,0,2,3,3,3,3,3,2,2,0,0,0,0],
    [0,0,0,0,0,2,2,3,2,2,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0]
]

# Create RGBA base image
base_img = Image.new('RGBA', (base_w, base_h), (0,0,0,0))
for y in range(base_h):
    for x in range(base_w):
        idx = sprite[y][x]
        base_img.putpixel((x,y), palette[idx])

# Scale to 64x64 and 128x128 using nearest neighbor to preserve pixels
img_64 = base_img.resize((64,64), Image.NEAREST)
img_128 = base_img.resize((128,128), Image.NEAREST)

# Save as PNG with transparency
img_64.save('assets/warrior_64.png', format='PNG')
img_128.save('assets/warrior_128.png', format='PNG')

print('Generated assets/warrior_64.png and assets/warrior_128.png')
