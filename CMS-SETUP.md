# CMS setup

The petition pages (`/cleanupvictoria` and `/notowers`) render their content from JSON files in `content/`. Edit those files via the CMS at **`/admin`** on the deployed site.

The CMS is **[Decap CMS](https://decapcms.org)** with a GitHub backend. Login is by GitHub account (the GitHub user you log in as must have push access to this repository). Edits are committed to the `campaigns` branch and trigger a Vercel redeploy.

## One-time setup (≈ 3 minutes)

You only need to do this once. After this is done, just visit `/admin` and click *Login with GitHub*.

### 1 — Create a GitHub OAuth app

1. Go to https://github.com/settings/applications/new
2. Fill in:
   - **Application name**: `Moira Deeming MP — CMS`
   - **Homepage URL**: `https://moira-deeming-mp-git-campaigns-tellerconsulting.vercel.app`
   - **Authorisation callback URL**: `https://moira-deeming-mp-git-campaigns-tellerconsulting.vercel.app/api/auth`
3. Click **Register application**
4. On the next page, copy the **Client ID**
5. Click **Generate a new client secret** and copy that too

> If you wire the CMS to a custom domain later, update both the Homepage URL and the Authorisation callback URL on the OAuth app to match (and update `base_url` in `admin/config.yml`).

### 2 — Add the secrets to Vercel

1. Open the project in Vercel: https://vercel.com/tellerconsulting/moira-deeming-mp
2. Go to **Settings → Environment Variables**
3. Add:
   - `GITHUB_CLIENT_ID` — the Client ID from step 1
   - `GITHUB_CLIENT_SECRET` — the Client Secret from step 1
4. Make sure both are enabled for **Production**, **Preview** and **Development**
5. **Redeploy** the latest deployment so the env vars take effect (Deployments → … menu → Redeploy)

### 3 — Done — log in

1. Visit `https://moira-deeming-mp-git-campaigns-tellerconsulting.vercel.app/admin`
2. Click **Login with GitHub** in the popup
3. Authorise the OAuth app for `horatio8`
4. You're in — pick a page and edit

## What you can edit

The CMS shows two pages — **Clean Up Victoria** and **Stop VNI West**. For each you can edit:

- Page title (browser tab) and eyebrow tag
- Headline (with a "highlight" word that renders in gold)
- Lede paragraph
- Photo placeholder caption
- Stats (3 cards above the live signature counter — number, label, source)
- Argument: section label, h2, lede, body, pull-quote + citation, plan-list items, why-it-matters body
- Cited sources (text + URL)
- Petition card: heading, lede, submit label, success messages, share post text, **form receiver URL** (the Campaign Nucleus endpoint), initial counter value, postcode placeholder
- Authorised-by line (legal footer)

Saves write a commit to the `campaigns` branch. Vercel redeploys in ~30 seconds and the live page picks up the change.

## Adding a third petition

1. Create `content/<slug>.json` (copy one of the existing files as a template)
2. Create `<slug>/index.html` (copy `cleanupvictoria/index.html`, change the `window.PETITION_SLUG` value to `'<slug>'`)
3. Push — Decap CMS picks the new content file up automatically because the collection is folder-based

## If a login attempt fails

- Check `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` env vars are set in Vercel and the deployment was rebuilt after they were added
- Confirm the Authorisation callback URL on the GitHub OAuth app matches `https://<your-vercel-domain>/api/auth` exactly
- The popup may be blocked — allow popups for the Vercel domain
- Check `/api/auth` directly in a browser tab — it should redirect you to GitHub. If it returns a 500, the env vars aren't loaded.

## Switching auth method later

If you'd rather have email-only login (e.g. magic link to `james@teller.consulting`) instead of GitHub, the lowest-friction option is to migrate to **TinaCMS** with Tina Cloud (free tier, email login built in). That's a different stack to wire up — happy to swap when you're ready.
