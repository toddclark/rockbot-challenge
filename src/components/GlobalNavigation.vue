<template>
  <nav ref="nav" class="bg-primary global-navigation" :class="{ open }">
    <RBButton aria-label="Expand navigation menu" class="open-button" icon="material-symbols:chevron-right" :rotated="open" @click="toggleNavigation" />

    <ul>
      <li class="home" :class="{ open }" tabindex="0" @click="navigate('home')" @keydown.enter="navigate('home')">
        <Icon icon="material-symbols:home"/>
        <label>Home</label>
      </li>
      <li class="library" :class="{ open }" tabindex="0" @click="navigate('library')" @keydown.enter="navigate('library')">
        <Icon icon="material-symbols:book"/>
        <label>Library Search</label>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import router from '@/router';

  import { Icon } from '@iconify/vue';
  import RBButton from '@/components/RBButton.vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////
  const open = defineModel('open', { type: Boolean, default: false });
  defineExpose({ open });

  function navigate(name: string) {
    router.push({ name });
    open.value = false;
  }

  function toggleNavigation() {
    open.value = !open.value;
  }
</script>

<style lang="scss" scoped>
.global-navigation {
  align-items: flex-start;
  background-color: var(--primary);
  box-shadow: inset -4px 0 8px 0 var(--shadow);
  display: flex;
  flex-direction: column;
  height: 100%;
  isolation: isolate;
  overflow: hidden;
  position: relative;
  transition: width 0.5s ease-in-out;
  width: 4rem;

  &.open {
    width: 20rem;
  }

  .open-button {
    align-self: flex-end;
    margin: 1rem;
  }

  ul {
    min-width: 100%;

    li {
      align-items: center;
      color: var(--surface-0);
      cursor: pointer;
      display: flex;
      gap: 1.25rem;
      padding: 1rem;
      transition: background-color 0.5s ease, box-shadow 0.5s ease;

      &:focus-visible {
        background-color: var(--primary-300);
        outline: 2px solid var(--primary-300);
        outline-offset: 2px;
      }

      &:hover {
        background-color: var(--primary-300);
        box-shadow: var(--elevation-2);
      }

      .iconify {
        font-size: 1.75rem;
      }

      label {
        cursor: pointer;
        flex: 1;
        overflow: hidden;
        margin-top: 0.125rem;
        white-space: nowrap;
      }
    }
  }
}
</style>
