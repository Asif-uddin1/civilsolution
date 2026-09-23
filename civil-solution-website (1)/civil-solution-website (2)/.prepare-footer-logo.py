from pathlib import Path

from PIL import Image

source = Path('/home/ubuntu/upload/IMG_20220302_160036.jpg.png')
target = Path('/home/ubuntu/webdev-static-assets/civil-solution-footer-logo.webp')

image = Image.open(source).convert('RGBA')
pixels = image.load()
width, height = image.size

# Estimate the uniform pale background from the four corners.
corner_points = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
background = tuple(round(sum(image.getpixel(point)[channel] for point in corner_points) / len(corner_points)) for channel in range(3))

for y in range(height):
    for x in range(width):
        red, green, blue, _ = pixels[x, y]
        distance = max(abs(red - background[0]), abs(green - background[1]), abs(blue - background[2]))
        alpha = min(255, max(0, (distance - 7) * 32))
        pixels[x, y] = (red, green, blue, alpha)

bbox = image.getchannel('A').point(lambda value: 255 if value > 8 else 0).getbbox()
if bbox is None:
    raise RuntimeError('Could not identify the logo mark')

margin = 18
left = max(0, bbox[0] - margin)
top = max(0, bbox[1] - margin)
right = min(width, bbox[2] + margin)
bottom = min(height, bbox[3] + margin)
logo = image.crop((left, top, right, bottom))
logo.save(target, 'WEBP', lossless=True, method=6)

print(f'created={target}')
print(f'background={background}')
print(f'dimensions={logo.width}x{logo.height}')
print(f'bytes={target.stat().st_size}')
