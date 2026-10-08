export function resolvePhotoUrl(url) {
  if (!url) return '/photos/1.jpg';
  const str = String(url).trim();
  
  // If user typed simple number like 1, "1", "2", "10"
  if (/^\d+$/.test(str)) {
    return `/photos/${str}.jpg`;
  }
  
  // If user typed "1.jpg" or "photo.png" without leading slash
  if (/^[\w-]+\.(jpg|jpeg|png|webp)$/i.test(str)) {
    return `/photos/${str}`;
  }
  
  // Otherwise keep URL as is
  return str;
}
