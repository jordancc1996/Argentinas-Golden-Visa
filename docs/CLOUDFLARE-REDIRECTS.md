# Cloudflare: 301 Redirect non-www to www

Configure in the Cloudflare dashboard. These settings send all `https://argentinasgoldenvisa.com` traffic to `https://www.argentinasgoldenvisa.com` with a 301 (permanent) redirect.

## Option A: Page Rule (classic)

1. In Cloudflare dashboard, go to **Rules** → **Page Rules** (or **Rules** → **Page Rules** under your domain).
2. Click **Create Page Rule**.
3. **URL pattern:**  
   `*argentinasgoldenvisa.com/*`  
   (Matches all paths on the bare domain.)
4. **Setting:** Add **Forwarding URL**.
   - **Status code:** 301 (Permanent Redirect).
   - **URL:** `https://www.argentinasgoldenvisa.com/$1`.
5. Save and deploy.

**Note:** With one Page Rule you typically match the host and path. To cover both root and all paths with a single rule, use:

- **URL:** `argentinasgoldenvisa.com/*`  
- **Forward to:** `https://www.argentinasgoldenvisa.com/$1`  
  (Root is `https://www.argentinasgoldenvisa.com/` when `$1` is empty.)

If your plan only allows a limited number of Page Rules, use one rule with a broad pattern (e.g. `*argentinasgoldenvisa.com*`) and forward to `https://www.argentinasgoldenvisa.com/` plus the path if your rule supports it. Exact syntax depends on your Cloudflare plan and rule type.

## Option B: Redirect Rules (new Rules engine)

1. Go to **Rules** → **Redirect Rules**.
2. **Create rule** → **Dynamic redirect** (or **Static** if you only need a single URL).
3. **When:**  
   - Field: **Hostname** → Operator: **equals** → Value: `argentinasgoldenvisa.com`.
4. **Then:**  
   - **Type:** Dynamic redirect.  
   - **Expression** (path + query preserved):  
     `concat("https://www.argentinasgoldenvisa.com", http.request.uri.path, if(len(http.request.uri.query) > 0, concat("?", http.request.uri.query), ""))`  
   - **Status code:** 301.
5. Save and deploy.

This sends every path (and query string) on `argentinasgoldenvisa.com` to the same path on `www.argentinasgoldenvisa.com` with a 301.

## Summary

| Platform   | Config / location              | Effect                                                |
|-----------|---------------------------------|--------------------------------------------------------|
| Netlify   | `netlify.toml` or `public/_redirects` | 301 non-www → www (root and all paths)               |
| Vercel    | `vercel.json`                   | 301 when host is `argentinasgoldenvisa.com` → www     |
| Cloudflare| Dashboard: Page Rule or Redirect Rule | 301 non-www → www (configure as above)        |
