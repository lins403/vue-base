<template>
  <div id="app">
    <anchored-heading :level="1">hello~</anchored-heading>
    <anchored-heading :level="3">hello~</anchored-heading>
    <anchored-heading :level="5">hello~</anchored-heading>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.component('AnchoredHeading', {
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  // render: function (createElement) {
  //   return createElement(
  //     "h" + this.level, // tag name
  //     this.$slots.default // array of children
  //   );
  // },
  // template: `<component :is="'h' + level"><slot /></component>`,
  render(h) {
    return h(
      'component',
      {
        is: 'h' + this.level
      },
      this.$slots.default
    )
  }
})
export default {
  data() {
    return {}
  }
}
</script>
