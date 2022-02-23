export default {
  bind: (el, binding) => {
    // overflow为scroll的区域
    const SELECTWRAP = binding.arg ? el.querySelector(`.${binding.arg}`) : el
    SELECTWRAP.addEventListener('scroll', function () {
      if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
        binding.value()
      }
    })
  }
}
//  <el-select v-loadmore:el-select-dropdown__wrap="loadMore">
//  <el-table v-loadmore:el-table__body-wrapper="loadMore">
