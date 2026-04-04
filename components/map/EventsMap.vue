<script setup lang="ts">
import type {
  CircleMarker,
  CircleMarkerOptions,
  LatLngBoundsExpression,
  LatLngExpression,
  Map as LeafletMap,
  TileLayer,
} from "leaflet";
import type { EventId, RaceEvent } from "~/types/event";

const props = defineProps<{
  events: RaceEvent[];
  hoveredEventId: EventId | null;
  selectedEventId: EventId | null;
}>();

const emit = defineEmits<{
  hover: [eventId: EventId | null];
  select: [eventId: EventId];
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const map = shallowRef<LeafletMap | null>(null);
const tileLayer = shallowRef<TileLayer | null>(null);
const markerById = new Map<EventId, CircleMarker>();
const supportsHover = ref(false);
const defaultCenter: LatLngExpression = [30, 10];
const defaultZoom = 2;

let L: typeof import("leaflet") | null = null;

function getMarkerStyle(eventId: EventId): CircleMarkerOptions {
  const isSelected = props.selectedEventId === eventId;
  const isHovered = props.hoveredEventId === eventId;

  if (isSelected) {
    return {
      radius: 11,
      weight: 3,
      color: "#0b5f8b",
      fillColor: "#1993d2",
      fillOpacity: 0.95,
    };
  }

  if (isHovered) {
    return {
      radius: 10,
      weight: 3,
      color: "#b17e16",
      fillColor: "#e7b857",
      fillOpacity: 0.92,
    };
  }

  return {
    radius: 8,
    weight: 2,
    color: "#ffffff",
    fillColor: "#1993d2",
    fillOpacity: 0.82,
  };
}

function applyMarkerStyles() {
  markerById.forEach((marker, eventId) => {
    marker.setStyle(getMarkerStyle(eventId));
  });
}

function clearMarkers() {
  markerById.forEach((marker) => marker.remove());
  markerById.clear();
}

function centerMap(event: RaceEvent, zoom = 5) {
  map.value?.flyTo([event.coordinates.lat, event.coordinates.lng], zoom, {
    duration: 0.6,
  });
}

function getBounds(events: RaceEvent[]): LatLngBoundsExpression {
  return events.map((event) => [event.coordinates.lat, event.coordinates.lng] as [number, number]);
}

function fitMapToEvents(events: RaceEvent[]) {
  if (!L || !map.value || events.length === 0) {
    return;
  }

  map.value.fitBounds(L.latLngBounds(getBounds(events)).pad(0.3));
}

function renderMarkers() {
  if (!map.value || !L) {
    return;
  }

  clearMarkers();

  props.events.forEach((event) => {
    const marker = L.circleMarker([event.coordinates.lat, event.coordinates.lng], {
      ...getMarkerStyle(event.id),
    });

    marker.bindPopup(
      `
        <div class="p-4">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">${event.country}</p>
          <h3 class="mt-2 text-base font-bold text-slate-900">${event.title}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">${event.description}</p>
        </div>
      `,
      { closeButton: false, offset: [0, -8] },
    );

    marker.on("click", () => {
      emit("select", event.id);
      centerMap(event);
      marker.openPopup();
    });

    marker.on("mouseover", () => {
      if (!supportsHover.value) {
        return;
      }

      emit("hover", event.id);
    });

    marker.on("mouseout", () => {
      if (!supportsHover.value) {
        return;
      }

      emit("hover", null);
    });

    marker.addTo(map.value!);
    markerById.set(event.id, marker);
  });

  applyMarkerStyles();
}

async function initializeMap() {
  if (!mapContainer.value || map.value) {
    return;
  }

  L = await import("leaflet");
  supportsHover.value = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  map.value = L.map(mapContainer.value, {
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView(defaultCenter, defaultZoom);
  map.value.attributionControl.setPrefix(false);

  tileLayer.value = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

  tileLayer.value.addTo(map.value);
  renderMarkers();
  fitMapToEvents(props.events);
}

watch(
  () => props.events.map((event) => event.id).join("|"),
  async (_, previousIds) => {
    await nextTick();
    renderMarkers();

    if (!map.value) {
      return;
    }

    if (props.events.length === 0) {
      map.value.setView(defaultCenter, defaultZoom);
      return;
    }

    if (previousIds !== undefined) {
      fitMapToEvents(props.events);
    }
  },
  { immediate: true },
);

watch(
  () => props.hoveredEventId,
  () => {
    applyMarkerStyles();
  },
);

watch(
  () => props.selectedEventId,
  (selectedEventId) => {
    applyMarkerStyles();

    if (!selectedEventId) {
      return;
    }

    const selectedEvent = props.events.find((event) => event.id === selectedEventId);

    if (selectedEvent) {
      centerMap(selectedEvent);
      markerById.get(selectedEvent.id)?.openPopup();
    }
  },
);

onMounted(() => {
  initializeMap();
});

onBeforeUnmount(() => {
  clearMarkers();
  tileLayer.value?.remove();
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <div class="overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-card">
    <div
      ref="mapContainer"
      class="h-[360px] w-full md:h-[480px]"
      aria-label="Map showing visible race events"
      role="application"
    />
  </div>
</template>
