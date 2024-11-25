<template>
  <div class="loader" :class="{ large }">
    <div class="logo" role="presentation"></div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      large?: boolean,
    }>(),
    {
      large: false,
    }
  );
</script>

<style lang="scss" scoped>
.loader {
  align-items: center;
  border-radius: 1rem;
  display: flex;
  height: 2rem;
  isolation: isolate;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 2rem;

  &::before {
		animation: border-rotate 4s linear infinite;
		background-color: transparent;
		background-image: conic-gradient(var(--surface-600) 0deg 120deg, transparent 120deg 360deg);
		content: '';
		height: 200%;
		left: -50%;
		position: absolute;
		top: -50%;
		width: 200%;
		z-index: -2;
	}

	&::after {
    background: var(--surface-0);
		border-radius: 50%;
		content: '';
		inset: 5%;
		position: absolute;
		z-index: -1;
	}

  &.large {
    border-radius: 5rem;
    height: 10rem;
    width: 10rem;

    &::after {
      inset: 10%;
    }

    &::before {
      background-image: conic-gradient(var(--surface-200) 0deg 120deg, transparent 120deg 360deg);
    }

    .logo {
      height: 80%;
      width: 80%;
    }
  }

  .logo {
    background-color: var(--primary);
    height: 75%;
    mask-image: url('@/assets/images/logo.svg');
    mask-repeat: no-repeat;
    mask-size: 100%;
    width: 75%;
  }

  @keyframes border-rotate {
    100% {
      transform: rotate(1turn);
    }
  }
}
</style>
