<script setup lang="ts">
import EventListItem from "~/components/events/EventListItem.vue";
import type { EventId, RaceEvent } from "~/types/event";

defineProps<{
  events: RaceEvent[];
  hoveredEventId: EventId | null;
  selectedEventId: EventId | null;
}>();

const emit = defineEmits<{
  hover: [eventId: EventId | null];
  select: [eventId: EventId];
}>();
</script>

<template>
  <ul class="space-y-4" aria-label="Race events">
    <li v-for="event in events" :key="event.id">
      <EventListItem
        :event="event"
        :is-hovered="hoveredEventId === event.id"
        :is-selected="selectedEventId === event.id"
        @hover="emit('hover', $event)"
        @select="emit('select', $event)"
      />
    </li>
  </ul>
</template>
