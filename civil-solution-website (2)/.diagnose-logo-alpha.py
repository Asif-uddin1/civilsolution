from colorsys import rgb_to_hsv
from pathlib import Path
from collections import Counter
from PIL import Image

image = Image.open(Path('/home/ubuntu/upload/pasted_file_3QvWA8_image.png')).convert('RGBA')
counts = Counter()
for red, green, blue, alpha in image.getdata():
    hue, saturation, value = rgb_to_hsv(red / 255, green / 255, blue / 255)
    if alpha < 80:
        bucket = 'a<80'
    elif alpha < 160:
        bucket = 'a80-159'
    else:
        bucket = 'a>=160'
    if 75 <= hue * 360 <= 165 and saturation > 0.18 and green >= red and green >= blue:
        counts[(bucket, 'green')] += 1
    else:
        counts[(bucket, 'other')] += 1
print('counts_by_alpha_and_hue')
for key, count in sorted(counts.items()):
    print(key, count)
