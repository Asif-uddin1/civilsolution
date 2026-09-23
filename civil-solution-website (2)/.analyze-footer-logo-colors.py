from collections import Counter
from pathlib import Path
from PIL import Image

for path in [Path('/home/ubuntu/upload/pasted_file_MDWEZk_image.png'), Path('/home/ubuntu/webdev-static-assets/civil-solution-footer-logo-v2.webp')]:
    image = Image.open(path).convert('RGB')
    small = image.resize((180, 180))
    colors = Counter(small.getdata())
    print(path.name)
    for color, count in colors.most_common(12):
        print(f'  rgb={color} count={count}')
