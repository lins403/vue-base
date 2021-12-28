<!--
 * 角色权限树功能
 * 1. <el-tree> 复选框的用法：禁用点击；通过ref来调用tree的setCheckedKeys和getCheckedKeys；
 * 2. jsx和render函数的简易用法
 * 3. slot的简易用法
 * 4. throttle, debounce的指令用法和函数用法
-->

<template>
  <basic-container class="menu">
    <div class="menu__header">
      <el-button v-throttle:click.500="handleEdit" :disabled="!blockStatus" icon="el-icon-edit" type="primary" size="medium">编辑</el-button>
    </div>
    <div v-loading="containerLoading" class="menu--block">
      <menu-tree ref="menuTree" :role-list="roleList" :block-status="blockStatus" class="menu__container" />
      <div class="menu__footer">
        <el-button :disabled="blockStatus" size="medium" @click="cancel">取消</el-button>
        <el-button v-throttle:click.1000="commit" :disabled="blockStatus" type="primary" size="medium">确定</el-button>
      </div>
    </div>
  </basic-container>
</template>
<script>
import { _api1, _api2, _api3 } from '@/api/system/applet-menu'
import { throttle, debounce } from 'lodash'

// 区分开设置的属性和接口参数的roleAlias值
const Zhang = Symbol('路人甲')
const Wang = Symbol('炮灰乙')
/*******************************************************************/
var LinsCardContainer = {
  functional: true,
  /* eslint-disable */
  render: function (h, ctx) {
    return (
      <div class="basic-container">
        <el-card class="basic-container__card">
          {ctx.scopedSlots.header && (
            <div slot="header" class="clearfix">
              {ctx.scopedSlots.header()}
            </div>
          )}
          {ctx.scopedSlots.default()}
        </el-card>
      </div>
    )
  }
  /* eslint-disable */
}
/*******************************************************************/
var menuTree = {
  components: { LinsCardContainer },
  props: ['roleList', 'blockStatus'],
  data() {
    const _this = this
    return {
      defaultProps: {
        children: 'children',
        label: 'title',
        disabled: () => _this.blockStatus
      }
    }
  },
  computed: {
    ZhangRef() {
      return this.$refs['Alice'][0]
    },
    LiRef() {
      return this.$refs['Bob'][0]
    }
  },
  methods: {
    getCheckedKeys() {
      return {
        [Zhang]: this.ZhangRef.getCheckedKeys(),
        [Wang]: this.LiRef.getCheckedKeys()
      }
    },
    setCheckedKeys(keys) {
      this.ZhangRef.setCheckedKeys(keys[Zhang])
      this.LiRef.setCheckedKeys(keys[Wang])
    }
  },
  template: `
    <div>
      <lins-card-container v-for="role in roleList" :key="role.roleAlias" class="menu__box">
        <div slot="header" class="clearfix menu__box--title">
          <span>{{ role.roleName + '界面' }}</span>
        </div>
        <el-tree
          :ref="role.roleAlias"
          :data="role.roleRoutes"
          :props="defaultProps"
          default-expand-all
          show-checkbox
          node-key="id"
          @change.native="handleChange"
        />
      </lins-card-container>
    </div>
  `
}
/*******************************************************************/
export default {
  name: 'lins-menu',
  components: { menuTree },
  directives: {
    throttle: {
      inserted: (el, binding) => {
        const defaultWait = 100
        const eventName = binding.arg || 'click'
        const wait = Number(Object.keys(binding.modifiers)[0]) || defaultWait
        el.addEventListener(
          eventName,
          throttle(binding.value, wait, {
            leading: true,
            trailing: false
          })
        )
      }
    }
  },
  data() {
    return {
      // 内容框loading
      containerLoading: false,
      // 复选框禁用状态
      blockStatus: true,
      // 角色列表
      roleList: [
        {
          roleId: '1',
          roleName: '路人甲',
          roleAlias: 'Alice',
          roleRoutes: null
        },
        {
          roleId: '2',
          roleName: '炮灰乙',
          roleAlias: 'Bob',
          roleRoutes: null
        }
      ],
      // 根据roleList得到的角色ID列表
      roleIds: {},
      // 共享的基础菜单
      baseRoutes: null,
      // 用于重置编辑的菜单缓存
      cacheMenus: null
    }
  },
  async created() {
    this.containerLoading = true
    this.blockStatus = true
    // 获取路由目录（树）
    const result = await _api1()
    this.baseRoutes = result.data.data.menu
    // 获取对应角色的权限路由
    this.getRoutes()
  },
  methods: {
    async getRoutes() {
      // 可以让两个接口同步启动而不被阻塞
      const ZhangPromise = _api2({ roleAlias: 'Alice' })
      const WangPromise = _api2({ roleAlias: 'Bob' })
      const ZhangData = (await ZhangPromise).data.data,
        WangData = (await WangPromise).data.data
      this.roleList.map(role => {
        role.roleRoutes = this.baseRoutes
        this.roleIds[role.roleAlias] = role.roleId
      })
      this.$nextTick(() => {
        this.cacheMenus = {
          [Zhang]: ZhangData.menu,
          [Wang]: WangData.menu
        }
        this.$refs.menuTree.setCheckedKeys(this.cacheMenus)
        this.containerLoading = false
      })
    },
    handleEdit() {
      this.blockStatus = false
    },
    cancel: debounce(
      function () {
        this.$refs.menuTree.setCheckedKeys(this.cacheMenus)
        this.$message.success('重置成功')
        this.blockStatus = true
      },
      500,
      { leading: true, trailing: false }
    ),
    async commit() {
      const form = {
        apiScopeIds: [],
        dataScopeIds: [],
        topMenuIds: []
      }
      const checkedKeys = this.$refs.menuTree.getCheckedKeys()
      const res1 = await _api3({
        ...form,
        menuIds: checkedKeys[Zhang],
        roleIds: new Array(this.roleIds['Alice'])
      })
      const res2 = await _api3({
        ...form,
        menuIds: checkedKeys[Wang],
        roleIds: new Array(this.roleIds['Bob'])
      })

      this.$message.success('编辑成功')
      this.cacheMenus = {
        [Zhang]: checkedKeys[Zhang],
        [Wang]: checkedKeys[Wang]
      }
      this.blockStatus = true
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .menu {
  &__container {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-around;
    // min-height: 60vh;
    min-height: 29em;
    .basic-container {
      width: 40%;
      .menu__box--title {
        text-align: center;
      }
      &__card > .el-card__body {
        min-height: 22em;
        padding: 1em 3em;
      }
    }
  }
  &__header {
    width: 100%;
    margin: 0 0 1em 1em;
  }
  &__footer {
    width: 100%;
    text-align: center;
    .el-button {
      margin: 2em;
    }
  }
  // &__container,
  // &__footer {
  //   @if blockStatus {
  //     pointer-events: none;
  //   }
  // }
}
</style>
