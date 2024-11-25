<template>
  <RBLoadCover v-if="!appInitialized"></RBLoadCover>
  <GlobalNavigation />
  <RouterView />
</template>

<script setup lang="ts">
// framework libs
import { nextTick, onMounted, provide, readonly, ref } from 'vue';
import { RouterView } from 'vue-router';

// core
import { appInitializedSymbol, appReadySymbol } from '@/core/injection-keys.ts';

// components
import RBLoadCover from '@/components/RBLoadCover.vue';
import GlobalNavigation from '@/components/GlobalNavigation.vue';

////////////////////////////////////////////////////////////////////////////////
//// Component Logic ////
////////////////////////////////////////////////////////////////////////////////

const appReady = ref(false);
const appInitialized = ref(false);

onMounted(() => {
  nextTick(() => {
    appReady.value = true;
  });
});

// provide an injectable boolean to cover the overall app...
// primarily for clearing the full-app loading overlay
provide(appInitializedSymbol, appInitialized as any);
provide(appReadySymbol, readonly(appReady) as any);
</script>

<!-- #app styles in src/styles/main.scss -->
