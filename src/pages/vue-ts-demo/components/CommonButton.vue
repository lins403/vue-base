<template>
  <div class="button" :class="`size-${size}`">
    <!-- @slot Button content, e.g. label text -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ButtonSize } from './button-types'

/**
 * This is a very nice button. It comes in three sizes!
 **/
@Component({
  name: 'CommonButton'
})
export default class CommonButton extends Vue {
  /**
   * The size of the button
   * @values default,small,big
   */
  @Prop({ type: String, default: 'default' }) readonly size!: ButtonSize
}
</script>

<style lang="scss">
.button {
  display: inline-block;
  padding: 0 1em;
  line-height: 2em;
  border: 1px solid #000;
  border-radius: 3px;

  &.size-small {
    font-size: 0.8em;
  }
  &.size-big {
    font-size: 1.5em;
  }
}
</style>
