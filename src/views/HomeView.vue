<template>
  <main class="home-view" :class="{ 'bg-surface-50': appInitialized, initialized: appInitialized }">
    <header>
      <div aria-hidden="true" class="hero-text text-surface-300">Heyo!</div>
      <div class="content" tabindex="0">
        <h1 class="h4-text">Welcome to this demo of various components, techniques, and Vue3 usage!</h1>
      </div>
    </header>
  </main>
</template>

<script lang="ts" setup>
  import { appInitializedSymbol } from '@/core/injection-keys.ts';
  import { inject } from 'vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////

  const appInitialized = inject(appInitializedSymbol);
</script>

<style lang="scss" scoped>
// NOTE: <main> basic styling is located in src/styles/main.scss
main {
  container: view / inline-size;

  header {
    isolation: isolate;

    .content {
      display: flex;
      justify-content: center;
      padding-top: 6rem;

      h1 {
        max-width: 800px;
      }
    }

    .hero-text {
      height: 4rem;
      line-height: 12.5rem;
      margin: 0;
      margin-inline-start: -1.25rem;
      overflow: visible;
      position: absolute;
      z-index: -1;
    }
  }
}

@container view (width < 550px) {
  header {
    div.hero-text {
      display: block;
      font-size: 7rem;
      height: auto;
      line-height: 8rem;
      margin-inline-start: -0.5rem;
      overflow: auto;
      position: relative;
      text-align: center;
    }

    div.content {
      padding-top: 2rem;
      text-align: center;

      h1.h4-text {
        font-size: 2rem;
        line-height: 2.5rem;
        margin-top: -0.75rem;
      }
    }
  }
}
</style>
