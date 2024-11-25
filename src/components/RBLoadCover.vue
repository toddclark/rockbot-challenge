<template>
  <div class="load-cover" :class="{ hero: appReady }">
    <RBLoader v-if="appReady" :large="true" />
  </div>
</template>

<script setup lang="ts">
  import { inject, onMounted } from 'vue';

  import { appInitializedSymbol, appReadySymbol } from '@/core/injection-keys.ts';

  import RBLoader from '@/components/RBLoader.vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////

  const appInitialized = inject(appInitializedSymbol);
  const appReady = inject(appReadySymbol);

  onMounted(() => {
    setTimeout(() => {
      if (appInitialized) {
        (appInitialized as any).value = true;
      }
    }, 4500);
  });
</script>

<style lang="scss" scoped>
.load-cover {
  align-items: center;
  background-color: var(--surface-0);
  bottom: 0;
  display: flex;
  isolation: isolate;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000;

  &.hero {
    animation: cover-hero 0.75s ease 3s 1 forwards;
  }

  @keyframes cover-hero {
    100% {
      opacity: 0;
      transform: scale(50);
    }
  }

  .loader {
    box-shadow: var(--elevation-0);
    opacity: 0;
    animation: loader-reveal 1s ease-out 1s 1 forwards;

    @keyframes loader-reveal {
      100% {
        box-shadow: var(--elevation-3);
        opacity: 1;
      }
    }
  }
}
</style>
