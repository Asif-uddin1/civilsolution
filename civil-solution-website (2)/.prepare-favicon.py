from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/civil-solution-website/client/public/netlify-assets/supplied-work/civil-solution-footer-logo-clean.webp')
target = Path('/home/ubuntu/civil-solution-website/client/public/favicon.png')

logo = Image.open(source).convert('RGBA')
logo.thumbnail((54, 54), Image.Resampling.LANCZOS)
canvas = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
left = (64 - logo.width) // 2
top = (64 - logo.height) // 2
canvas.alpha_composite(logo, (left, top))
canvas.save(target, format='PNG', optimize=True)
print(f'created={target} size={canvas.width}x{canvas.height} bytes={target.stat().st_size}')
