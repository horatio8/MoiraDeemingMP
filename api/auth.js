/* GitHub OAuth handler for Decap CMS.
 * Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel env vars.
 * The GitHub OAuth app's "Authorisation callback URL" must be:
 *   https://<your-vercel-domain>/api/auth
 */

module.exports = async function handler(req, res) {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    res
      .status(500)
      .send(
        'GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set in Vercel env vars. See CMS-SETUP.md.'
      );
    return;
  }

  const { code, error } = req.query || {};

  if (error) {
    return sendCloseScript(res, 'error', String(error));
  }

  if (!code) {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const redirectUri = proto + '://' + host + '/api/auth';

    const url =
      'https://github.com/login/oauth/authorize?' +
      new URLSearchParams({
        client_id: CLIENT_ID,
        scope: 'repo,user:email',
        redirect_uri: redirectUri,
      }).toString();

    res.writeHead(302, { Location: url });
    res.end();
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'decap-cms-oauth',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });
    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      return sendCloseScript(
        res,
        'error',
        data.error_description || data.error || 'no token returned'
      );
    }

    return sendCloseScript(
      res,
      'success',
      JSON.stringify({ token: data.access_token, provider: 'github' })
    );
  } catch (err) {
    return sendCloseScript(res, 'error', (err && err.message) || 'token exchange failed');
  }
};

function sendCloseScript(res, status, content) {
  const message = 'authorization:github:' + status + ':' + content;
  const safe = JSON.stringify(message);
  const friendly =
    status === 'success'
      ? 'Signed in. You can close this window.'
      : 'Sign-in failed: ' + escapeHtml(content);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(
    '<!DOCTYPE html><html><head><title>Authorising</title></head>' +
      '<body style="font-family:sans-serif;padding:24px;color:#333">' +
      '<p>' +
      friendly +
      '</p>' +
      '<script>(function(){if(window.opener){window.opener.postMessage(' +
      safe +
      ",'*');}setTimeout(function(){try{window.close();}catch(e){}},800);})();</script>" +
      '</body></html>'
  );
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
