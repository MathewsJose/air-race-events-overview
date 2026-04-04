import type { EventCategory, RaceEvent } from "~/types/event";

export function useEventFiltering(events: Ref<RaceEvent[]>) {
  const selectedCategory = ref<EventCategory | "all">("all");

  const filteredEvents = computed(() => {
    if (selectedCategory.value === "all") {
      return events.value;
    }

    return events.value.filter((event) => event.category === selectedCategory.value);
  });

  const hasResults = computed(() => filteredEvents.value.length > 0);

  return {
    selectedCategory,
    filteredEvents,
    hasResults,
  };
}
