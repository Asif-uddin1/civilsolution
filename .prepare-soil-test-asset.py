from pathlib import Path

from PIL import Image, ImageFilter

source = Path('/home/ubuntu/upload/soiltest.jpeg')
target = Path('/home/ubuntu/webdev-static-assets/soil-test-supplied.webp')
target.parent.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert('RGB')
width, height = image.size

# Conservative face regions for the visible workers in the lower-middle work area.
# The boxes intentionally include a small margin around each head to anonymize faces
# without obscuring the drilling rig or the surrounding site context.
face_boxes = [
    (500, 952, 578, 1040),
    (735, 968, 803, 1050),
    (814, 984, 878, 1062),
    (886, 992, 950, 1070),
]

for box in face_boxes:
    x1, y1, x2, y2 = box
    crop = image.crop((max(0, x1), max(0, y1), min(width, x2), min(height, y2)))
    blurred = crop.filter(ImageFilter.GaussianBlur(radius=18))
    image.paste(blurred, (max(0, x1), max(0, y1)))

max_width = 900
if width > max_width:
    image.thumbnail((max_width, height), Image.Resampling.LANCZOS)

image.save(target, 'WEBP', quality=82, method=6)
print(f'created={target}')
print(f'dimensions={image.width}x{image.height}')
print(f'faces_blurred={len(face_boxes)}')
print(f'bytes={target.stat().st_size}')
