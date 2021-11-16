//--------------------------------------------/* Array2Tree */--------------------------------------------
/**
 * @description: 数组转树形
 * @param {*}
 * @return {*}
 */
export const Array2Tree = arr =>
  arr.map(p => {
    p.children = comments.filter(c => c.parent_id === p.id)
    return p
  })[0]

const nest = (arr, id = null) => arr.filter(item => item.parent_id === id).map(item => ({ ...item, children: nest(arr, item.id) }))

// 示例
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
]
console.log(Array2Tree(comments))
console.log(nest(comments))

//--------------------------------------------/* ArrayShuffle */--------------------------------------------
/**
 * @description: Fisher-Yates算法随机排序
 * @param {Array} arr
 * @return {Array}
 */
export const ArrayShuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const foo = [1, 2, 3, 4, 5]
ArrayShuffle(foo)
