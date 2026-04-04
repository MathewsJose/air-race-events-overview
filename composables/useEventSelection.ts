import type { EventId, RaceEvent } from "~/types/event";

export function useEventSelection(events: Ref<RaceEvent[]>) {
  const hoveredEventId = ref<EventId | null>(null);
  const selectedEventId = ref<EventId | null>(null);

  const selectedEvent = computed<RaceEvent | null>(() => {
    if (!selectedEventId.value) {
      return null;
    }

    return events.value.find((event) => event.id === selectedEventId.value) ?? null;
  });

  watch(
    events,
    (visibleEvents) => {
      const visibleEventIds = new Set(visibleEvents.map((event) => event.id));

      if (hoveredEventId.value && !visibleEventIds.has(hoveredEventId.value)) {
        hoveredEventId.value = null;
      }

      if (selectedEventId.value && !visibleEventIds.has(selectedEventId.value)) {
        selectedEventId.value = visibleEvents[0]?.id ?? null;
      }
    },
    { immediate: true },
  );

  function setHoveredEvent(eventId: EventId | null) {
    hoveredEventId.value = eventId;
  }

  function setSelectedEvent(eventId: EventId | null) {
    selectedEventId.value = eventId;
  }

  return {
    hoveredEventId,
    selectedEventId,
    selectedEvent,
    setHoveredEvent,
    setSelectedEvent,
  };
}
