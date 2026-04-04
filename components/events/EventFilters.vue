<script setup lang="ts">
import type { EventCategory } from "~/types/event";

const props = defineProps<{
  modelValue: EventCategory | "all";
}>();

const emit = defineEmits<{
  "update:modelValue": [value: EventCategory | "all"];
}>();

const options: Array<{ label: string; value: EventCategory | "all" }> = [
  { label: "All events", value: "all" },
  { label: "Category A", value: "A" },
  { label: "Category B", value: "B" },
];
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="rounded-full border px-4 py-2 text-sm font-semibold transition"
      :class="
        props.modelValue === option.value
          ? 'border-sky-700 bg-sky-700 text-white'
          : 'border-ink-200 bg-white/90 text-ink-700 hover:border-sky-500 hover:text-sky-700'
      "
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
