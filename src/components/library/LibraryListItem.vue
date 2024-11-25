<template>
  <li class="library-list-item" role="listitem">
    <dl class="item-details">
      <div class="item-title">
        <dt class="sr-only">Title</dt>
        <dd class="h3-text">{{ data?.title }}</dd>
      </div>
      <div class="item-info">
        <dt>
          <Icon icon="material-symbols:ink-pen" />
          {{ data?.author?.length > 1 ? 'Authors' : 'Author' }}
        </dt>
        <dt>
          <Icon icon="material-symbols:public" />
          First Published
        </dt>
        <dt>
          <Icon icon="material-symbols:book-4-spark-rounded" />
          Edition
        </dt>
        <dd><strong>{{ (data?.author ?? ['Unknown']).join(', ') }}</strong></dd>
        <dd><strong>{{ data?.firstPublishYear ?? 'Unknown' }}</strong></dd>
        <dd><strong>{{ data?.edition }}</strong></dd>
      </div>
    </dl>
  </li>
</template>

<script setup lang="ts">
  import type { LibraryBook } from '@/core/domain/library/library-types.ts';

  import { Icon } from '@iconify/vue';

  ////////////////////////////////////////////////////////////////////////////////
  //// Component Logic ////
  ////////////////////////////////////////////////////////////////////////////////

  defineProps<{
    data: LibraryBook
  }>();
</script>

<style lang="scss" scoped>
.library-list-item {
  box-shadow: var(--elevation-3);
  margin-top: 1rem;
  padding: 1rem;

  .item-details {
    display: flex;
    flex-direction: column;
    margin-block: 0;

    .item-info {
      display: grid;
      gap: 0 1rem;
      grid-template-rows: 1.25rem auto;
      grid-template-columns: repeat(3, 1fr);

      dd {
        font-size: 1.25rem;
        margin-inline: 0;
      }

      dt {
        color: var(--surface-700);
        white-space: nowrap;

        .iconify {
          display: inline-block;
          margin-bottom: -0.125rem;
        }
      }
    }

    .item-title {
      dd {
        color: var(--primary);
        line-height: 3rem;
        margin-inline-end: 0;
        margin-inline-start: -0.25rem;
      }
    }
  }
}
</style>
