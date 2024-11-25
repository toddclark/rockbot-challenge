<template>
  <button
    :aria-disabled="disabled"
    :aria-hidden="ariaHidden"
    :aria-label="consolidatedAriaLabel"
    :aria-labelled-by="ariaLabelledBy"
    class="rb-button"
    :class="{
      disabled,
      'icon-and-text': icon && label,
      'icon-only': icon && !label
    }"
  >
    <Icon v-if="icon" :class="{ flippedH, flippedV, rotated }" :icon="icon"/>
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////

  const props = withDefaults(
    defineProps<{
      ariaHidden?: boolean,
      ariaLabel?: string,
      ariaLabelledBy?: string,
      disabled?: boolean,
      flippedH?: boolean,
      flippedV?: boolean,
      icon?: string,
      label?: string,
      rotated?: boolean,
    }>(),
    {
      ariaHidden: false,
      ariaLabel: undefined,
      ariaLabelledBy: undefined,
      disabled: false,
      flippedH: false,
      flippedV: false,
      icon: '',
      label: '',
      rotated: false,
    }
  );

  const consolidatedAriaLabel = computed(() => {
    return props?.ariaLabelledBy ? undefined : (props?.ariaLabel ?? props?.label);
  });
</script>

<style lang="scss" scoped>
.rb-button {
  align-items: center;
  background-color: var(--primary);
  border: none;
  border-radius: 0.25rem;
  color: var(--surface-0);
  display: flex;
  font-weight: 600;
  height: 2rem;
  justify-content: space-between;
  line-height: 1rem;
  padding: 0 0.5rem;
  text-transform: uppercase;
  transition: box-shadow 0.25s ease, background-color 0.25s ease;
  width: fit-content;

  &.disabled {
    background-color: var(--surface-300) !important;
    outline-color: var(--surface-300) !important;
  }

  &:not(.disabled):hover {
    background-color: var(--primary-300);
    box-shadow: var(--elevation-2);
    cursor: pointer;
  }

  &:focus-visible {
    background-color: var(--primary-300);
    outline: 2px solid var(--primary-300);
    outline-offset: 2px;
  }

  &.icon-only {
    justify-content: center;
    padding: 0;
    width: 2rem;
  }

  &.icon-and-text {
    justify-content: center;
    padding-inline-start: 0;
  }

  .iconify {
    font-size: 1.75rem;
    transition: transform 0.5s ease;

    &.flippedH {
      transform: scaleX(-1);
    }

    &.flippedV {
      transform: scaleY(-1);
    }

    &.rotated {
      transform: rotate(180deg);
    }
  }

  span {
    padding-top: 0.125rem;
  }
}
</style>
