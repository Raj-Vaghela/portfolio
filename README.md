# Raj Vaghela portfolio

Next.js portfolio for Raj Vaghela, AI Systems Engineer at Stack8s. Includes commercial experience, personal and academic projects, an updated CV, and a profile guide.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint`, `npx tsc --noEmit` and `npm run build` before publishing.

## Content

- `lib/profile.ts`: current professional facts and selected projects. Used by the project views and profile guide.
- `components/portfolio-content.tsx`: introduction, experience and education.
- `public/cv.pdf`: public CV. This copy omits the phone number.
- `public/skills.json`: visual skill marquee.
- `app/layout.tsx`: page metadata, canonical URL and Person structured data.

Set `NEXT_PUBLIC_IMAGE_URL` to the existing profile image URL. The legacy `NEXT_PUBLIC_GOOGLE_DRIVE_IMAGE_URL` is also supported. If no image is configured, initials are shown. CV links use the bundled PDF; the legacy external resume URL no longer overrides it.

## Publishing

Keep the current production domain and image configuration when deploying. Git branches provide a reviewable change; merging to the configured production branch may trigger Vercel deployment. Check desktop and mobile views, the profile guide, project dialog and CV download before merging.

Portfolio descriptions distinguish commercial work from prototypes. Add performance or impact metrics only with a reproducible baseline and measurement period.
