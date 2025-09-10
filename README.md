# SupercarBookings P2P Starter

A minimal Next.js 14 + Prisma + Stripe Connect API to let third parties list cars and get paid.

## Quick start

1. Copy `.env.example` → `.env` and fill values.
2. `npm install`
3. `npx prisma migrate dev`
4. `npm run dev`

### Core endpoints
- `POST /api/auth/register` → { email, password } → token
- `POST /api/auth/login` → { email, password } → token
- `POST /api/hosts/onboard` (Bearer) → returns `onboardingUrl` for Stripe Express
- `POST /api/vehicles` (Bearer) → { make, model, year, regPlate, description }
- `POST /api/listings` (Bearer) → { vehicleId, basePrice, currency }
- `GET /api/search?make=...&priceMax=...`
- `POST /api/bookings/quote` → { listingId, startsAt, endsAt }
- `POST /api/bookings` (Bearer) → creates Stripe PaymentIntent with application_fee + transfer
- `POST /api/stripe/webhook` → configure endpoint in Stripe Dashboard

> Note: This starter does not include uploads, KYC, or insurance integrations yet—wire those in next.

## Auth
Send `Authorization: Bearer <token>` for protected routes.

## Stripe
- Create a **test** Connect account via `/api/hosts/onboard` and follow the returned link.
- Set your webhook endpoint to `/api/stripe/webhook` with events: `payment_intent.succeeded`, `charge.refunded`, `account.updated`.

## License
MIT
