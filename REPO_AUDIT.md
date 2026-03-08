# Repo Audit: `absulysuly` + `awatattor-alt`

## Scope and constraints

I attempted to execute the requested GitHub API calls directly:

- `curl -s https://api.github.com/users/absulysuly/repos?per_page=100`
- `curl -s https://api.github.com/users/awatattor-alt/repos?per_page=100`
- `curl -sv https://api.github.com/users/absulysuly/repos?per_page=100`

In this environment, outbound HTTPS requests to `api.github.com` are blocked by the configured proxy at CONNECT time (`HTTP/1.1 403 Forbidden`), so I could not enumerate remote repos or retrieve remote git trees.

## Best-effort fallback audit

Since remote enumeration was blocked, I audited the currently available local repository (`/workspace/Absuuuun`) against your product vision and scoring rubric.

### Candidate repository found locally

- **Repo name (local metadata):** `absuuuuuunIraq CompassAMAZINGFINAL`
- **Description (local metadata):** AI-powered event discovery + business directory for Iraqi governorates.
- **Tech stack:** React + TypeScript + Vite.

---

## Scoring (local candidate only)

### A) DIRECTORY FEATURES (0–10)

- Business/place data model present (`Business` type + `MOCK_BUSINESSES`) → **+3**
- Category filtering logic present (`activeFilters.category`, dropdown, filtering) → **+2**
- City/governorate filtering present (`activeFilters.governorate`, `GOVERNORATES`) → **+2**
- Dedicated listing detail/profile page not found (cards/list items only, no route/page-level detail view) → **+0**

**A subtotal: 7/10**

### B) UI COMPLETENESS (0–10)

- Home/landing view present (`HeroSlide`) → **+2**
- Browse/listing view present (`BusinessDirectorySlide`) → **+2**
- Search UI present (hero + directory search inputs) → **+2**
- Dedicated detail view not found → **+0**
- Navigation present (`Header` with nav links) → **+2**

**B subtotal: 8/10**

### C) CODE QUALITY SIGNALS (0–10)

- TypeScript used (`.ts`/`.tsx`, TS config, TS scripts) → **+2**
- `types.ts` present → **+1**
- Constants/mock data file present (`constants.ts`) → **+1**
- Custom hooks folder not found (`hooks/`) → **+0**
- Vite project setup present (`vite.config.ts`, `vite` scripts) → **+2**

**C subtotal: 6/10**

---

## Total score (local candidate)

**21 / 30**

## Provisional recommendation

Given only accessible evidence in this execution environment, **`Absuuuun` (local repo) is the strongest match** to your target “Iraq business/event directory” vision.

## What remains blocked for a complete cross-account winner decision

To complete your exact 3-step mission across *all* repos in both accounts, the environment must allow HTTPS API access to GitHub so these can run successfully:

- `GET /users/absulysuly/repos?per_page=100`
- `GET /users/awatattor-alt/repos?per_page=100`
- `GET /repos/{owner}/{repo}/git/trees/HEAD?recursive=1` (for each shortlisted repo)
