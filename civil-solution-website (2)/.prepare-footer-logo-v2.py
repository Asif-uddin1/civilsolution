from colorsys import rgb_to_hsv
from pathlib import Path

from PIL import Image, ImageFilter

source = Path('/home/ubuntu/upload/pasted_file_MDWEZk_image.png')
target = Path('/home/ubuntu/webdev-static-assets/civil-solution-footer-logo-v2.webp')

image = Image.open(source).convert('RGBA')
width, height = image.size
mask = Image.new('L', (width, height), 0)
mask_pixels = mask.load()
pixels = image.load()

for y in range(height):
    for x in range(width):
        red, green, blue, source_alpha = pixels[x, y]
        r, g, b = red / 255, green / 255, blue / 255
        hue, saturation, value = rgb_to_hsv(r, g, b)
        hue_degrees = hue * 360

        # The supplied background is vivid green; preserve the brown/orange frame,
        # pale outline, and cyan CS lettering while removing green pixels.
        green_background = (
            82 <= hue_degrees <= 158
            and saturation > 0.22
            and green > red * 1.08
            and green > blue * 1.02
            and value > 0.12
        )
        if source_alpha < 160 or green_background:
            alpha = 0
        else:
            alpha = source_alpha
        mask_pixels[x, y] = alpha

# Remove isolated green-edge remnants, then retain a softened alpha boundary.
mask = mask.filter(ImageFilter.MedianFilter(size=3)).filter(ImageFilter.GaussianBlur(radius=0.25))
box = mask.point(lambda value: 255 if value > 100 else 0).getbbox()
if box is None:
    raise RuntimeError('Could not isolate the supplied CS logo')

margin = 30
left = max(0, box[0] - margin)
top = max(0, box[1] - margin)
right = min(width, box[2] + margin)
bottom = min(height, box[3] + margin)

logo = image.crop((left, top, right, bottom))
logo.putalpha(mask.crop((left, top, right, bottom)))
logo.save(target, 'WEBP', lossless=True, method=6)

print(f'created={target}')
print(f'original={width}x{height}')
print(f'crop={logo.width}x{logo.height}')
print(f'bytes={target.stat().st_size}')
