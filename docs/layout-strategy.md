# Layout Management Strategy (Multi-restaurant / Multi-layout)

## Overview

This document defines how we manage **multiple layout versions** of the e‑menu (for different restaurants) without breaking existing functionality or offline/PWA behavior.

Key points:

- All restaurants share the same **logic, data fetching, and PWA/offline layer**.
- Each restaurant gets its own **layout build**, identified by a `layoutId` (e.g. `layout1`, `layout2`, `layout3`).
- The currently deployed layout is **`layout1`**, and is treated as the **default layout**.
- Layout differences live in **layout-specific folders**, while shared UI and logic stay in shared locations.

---

## Terminology

- **Layout**: A specific visual and structural arrangement of the e‑menu UI for a restaurant (e.g. number of hero videos, order of sections, banners, etc.).
- **Layout ID** (`layoutId`): A string identifier such as `layout1`, `layout2`, `layout3`.
- **Default layout**: The current production experience, identified as `layout1`.

---

## Folder structure

We distinguish between **layout-specific** code and **shared** code.

### Layout-specific code

- All layout-specific React components live under:

  - `src/layouts/<layoutId>/`

  Examples:

  - `src/layouts/layout1/` – default / current layout.
  - `src/layouts/layout2/` – second layout.
  - `src/layouts/layout3/` – third layout, etc.

- Inside each layout folder, you can organize components as needed, for example:

  - `src/layouts/layout1/HomeLayout.tsx`
  - `src/layouts/layout1/sections/HeroVideosSection.tsx`
  - `src/layouts/layout1/sections/ProductsSection.tsx`

The key idea is: **everything under `src/layouts/<layoutId>/` belongs only to that layout.**

### Shared code

Shared, layout-agnostic code lives outside `src/layouts/`, for example:

- `src/components/**` – reusable atoms, molecules, organisms.
- `src/hooks/**` – shared hooks (e.g. `useAutoPlayVideo`).
- `src/model/**` – shared TypeScript models and types.
- `src/api/**` – API/GraphQL clients and configuration.
- `src/helpers/**` – utility functions.
- `src/fonts/**`, `src/index.css`, etc.

**Rule:** Shared code must not depend on a specific layout ID. If you need different behavior per layout, expose **generic props** or configuration and decide the values in `src/layouts/<layoutId>/`.

---

## Environment & build configuration

Each build targets exactly **one** layout. This is controlled by an environment variable:

- `REACT_APP_LAYOUT_ID` – the layout ID used at build time.

### Defaults

- If `REACT_APP_LAYOUT_ID` is not explicitly set, application code should assume:

  - `layoutId = 'layout1'`

  (i.e. `layout1` is the default layout).

### Build scripts pattern

We follow this naming pattern in `package.json`:

- Base scripts:

  - `"start": "react-scripts start"`
  - `"build": "react-scripts build"`

- Layout-specific builds (examples):

  - `"build:layout1": "REACT_APP_LAYOUT_ID=layout1 react-scripts build"`
  - `"build:layout2": "REACT_APP_LAYOUT_ID=layout2 react-scripts build"`

Usage examples:

- Build the default layout (layout1):

  - `npm run build:layout1`

- Build another layout (e.g. layout2) once it exists:

  - `npm run build:layout2`

On Windows, the `REACT_APP_LAYOUT_ID=...` syntax may require using `cross-env`; if needed, we can adjust scripts accordingly.

---

## How the layout ID is used (high level)

At runtime (within the built app):

- Code reads `process.env.REACT_APP_LAYOUT_ID` (with a fallback to `'layout1'`).
- This `layoutId` is used to:

  - Decide which **layout entry component** to render (e.g. `Layout1Home`, `Layout2Home`).
  - Optionally pass the `layoutId` into a context or configuration object for further decisions within layout-specific code.

Shared logic (data fetching, PWA, etc.) does **not** depend on `layoutId`. Only the layout entry points and their children under `src/layouts/<layoutId>/` do.

---

## Creating a new layout

When we need a new layout (e.g. for a new restaurant), we follow these steps.

### 1. Choose a layout ID

- Use the next available numeric layout ID:

  - `layout2`, `layout3`, `layout4`, etc.

Example: For the second restaurant, choose `layout2`.

### 2. Create a layout folder

- Create:

  - `src/layouts/layout2/`

If we already have `src/layouts/layout1/` representing the current layout, we typically:

- Copy the relevant files from `src/layouts/layout1/` into `src/layouts/layout2/`.
- Rename components where that aids clarity (e.g. `Layout1Home` → `Layout2Home`), or keep generic names if they are scoped by folder.

### 3. Wire the new layout into the selector

- In the part of the app that chooses which layout root to render (e.g. `HomePageView` or a `LayoutRouter`), add a case for `layout2`.
- Example pattern (pseudocode):

  - If `layoutId === 'layout1'`, render `Layout1Home` from `src/layouts/layout1/`.
  - If `layoutId === 'layout2'`, render `Layout2Home` from `src/layouts/layout2/`.
  - Default to `layout1` if `layoutId` is missing or unknown.

### 4. Implement layout‑specific changes

- Inside `src/layouts/layout2/`, you are free to:

  - Change the number of hero videos (e.g. 1 vs 3).
  - Reorder sections.
  - Add/remove banners or cards.
  - Change layout‑specific wrappers or arrangements.

- Do **not** introduce layout‑specific branching in shared components; instead:

  - If a shared component needs to behave differently, expose a **generic prop** (e.g. `maxVideos`, `variant`, `compact`).
  - Set that prop from the layout-specific component in `src/layouts/layout2/`.

### 5. Build and deploy

- For development/builds of the new layout:

  - Set `REACT_APP_LAYOUT_ID=layout2` in the environment, or use:
    - `npm run build:layout2` (once defined).

---

## Modifying an existing layout

### Changing the default layout (layout1)

- If you are updating the current production UX, you are working on **`layout1`**.
- Make layout‑specific changes under:

  - `src/layouts/layout1/`

- Keep changes confined to that folder unless:

  - You are deliberately introducing or refactoring shared components in `src/components/**`, `src/hooks/**`, etc.

### Changing another layout (e.g. layout2)

- Make layout‑specific changes under:

  - `src/layouts/layout2/`

- Avoid editing `src/layouts/layout1/` in the same task, unless the intention is to synchronize behavior or refactor shared logic.

---

## Shared components and variants

Sometimes a shared component needs small stylistic differences between layouts (e.g. different card density).

### Guidelines

- Prefer **prop-based variants** over layout-specific logic:

  - Good:
    - `ProductCard` has a prop `variant="dense"` or `variant="default"`.
    - `layout2` passes `variant="dense"`; `layout1` passes `variant="default"`.
  - Avoid:
    - `if (layoutId === 'layout2') { ... }` inside `ProductCard`.

- Only create **truly layout-specific components** under `src/layouts/<layoutId>/`. For example:

  - `HeroVideosSection` in `layout1` vs `HeroVideosSection` in `layout2` that use the same shared `VideoPlayer` component differently.

---

## PWA / offline behavior

- The PWA/offline setup is **shared across all layouts** and must remain stable:

  - `src/service-worker.ts`
  - `src/serviceWorkerRegistration.ts`
  - Workbox configuration and caching strategies

- When working on layouts:

  - Do not change offline strategies unless explicitly required.
  - Assume that all layouts must work fully offline under the same service worker behavior.

---

## Summary

- **One codebase**, **multiple layout builds**.
- Layouts are identified by `layoutId` (`layout1`, `layout2`, …) and selected via `REACT_APP_LAYOUT_ID` at build time.
- Layout-specific code lives in `src/layouts/<layoutId>/`.
- Shared logic/components live outside `src/layouts/` and remain layout‑agnostic.
- `layout1` is the default/current layout; new layouts are created by copying and adapting it, while keeping strong separation of concerns.


