# Savory Base Storefront

Responsive e-commerce storefront built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Foods API setup

The storefront fetches menu data from its internal `GET /api/foods` route. Set
`SAVORY_BASE_API_URL` to the upstream foods endpoint that route should proxy. If
the endpoint requires a bearer token, set `SAVORY_BASE_API_TOKEN`.

```bash
SAVORY_BASE_API_URL="https://your-api.example.com/api/foods"
SAVORY_BASE_API_TOKEN="optional-token"
```

The app accepts array payloads, `{ "data": [...] }`, `{ "foods": [...] }`, or `{ "products": [...] }` shapes and maps common food product fields into clean storefront types.
