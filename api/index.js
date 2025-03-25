export default async function handler(req, res) {
  const url = 'https://residential.ultraloxrail.com' + req.url;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'],
      },
    });

    const content = await response.text();

    // Remove headers that block iframe embedding
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
    res.setHeader('Cache-Control', 'no-cache');

    res.status(response.status).send(content);
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
}

