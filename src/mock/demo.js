import Mock from 'mockjs'

const monitorLog = [
  //--------------------------------------------/* simple case */--------------------------------------------
  {
    url: '/api/dict/dictionary.*',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            value: 0,
            label: '未处理'
          },
          {
            value: 1,
            label: '已处理'
          }
        ]
      }
    }
  },

  //--------------------------------------------/* Post(config.body) */--------------------------------------------
  {
    url: '/api/handle-error-log',
    method: 'post',
    response: config => {
      const { logId, status, reason } = JSON.parse(config.body)
      console.log('error-log-audit >>> ', logId, status, reason)
      return {
        code: 200,
        success: true,
        data: {
          msg: 'success'
        }
      }
    }
  },

  //--------------------------------------------/* Get(getURLParameters(config.url)) */--------------------------------------------
  {
    url: '/api/error-log/list.*',
    type: 'get',
    response: config => {
      const { logId } = getURLParameters(config.url)
      console.log(logId)
      return {
        code: 200,
        data: [
          {
            status: 0,
            reason: '活动按期开始',
            timestamp: '2018-04-15'
          },
          {
            status: 1,
            reason: '通过审核',
            timestamp: '2018-04-13'
          },
          {
            status: 2,
            reason: '创建成功',
            timestamp: '2018-04-11'
          }
        ]
      }
    }
  }
]

export default (function () {
  for (const i of monitorLog) {
    Mock.mock(new RegExp(i.url), i.type, i.response)
  }
})()

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {})
