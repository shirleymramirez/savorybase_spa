# Savory Base Storefront

Responsive e-commerce storefront built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## CMS setup

Set `SAVORY_BASE_CMS_URL` to the Savory Base CMS products endpoint. If the endpoint requires a bearer token, set `SAVORY_BASE_CMS_TOKEN`.

```bash
SAVORY_BASE_CMS_URL="https://your-cms.example.com/api/foods"
SAVORY_BASE_CMS_TOKEN="optional-token"
```

The app accepts array payloads, `{ "data": [...] }`, `{ "foods": [...] }`, or `{ "products": [...] }` shapes and maps common food product fields into clean storefront types.
