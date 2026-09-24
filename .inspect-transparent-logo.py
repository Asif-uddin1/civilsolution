from pathlib import Path
from PIL import Image

path = Path('/home/ubuntu/civil-solution-website/client/public/netlify-assets/supplied-work/civil-solution-footer-logo-clean.webp')
image = Image.open(path).convert('RGBA')
alpha = image.getchannel('A')
histogram = alpha.histogram()
transparent = sum(histogram[:8])
opaque = sum(histogram[248:])
print(f'size={image.width}x{image.height}')
print(f'alpha_extrema={alpha.getextrema()}')
print(f'transparent_pixels={transparent}')
print(f'opaque_pixels={opaque}')
print(f'corner_alpha={[image.getpixel(point)[3] for point in [(0, 0), (image.width - 1, 0), (0, image.height - 1), (image.width - 1, image.height - 1)]]}')
if any(image.getpixel(point)[3] != 0 for point in [(0, 0), (image.width - 1, 0), (0, image.height - 1), (image.width - 1, image.height - 1)]):
    raise SystemExit('Logo corner is not transparent')
