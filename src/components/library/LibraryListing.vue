<template>
  <section class="library-listing">
    <div class="search-container">
      <div>
        <label for="library-search-input">Search</label>
        <input
          id="library-search-input"
          placeholder="Search Books..."
          type="search"
          :value="query"
          @input="event => query = (event?.target as HTMLInputElement)?.value ?? ''"
        />
        <RBLoader v-if="updating" />
      </div>
      <div>
        {{ offset + 1 }} - {{ Math.min(offset + limit, total) }} of {{ total }}
        <RBButton
          aria-label="Previous Page"
          :disabled="blockPrev || !books?.length || updating"
          icon="material-symbols:chevron-left"
          @click="prevPage"
        />
        <RBButton
          aria-label="Next Page"
          :disabled="blockNext || !books?.length || updating"
          icon="material-symbols:chevron-right"
          @click="nextPage"
        />
      </div>
    </div>
    <div v-if="!books?.length" class="empty-message">
      Results will appear here once three or more characters are entered into the search input.
    </div>
    <ul role="list">
      <LibraryListItem v-for="book in books" :data="book" :key="book.key" />
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useLibraryStore } from '@/stores/library.store.ts';

  import { search } from '@/core/domain/library';

  import LibraryListItem from './LibraryListItem.vue';
  import RBButton from '@/components/RBButton.vue';
  import RBLoader from '@/components/RBLoader.vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////

  const { books, limit, offset, total, updating } = storeToRefs(useLibraryStore());
  const query = ref('');
  let debounceTimeout: null | ReturnType<typeof setTimeout> = null;

  onMounted(() => {
    init();
  });

  watch(query, async (newQuery) => {
    // debounce
    clearTimeout(debounceTimeout as ReturnType<typeof setTimeout>);

    debounceTimeout = setTimeout(
      () => search(newQuery, offset.value),
      400
    );
  });

  const blockNext = computed(() => {
    return offset.value + limit.value > (total?.value ?? 0);
  });

  const blockPrev = computed(() => {
    return offset.value <= 0;
  });

  function init() {
    search(query.value, offset.value);
  }

  function nextPage() {
    search(query.value, Math.min(offset.value + limit.value, total.value ?? 0));
  }

  function prevPage() {
    search(query.value, Math.max(offset.value - limit.value, 0));
  }
</script>

<style lang="scss" scoped>
.library-listing {
  container: library-listing / inline-size;

  .empty-message {
    color: var(--surface-600);
    padding: 2rem;
    text-align: center;
  }

  .search-container {
    align-items: center;
    background-color: var(--surface-0);
    box-shadow: var(--elevation-3);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
    padding: 1rem;

    > div {
      align-items: center;
      display: flex;
      gap: 0.5rem;
    }
  }
}

@container library-listing (width < 550px) {
  .search-container {
    flex-direction: column;
    flex-wrap: nowrap;

    > div:first-child {
      align-self: flex-start;
      width: 100%;

      > input {
        flex: 1;
      }
    }
  }
}
</style>
