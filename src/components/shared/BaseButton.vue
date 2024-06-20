<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    color?: 'primary' | 'destructive' | 'transparent'
    disabled?: boolean
    icon?: boolean
    variant?: 'elevated' | 'flat' | 'outlined' | 'tonal' | 'text' | 'plain'
    size?: 'x-small' | 'small' | 'large' | 'x-large'
    elevation?: '0' | '4' | '8' | '12' | '16' | '20' | '24'
    block?: boolean
  }>(),
  {
    color: 'primary',
    disabled: false,
    icon: false,
    variant: 'elevated',
    elevation: '4'
  }
)

const btnClasses = computed(() => ({
  'bg-teal-darken-3': props.color === 'primary',
  'bg-pink-darken-3': props.color === 'destructive',
  'bg-grey-darken-3': props.disabled
}))
</script>

<template>
  <router-link v-if="props.to" :to="props.to">
    <v-btn
      :class="btnClasses"
      :readonly="props.disabled"
      :variant="props.variant"
      :size="props.size"
      :elevation="props.elevation"
      :block="props.block"
      ><slot
    /></v-btn>
  </router-link>

  <v-btn
    v-else
    :class="btnClasses"
    :readonly="props.disabled"
    :variant="props.variant"
    :size="props.size"
    :elevation="props.elevation"
    :block="props.block"
  >
    <slot />
  </v-btn>
</template>
