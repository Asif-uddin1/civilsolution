from colorsys import rgb_to_hsv
from pathlib import Path
from PIL import Image

for path in [Path('/home/ubuntu/civil-solution-website/client/public/netlify-assets/supplied-work/civil-solution-footer-logo-clean.webp')]:
    image = Image.open(path).convert('RGBA')
    green_opaque = 0
    opaque = 0
    for red, green, blue, alpha in image.getdata():
        if alpha > 240:
            opaque += 1
            hue, saturation, value = rgb_to_hsv(red / 255, green / 255, blue / 255)
            if 75 <= hue * 360 <= 165 and saturation > 0.18 and green >= red and green >= blue:
                green_opaque += 1
    corners = [image.getpixel(point)[3] for point in [(0, 0), (image.width - 1, 0), (0, image.height - 1), (image.width - 1, image.height - 1)]]
    print(f'{path.name}: size={image.size} opaque={opaque} opaque_green={green_opaque} corner_alpha={corners} alpha_extrema={image.getchannel("A").getextrema()}')
