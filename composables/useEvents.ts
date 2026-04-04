import type { RaceEvent } from "~/types/event";

function isRaceEvent(event: unknown): event is RaceEvent {
  if (!event || typeof event !== "object") {
    return false;
  }

  const candidate = event as Partial<RaceEvent>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.address === "string" &&
    typeof candidate.country === "string" &&
    (candidate.category === "A" || candidate.category === "B") &&
    typeof candidate.coordinates?.lat === "number" &&
    typeof candidate.coordinates?.lng === "number"
  );
}

export function useEvents() {
  const {
    data: events,
    status,
    error,
    refresh,
  } = useFetch<RaceEvent[]>("/api/events", {
    key: "race-events",
    default: () => [],
    transform: (value) => (Array.isArray(value) ? value.filter(isRaceEvent) : []),
  });

  const isLoading = computed(() => status.value === "pending");

  return {
    events,
    isLoading,
    error,
    refresh,
  };
}
