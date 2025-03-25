export default async function handler(req, res) {
  const targetUrl = 'https://residential.ultraloxrail.com' + req.url;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent']
      }
    });

    let body = await response.text();

    // Remove security headers
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache');
    res.statusCode = response.status;
    res.end(body);
  } catch (error) {
    res.statusCode = 500;
    res.end('Error: ' + error.message);
  }
}
