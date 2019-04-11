export function guid() {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < 32; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

export function ensureInView(el) {
  const bounding = el.getBoundingClientRect();
  if (bounding.bottom > window.innerHeight) {
    // scroll down
    window.scrollBy(0, bounding.bottom + 10);
  } else if (bounding.top < 0) {
    // scroll up
    window.scrollBy(0, bounding.top - 10);
  }
}
