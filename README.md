# Air Race Events Overview

Small Nuxt 3 coding-assignment solution for browsing air race events on a synchronized map and list. The implementation stays intentionally lean: typed event data, focused composables, a direct Leaflet integration, Tailwind styling, and a tiny server route that can later be replaced by a CMS-backed API.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` starts the Nuxt dev server
- `npm run build` creates the production build
- `npm run preview` previews the production build locally

## Features

- Browse race events on a Leaflet map and in a structured list
- Filter events by category A or B
- Keep list and map interactions in sync for hover and selection
- Show marker popups with event title and description
- Handle loading, empty, and error states with lightweight UI feedback

## Technical Decisions

### Why Nuxt 3

Nuxt 3 gives a clean project structure, built-in server routes, strong Vue 3 + TypeScript ergonomics, and enough conventions to keep a time-boxed assignment focused on product behavior instead of tooling setup.

### Why Leaflet

Leaflet is lightweight, well-known, and perfectly adequate for this interaction model. It keeps the map implementation explicit and understandable without introducing a heavier map platform or an additional Vue wrapper.

### Why a minimal server route

The app reads events from `server/api/events.get.ts`. For the assignment this behaves like static fixture data, but it already creates the right boundary between data loading and UI rendering, which makes later CMS integration straightforward.

### Why composables over Pinia

The shared state is small and page-scoped: events, loading/error, category filter, hover, and selection. Composables keep that logic readable and easy to review without introducing a global store abstraction the assignment does not need.

## Architecture Summary

- `pages/index.vue`: page composition, layout, and state orchestration
- `components/events/*`: filter controls and list rendering
- `components/map/EventsMap.vue`: Leaflet setup, marker rendering, popup behavior, and map/list synchronization
- `composables/useEvents.ts`: data loading plus loading/error state
- `composables/useEventFiltering.ts`: category filtering and derived results
- `composables/useEventSelection.ts`: hovered/selected event state with automatic synchronization to the visible event set
- `types/event.ts`: extendable event model for future CMS-backed content

## Trade-offs

- The map is implemented directly with Leaflet instead of a Vue map wrapper to keep dependencies low.
- Hover behavior is enabled only on devices that report hover support, which keeps mobile interaction simpler.
- No event is preselected on initial load, which keeps first-render list interactions consistent. If filtering removes the current selection, the app falls back to the first visible item to avoid stale state.
- Marker popups render concise HTML content directly from known event data to keep the integration simple in a small assignment.

## What I Would Improve With More Time

- Add lightweight component and composable tests
- Add optional location search with geocoding and map recentering
- Improve map accessibility further with a non-visual summary and keyboard shortcuts for stepping through events
- Move event fixtures into a dedicated content/data layer if the dataset grows
