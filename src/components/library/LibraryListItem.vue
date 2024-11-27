<template>
  <li class="library-list-item" role="listitem">
    <dl class="item-title">
      <dt class="sr-only">Title</dt>
      <dd class="h3-text">{{ data?.title }}</dd>
    </dl>
    <dl class="item-info">
      <div>
        <dt>
          <Icon icon="material-symbols:ink-pen" />
          {{ data?.author?.length > 1 ? 'Authors' : 'Author' }}
        </dt>
        <dd><strong>{{ (data?.author ?? ['Unknown']).join(', ') }}</strong></dd>
      </div>
      <div>
        <dt>
          <Icon icon="material-symbols:public" />
          First Published
        </dt>
        <dd><strong>{{ data?.firstPublishYear ?? 'Unknown' }}</strong></dd>
      </div>
      <div>
        <dt>
          <Icon icon="material-symbols:book-4-spark-rounded" />
          Edition
        </dt>
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

  container: library-item / inline-size;

  .item-title {
    dd {
      color: var(--primary);
      line-height: 4rem;
      margin-inline-end: 0;
      margin-inline-start: -0.25rem;
    }
  }

  .item-info {
    display: flex;
    gap: 1rem;

    > div {
      flex: 1;
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
  }
}

@container library-item (width < 550px) {
  .item-title {
    dd.h3-text {
      font-size: 2rem;
      line-height: 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .item-info {
    flex-direction: column;
    gap: 1rem;

    dd {
      padding-inline-start: 3rem;
    }
  }
}
</style>
