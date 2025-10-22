# supercarbookings-site

Complete working site + Netlify Functions for real uploads.

## Preview locally

Run a local static preview server against the repository root:

```bash
npm install
npm run preview
```

The command starts a lightweight Node HTTP server (defaults to `http://localhost:4173`) that serves `index.html` and any static assets in the project directory. You can set a different port by exporting the `PORT` environment variable before running the script.

## Deploy

### GitHub Pages

This repository now includes an automated GitHub Actions workflow that publishes the static site to GitHub Pages whenever `main` is updated. To enable it:

1. Push the repository to GitHub.
2. In the repository settings under **Pages**, set the source to "GitHub Actions".
3. Merge or push changes to `main`—the workflow (`Deploy static site to GitHub Pages`) will build the static assets and deploy them automatically.

### Netlify

- Push this repo to GitHub/GitLab/Bitbucket
- Import to Netlify
- Add environment variables (see `.env.example`)

## Functions

- `netlify/functions/s3-presign.js` → S3 pre‑signed uploads
- `netlify/functions/cloudinary-sign.js` → Cloudinary signed uploads

See `README-functions.md` for full wiring details.
