<script setup lang="ts">
import type { EventId, RaceEvent } from "~/types/event";

const props = defineProps<{
  event: RaceEvent;
  isHovered: boolean;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  hover: [eventId: EventId | null];
  select: [eventId: EventId];
}>();

const supportsHover = ref(false);
const itemClasses = computed(() => {
  if (props.isSelected) {
    return "border-sky-700 ring-2 ring-sky-300";
  }

  if (props.isHovered) {
    return "border-sky-500";
  }

  return "border-white/70";
});

const categoryClasses = computed(() =>
  props.event.category === "A"
    ? "bg-sand-100 text-sand-600"
    : "bg-sky-100 text-sky-700",
);

onMounted(() => {
  supportsHover.value = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
});

function handleMouseEnter() {
  if (!supportsHover.value) {
    return;
  }

  emit("hover", props.event.id);
}

function handleMouseLeave() {
  if (!supportsHover.value) {
    return;
  }

  emit("hover", null);
}
</script>

<template>
  <button
    type="button"
    class="w-full rounded-3xl border bg-white/90 p-5 text-left shadow-card transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfbf7]"
    :class="itemClasses"
    :aria-pressed="isSelected"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="emit('select', event.id)"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-ink-400">
          {{ event.country }}
        </p>
        <h3 class="font-display text-xl font-bold text-ink-900">
          {{ event.title }}
        </h3>
      </div>

      <span
        class="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]"
        :class="categoryClasses"
      >
        {{ event.category }}
      </span>
    </div>

    <p class="mt-3 text-sm leading-6 text-ink-700">
      {{ event.description }}
    </p>

    <p class="mt-4 text-sm text-ink-400">
      {{ event.address }}
    </p>
  </button>
</template>
