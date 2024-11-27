<template>
  <main class="library-view" :class="{ 'bg-surface-50': appInitialized, initialized: appInitialized }">
    <h1 class="hero-text text-surface-300">Books!</h1>
    <div class="content">
      <p class="h5-text description">
        <strong>BEHOLD!</strong> Search for your favorite titles! There are many books to find!
      </p>
      <LibraryListing />
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { appInitializedSymbol } from '@/core/injection-keys.ts';
  import { inject } from 'vue';

  import LibraryListing from '@/components/library/LibraryListing.vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////

  const appInitialized = inject(appInitializedSymbol);
</script>

<style lang="scss" scoped>
// NOTE: <main> basic styling is located in src/styles/main.scss
main {
  isolation: isolate;
  position: relative;

  container: view / inline-size;

  .content {
    display: flex;
    flex-direction: column;
    z-index: 2;

    .description {
      align-self: flex-end;
      margin-bottom: 2rem;
      max-width: min(26rem, 100%);
    }
  }

  .hero-text {
    line-height: 12.5rem;
    margin: 0;
    margin-inline-start: -1.25rem;
    position: absolute;
    z-index: -1;
  }
}

@container view (width < 550px) {
  h1.hero-text {
    font-size: 7rem;
    line-height: 14rem;
    margin-inline-start: -0.5rem;
  }

  p.h5-text.description {
    font-size: 1.5rem;
    line-height: 2.5rem;
    margin-top: -0.75rem;
  }
}
</style>
