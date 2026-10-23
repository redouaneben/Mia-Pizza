# Plan d’implémentation — Mia Pizza

## Phase 0 — As-built ✅

- [x] Landing one-page, menu tomate/crème, statut, FAB, Maps, DA glass  
- [x] Données pizzas dans le repo

## Phase 1 — Production ✅ (cible)

- [x] Extraire menu → `data/menu.ts`  
- [x] Extraire horaires → `data/hours.ts`  
- [x] SEO : title, description, `lang="fr"`, Open Graph — `app/layout.tsx`  
- [x] Build vert (retrait composant calendar inutilisé)  
- [ ] Smoke test mobile (tel, menu, Maps) — manuel  
- [ ] Définir `NEXT_PUBLIC_SITE_URL` en prod (Vercel) — voir `config/site.ts`

## Phase 2 — Backlog produit

- [x] Congés / travaux — `data/special-hours.ts` (`SPECIAL_PERIODS`)  
- [ ] Marquee, avis Google  
- [x] JSON-LD Restaurant — `lib/restaurant-json-ld.ts` + `config/site.ts`  
- [x] `config/site.ts`, `sitemap.ts`, `robots.ts`, OG/icon (`app/opengraph-image.tsx`, `app/icon.tsx`)  
- [ ] Analytics — events `click_tel`, `view_menu`

## Phase 3 — v2 (non engagé)

- [ ] Drawer pizza  
- [ ] Supabase + back-office  
- [ ] Onglet boissons  

## Déploiement Vercel

1. Repo Git connecté  
2. Framework Next.js (auto)  
3. Variable `NEXT_PUBLIC_SITE_URL` = URL canonique du domaine  
4. Image sociale : `app/opengraph-image.tsx` (ou `public/og.jpg` optionnel)
