<script setup lang="ts">
import EventFilters from "~/components/events/EventFilters.vue";
import EventList from "~/components/events/EventList.vue";
import EventsMap from "~/components/map/EventsMap.vue";

const { events, isLoading, error, refresh } = useEvents();
const { selectedCategory, filteredEvents, hasResults } = useEventFiltering(events);
const { hoveredEventId, selectedEventId, selectedEvent, setHoveredEvent, setSelectedEvent } =
  useEventSelection(filteredEvents);

const totalEventsLabel = computed(
  () => `${filteredEvents.value.length} event${filteredEvents.value.length === 1 ? "" : "s"}`,
);
const isEmptyDataset = computed(
  () => !isLoading.value && !error.value && events.value.length === 0,
);
</script>

<template>
  <main class="min-h-screen">
    <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div class="rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-card backdrop-blur-sm sm:p-8">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.28em] text-sky-700">
            Air Race Events
          </p>
          <h1 class="mt-4 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Explore race weekends across the global calendar
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg">
            A compact assignment implementation focused on a clean map-and-list workflow,
            simple filtering, and maintainable shared state.
          </p>
        </div>
      </div>

      <section class="mt-8 space-y-6">
        <div class="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-card backdrop-blur-sm sm:p-6">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="font-display text-2xl font-bold text-ink-900">Event overview</h2>
              <p class="mt-1 text-sm text-ink-400">
                {{ isLoading ? "Loading events..." : totalEventsLabel }}
              </p>
            </div>

            <EventFilters v-model="selectedCategory" />
          </div>

          <div
            v-if="error"
            class="rounded-3xl border border-rose-100 bg-rose-100/70 p-5 text-sm text-rose-500"
            role="alert"
          >
            <p class="font-semibold">We could not load race events.</p>
            <p class="mt-1">Please try again or retry the request.</p>
            <button
              type="button"
              class="mt-4 rounded-full bg-ink-900 px-4 py-2 font-semibold text-white transition hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-100"
              @click="refresh()"
            >
              Retry
            </button>
          </div>

          <div
            v-else-if="isLoading"
            class="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]"
            aria-live="polite"
            aria-busy="true"
          >
            <div class="h-[360px] animate-pulse rounded-[2rem] bg-ink-100 md:h-[480px]" />
            <div class="space-y-4">
              <div
                v-for="placeholder in 3"
                :key="placeholder"
                class="h-40 animate-pulse rounded-[2rem] bg-ink-100"
              />
            </div>
          </div>

          <div
            v-else-if="isEmptyDataset"
            class="rounded-3xl border border-dashed border-ink-200 bg-ink-50 p-8 text-center"
          >
            <h3 class="font-display text-2xl font-bold text-ink-900">No events available</h3>
            <p class="mt-2 text-sm text-ink-400">
              The data source returned an empty result set.
            </p>
          </div>

          <div
            v-else-if="!hasResults"
            class="rounded-3xl border border-dashed border-ink-200 bg-ink-50 p-8 text-center"
          >
            <h3 class="font-display text-2xl font-bold text-ink-900">No events in this category</h3>
            <p class="mt-2 text-sm text-ink-400">
              Try switching back to all events or choosing the other category.
            </p>
          </div>

          <div v-else class="grid gap-6 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
            <div class="space-y-4">
              <ClientOnly>
                <EventsMap
                  :events="filteredEvents"
                  :hovered-event-id="hoveredEventId"
                  :selected-event-id="selectedEventId"
                  @hover="setHoveredEvent"
                  @select="setSelectedEvent"
                />

                <template #fallback>
                  <div class="h-[360px] rounded-[2rem] bg-ink-100 md:h-[480px]" />
                </template>
              </ClientOnly>

              <p class="px-1 text-sm text-ink-400">
                Hover links the map and list on desktop. Select works on all devices.
              </p>
            </div>

            <section aria-labelledby="events-list-heading">
              <div class="mb-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <h3 id="events-list-heading" class="font-display text-xl font-bold text-ink-900">
                    Visible events
                  </h3>
                  <p class="mt-1 text-sm text-ink-400">
                    {{ selectedEvent ? `Selected: ${selectedEvent.title}` : "Select an event to focus the map." }}
                  </p>
                </div>
              </div>

              <EventList
                :events="filteredEvents"
                :hovered-event-id="hoveredEventId"
                :selected-event-id="selectedEventId"
                @hover="setHoveredEvent"
                @select="setSelectedEvent"
              />
            </section>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
