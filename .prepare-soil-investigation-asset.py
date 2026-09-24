from pathlib import Path

from PIL import Image

source = Path('/home/ubuntu/webdev-static-assets/soil-investigation-wikimedia.jpg')
target = Path('/home/ubuntu/webdev-static-assets/soil-investigation-wikimedia.webp')
target.parent.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert('RGB')
max_width = 1200
if image.width > max_width:
    image.thumbnail((max_width, image.height), Image.Resampling.LANCZOS)
image.save(target, 'WEBP', quality=82, method=6)
print(f'created={target}')
print(f'dimensions={image.width}x{image.height}')
print(f'bytes={target.stat().st_size}')
