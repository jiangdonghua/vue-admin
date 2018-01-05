import Mock from 'mockjs'
import {param2Obj} from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    number: '@increment',
    id: Mock.Random.guid(),
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    order_number: /[A-Z]{4}\d{7}/,
    company: '@region()@ctitle(2, 4)有限公司',
    auditor: '@cname',
    title: '@ctitle(10, 20)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['success', 'pending', 'reject'],
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
}
let _List=List
export default {
  getList: config => {
    const {importance, type, title, page = 1, limit = 5, sort, order_number} = param2Obj(config.url)

    let mockList = _List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (order_number && item.order_number.indexOf(order_number) < 0) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },
  deleteList: config => {
    const {id, page = 1, limit = 5} = param2Obj(config.url)
    _List=_List.filter(item => item.id !== id)

  },
  addList: config => {
    const {id, order_number, company, status, page = 1, limit = 5} = param2Obj(config.url)
     _List.unshift({
      id: Mock.Random.guid(),
      order_number: order_number,
      company: company,
      status: status
    })
  },
  editList: config => {
    const {id, order_number, company, status} = param2Obj(config.url)
    _List.some(item => {
      if (item.id === id) {
        item.order_number = order_number
        item.company = company
        item.status = status
        return true
      }
    })
  },
  batchRemoveList: config => {
    const {ids} = param2Obj(config.url)
    //var ids= []
    // console.log(typeof ids)
    //  for (var i in param2Obj(config.url)) {
    //    ids.push(param2Obj(config.url)[i]);
    //
    //  }
    const ids1 = ids.split(',')
    _List = _List.filter(item => !ids1.includes(item.id))
  },
  getPv: () => ({
    pvData: [{key: 'PC网站', pv: 1024}, {key: 'mobile网站', pv: 1024}, {key: 'ios', pv: 1024}, {key: 'android', pv: 1024}]
  }),
  getArticle: () => ({
    id: 120000000001,
    author: {key: 'mockPan'},
    source_name: '原创作者',
    category_item: [{key: 'global', name: '全球'}],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  })
}
