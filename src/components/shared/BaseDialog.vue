<script lang="ts">
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false
    },
    onTopOfDialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return
      }
      this.$emit('close')
    }
  }
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose"
      class="backdrop"
      :class="{
        'on__top__of__dialog-backdrop': onTopOfDialog
      }"
    ></div>
    <transition name="dialog">
      <dialog
        open
        v-if="show"
        :class="{
          'on__top__of__dialog-dialog': onTopOfDialog
        }"
      >
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
          <base-button v-if="$slots.actions" icon @click="tryClose">
            <span class="header-action">X</span>
          </base-button>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<style lang="sass" scoped>
.backdrop
  position: fixed
  top: 0
  left: 0
  height: 100vh
  width: 100%
  background-color: rgba(0, 0, 0, 0.75)
  z-index: 10


dialog
  position: fixed
  top: 20vh
  left: 10%
  width: 80%
  z-index: 100
  border-radius: 12px
  border: none
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26)
  padding: 0
  margin: 0
  overflow: hidden
  background-color: white

header
  background-color: $base-color-3
  color: white
  width: 100%
  padding: 1rem
  display: flex
  justify-content: space-between
  align-items: center

  h2
    margin: 0
    color: $base-color-1

  .header-action
    font-size: 1.25rem
    @media screen and (min-width: $breakpoint-md)
      font-size: 1.5rem

section
  padding: 1rem

menu
  padding: 1rem
  display: flex
  justify-content: flex-end
  margin: 0

@media screen and (min-width: $breakpoint-md)
  dialog
    left: calc(50% - 20rem)
    width: 40rem

.on__top__of__dialog-backdrop
  z-index: 110

.on__top__of__dialog-dialog
  z-index: 120

.dialog-enter-from,
.dialog-leave-to
  opacity: 0
  transform: scale(0.8)

.dialog-enter-to,
.dialog-leave-from
  opacity: 1
  transform: scale(1)

.dialog-enter-active
  transition: all 150ms ease-out

.dialog-leave-active
  transition: all 150ms ease-in
</style>
