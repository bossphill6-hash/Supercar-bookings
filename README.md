# supercarbookings-site

Complete working site + Netlify Functions for real uploads.

## Deploy

- Push this repo to GitHub/GitLab/Bitbucket
- Import to Netlify
- Add environment variables (see `.env.example`)

## Functions

- `netlify/functions/s3-presign.js` → S3 pre‑signed uploads
- `netlify/functions/cloudinary-sign.js` → Cloudinary signed uploads

See `README-functions.md` for full wiring details.
