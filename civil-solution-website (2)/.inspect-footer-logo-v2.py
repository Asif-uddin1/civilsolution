from pathlib import Path
from PIL import Image

for path in [Path('/home/ubuntu/upload/pasted_file_MDWEZk_image.png'), Path('/home/ubuntu/webdev-static-assets/civil-solution-footer-logo-v2.webp')]:
    image = Image.open(path).convert('RGBA')
    alpha = image.getchannel('A')
    histogram = alpha.histogram()
    transparent = sum(histogram[:8])
    translucent = sum(histogram[8:224])
    opaque = sum(histogram[224:])
    sample = [image.getpixel(point) for point in [(0, 0), (image.width - 1, 0), (0, image.height - 1), (image.width - 1, image.height - 1)]]
    print(f'{path.name}: size={image.size} transparent={transparent} translucent={translucent} opaque={opaque} bbox={alpha.getbbox()} corners={sample}')
