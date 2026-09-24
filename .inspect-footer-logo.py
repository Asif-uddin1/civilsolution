from pathlib import Path
from PIL import Image

for path in [Path('/home/ubuntu/upload/IMG_20220302_160036.jpg.png'), Path('/home/ubuntu/webdev-static-assets/civil-solution-footer-logo.webp')]:
    image = Image.open(path).convert('RGBA')
    alpha = image.getchannel('A')
    histogram = alpha.histogram()
    opaque = sum(histogram[224:])
    transparent = sum(histogram[:8])
    print(f'{path.name}: mode={image.mode} size={image.size} alpha_min={alpha.getextrema()[0]} alpha_max={alpha.getextrema()[1]} transparent={transparent} opaque={opaque} bbox={alpha.getbbox()}')
