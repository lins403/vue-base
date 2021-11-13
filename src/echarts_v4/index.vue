<template>
  <keep-alive>
    <router-view :key="$route.fullPath" include="MainChart, SubChart" />
  </keep-alive>
</template>

<script>
import NProgress from 'nprogress'

export default {
  name: 'ChartAnalysis',
  beforeRouteEnter(to, from, next) {
    next('/****/***/**')
    NProgress.done()
  }
}
</script>

<style lang="scss" scoped></style>
