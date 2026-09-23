export function buildShareLinks(pageUrl: string, message: string) {
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message} — ${pageUrl}`)}`,
  };
}
