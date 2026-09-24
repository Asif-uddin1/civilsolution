import { useEffect, useState } from "react";

type DetectedFace = { boundingBox: { x: number; y: number; width: number; height: number } };
type FaceDetectorLike = { detect: (source: HTMLCanvasElement) => Promise<DetectedFace[]> };
type FaceDetectorConstructor = new (options?: { fastMode?: boolean; maxDetectedFaces?: number }) => FaceDetectorLike;

declare global {
  interface Window {
    FaceDetector?: FaceDetectorConstructor;
  }
}

function blurFaceRegions(canvas: HTMLCanvasElement, faces: DetectedFace[]) {
  const context = canvas.getContext("2d");
  if (!context) return;
  for (const face of faces) {
    const { x, y, width, height } = face.boundingBox;
    const padX = width * 0.28;
    const padY = height * 0.34;
    const x0 = Math.max(0, x - padX);
    const y0 = Math.max(0, y - padY);
    const regionWidth = Math.min(canvas.width - x0, width + padX * 2);
    const regionHeight = Math.min(canvas.height - y0, height + padY * 2);
    if (regionWidth <= 0 || regionHeight <= 0) continue;
    const crop = document.createElement("canvas");
    crop.width = Math.ceil(regionWidth);
    crop.height = Math.ceil(regionHeight);
    const cropContext = crop.getContext("2d");
    if (!cropContext) continue;
    cropContext.filter = "blur(18px)";
    cropContext.drawImage(canvas, x0, y0, regionWidth, regionHeight, 0, 0, crop.width, crop.height);
    context.drawImage(crop, x0, y0, regionWidth, regionHeight);
  }
}

export default function PrivacyImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [displaySrc, setDisplaySrc] = useState(src);

  useEffect(() => {
    let cancelled = false;
    setDisplaySrc(src);
    const FaceDetector = typeof window !== "undefined" ? window.FaceDetector : undefined;
    if (!src || !FaceDetector) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = async () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context) return;
        context.drawImage(image, 0, 0);
        const detector = new FaceDetector({ fastMode: true, maxDetectedFaces: 20 });
        const faces = await detector.detect(canvas);
        if (!cancelled && faces.length) {
          blurFaceRegions(canvas, faces);
          setDisplaySrc(canvas.toDataURL("image/webp", 0.9));
        }
      } catch {
        // The pre-blurred static asset remains the safe fallback.
      }
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return <img {...props} className={className} src={displaySrc} alt={alt} />;
}
