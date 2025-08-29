# Shopify Promo Banner App

A minimal Shopify Theme App Extension that injects a top-of-page promo banner saying "🎉 Free Shipping on All Orders! 🎉". Backend endpoints are ready to deploy on Vercel and can optionally drive the banner text dynamically.

## What you get
- A Theme App Extension (app embed) you can toggle on in any Online Store 2.0 theme.
- A tiny Node serverless API (`/api/banner`) meant for Vercel.

## Prerequisites
- Shopify Partner account (free): https://partners.shopify.com
- A Development store (create from the Partner dashboard)
- Node.js 18+
- Shopify CLI: `npm i -g @shopify/cli @shopify/cli-hydrogen` (the `@shopify/cli` package is the key one)
- Git (recommended)
- Vercel account (for backend deploy): https://vercel.com

## 1) Deploy the backend on Vercel
You can deploy this folder directly to Vercel. The API routes live under `api/` and are already wired via `vercel.json`.

Quick path (Dashboard):
1. Push this repo to GitHub.
2. Import the repo in Vercel, keep defaults.
3. After deploy, note the domain (e.g. `https://your-app.vercel.app`).
4. Test: `GET https://your-app.vercel.app/api/health` should return JSON.
5. The banner text endpoint: `GET https://your-app.vercel.app/api/banner` returns `{ text: "🎉 Free Shipping on All Orders! 🎉" }`.

Optional local test with Vercel CLI:
- Install: `npm i -g vercel`
- Run: `vercel dev`

## 2) Create a Shopify app shell (CLI)
We recommend initializing an app project (Node template) so your theme extension can be registered and installed:

1. In an empty folder (outside this one), run:
   - `npm create @shopify/app@latest`
   - Choose Node.
2. When it finishes, open that app folder. Create a new folder named `extensions` if it's not there.
3. Copy the `extensions/promo-banner` folder from this repo into the `extensions/` folder of your Shopify app project.

Your app project will now contain the theme app extension.

## 3) Register and push the extension
From your app project's root (the one created by Shopify CLI):
- `shopify app dev`
  - This will guide you to create the app in your Partner org and connect to a dev store.
- Open another terminal in `extensions/promo-banner` and run:
  - `shopify extension register` (first time only)
  - `shopify extension push`

After pushing, go to your dev store's Theme Editor and enable the app embed:
- Online Store > Themes > Customize
- App embeds (left panel) > Toggle on "Promo banner"
- Save

You should now see the banner at the very top of every page.

## 4) Optional: drive text from your backend
In the Theme Editor, open the app embed settings and paste your deployed Vercel URL to `/api/banner` into the "API URL" field, e.g.:
- `https://your-app.vercel.app/api/banner`

The embed will fetch the text and display it. If not provided, it shows the default text.

## Notes
- This approach avoids modifying the merchant's theme code directly; it's a safe, toggleable app embed.
- For production, consider rate limiting or caching your API and adding CORS controls if you scope origins.

## Uninstall / Cleanup
- Disable the app embed in the Theme Editor or uninstall the app from the dev store.
- Remove the extension by deleting the folder and running `shopify extension push` again if needed.
