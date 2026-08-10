export function getContactApiUrl() {
  const isDev =
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === 'localhost';

  if (isDev) {
    return 'http://localhost:3000/api/contact';
  }

  return '/api/contact';
}
