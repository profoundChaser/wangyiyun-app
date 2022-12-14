//防抖
export const debounce = function (cb, ms) {
    let timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        cb.apply(this, arguments)
      }, ms)
    }
  }
  //节流
  export const throttle = function (fn, ms) {
    let flag = true
    return function () {
      if (!flag) return
      flag = false
      setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
      }, ms)
    }
  }
  
  //说明函数
  const resolver = (...args) => JSON.stringify(args)
  //纯函数可缓存 记忆化
  export const memoize = function (func, resolver) {
    const cache = {}
    return (...args) => {
      const key = resolver(...args)
      if (cache[key]) {
        return cache[key]
      } else {
        return (cache[key] = func(...args))
      }
    }
  }
  
  //科里化
  export const curry = function (func) {
    let length = func.length
    let curried = (...args) => {
      if (args.length < length) {
        return (...rest) => curried(...args, ...rest)
      }
      return func(...args)
    }
    return curried
  }
  
  //组合
  export const compose = function (...args) {
    let { length } = args
    if (length === 1) {
      return (str) => args[0](str)
    }
    return args.reduceRight((acc, cur) => (str) => cur(acc(str)))
  }
  
  //取随机值
  export const getRdNum = function (min, max) {
    return ~~(Math.random() * (max - min) + min)
  }
  
  export const createColor = function () {
    return `rgb(${getRdNum(100, 255)}, ${getRdNum(100, 255)}, ${getRdNum(100, 255)})`
  }
  //数组转树状结构
  export const arrayToTree = function (items) {
    const result = [] // 存放结果集
    const itemMap = {}
  
    // 先转成map存储
    for (const item of items) {
      itemMap[item.id] = {
        ...item,
        children: [],
      }
    }
  
    for (const item of items) {
      const id = item.id
      const pid = item.pid
      const treeItem = itemMap[id]
      if (pid === 0) {
        result.push(treeItem)
      } else {
        itemMap[pid].children.push(treeItem)
      }
    }
    return result
  }
  
  //获取被卷去的高度
  export function st() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  }
  
  //获取屏幕自身的高度
  export function wh() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
  
  //获取可滚动的高度
  export function sh() {
    return document.documentElement.scrollHeight || document.body.scrollHeight
  }
  
  //获取屏幕自身的宽高
  
  export function getClientW() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    }
  }
  
  //交换数组的元素
  export function swap(arr, a, b) {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }
  
  //重定向到某个页面
  export const redirect = (url) => (location.href = url)
  
  //打开新窗口
  export const newWindow = (url) => window.open(url)
  
  //可中断的循环
  export const abortForEach = (arr, cb) => {
    try {
      arr.forEach((item, index) => {
        cb(item, index)
      })
    } catch (error) {
      return error
    }
  }
  
  export const setStore = function (type, key, val) {
    if (type === 'local') {
      if(Array.isArray(val) || (typeof val === 'object')){
        localStorage.setItem(key, JSON.stringify(val))
      }else{
        localStorage.setItem(key, val)
      }
    } else {
      if(Array.isArray(val) || (typeof val === 'object')){
        sessionStorage.setItem(key, JSON.stringify(val))
      }else{
        sessionStorage.setItem(key, val)
      }
    }
  }
  
  export const getStore = function (type, key,isStringify) {
    let res
    if (type === 'local') {
      if(isStringify){
        res=JSON.parse(localStorage.getItem(key))
      }else{
        res=localStorage.getItem(key)
      }
    } else {
      if(isStringify){
        res=JSON.parse(sessionStorage.getItem(key))
      }else{
        res=sessionStorage.getItem(key)
      }
    }
    return res
  }
  
  //精确查询
  export const queryWidthExact = function (obj, prop, val) {
    console.log(obj[prop] === val, obj, prop, val)
    return obj[prop] === val
  }
  
  //模糊查询
  export const queryWidthBlur = function (obj, prop, val) {
    return obj[prop].indexOf(val) >= 0
  }