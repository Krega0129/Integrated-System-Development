const HEADERS = {
  SERVICE_HISTORY: [
    ['name', '服务名称'],
    ['buyer', '购买者'],
    ['price', '价格'],
    ['category', '分类'],
    ['introduction', '简介'],
    ['sold', '状态'],
    ['releaseTime', '发布时间']
  ],
  SERVICE_STORE: [
    ['name', '服务名称'],
    ['seller', '发布者'],
    ['price', '价格'],
    ['category', '分类'],
    ['introduction', '简介'],
    ['releaseTime', '发布时间'],
    ['actions', '购买']
  ],
  SERVICE_ORDER: [
    ['name', '服务名称'],
    ['seller', '发布者'],
    ['price', '价格'],
    ['category', '分类'],
    ['introduction', '简介'],
    ['releaseTime', '发布时间'],
    ['buyTime', '购买时间']
  ],
  USER_MANAGEMENT: [
    ['name', '用户名'],
    ['account', '账号'],
    ['role', '账号类型'],
    ['sex', '性别'],
    ['age', '年龄']
  ],
  PROJECT_MANAGEMENT: [
    ['projectName', '项目名'],
    ['category', '分类'],
    ['price', '价格'],
    ['introduction', '简介'],
    ['releaseTime', '发布时间'],
    ['buyTime', '购买时间'],
    ['seller', '发布者'],
    ['buyer', '购买者']
  ],
}

const headersArrToHeadersMap = function(hName) {
  if(Array.isArray(HEADERS[hName]) && HEADERS[hName].every(item => Array.isArray(item))) {
    return new Map(HEADERS[hName]);
  } else {
    throw new Error('传入格式错误');
  }
}

const generateHeaders = function(item, map, config) {
  if(!item) return;

  if(typeof item !== 'object' || !(map instanceof Map)) {
    throw new Error('传入数据类型错误')
  }

  let headerArr = []

  if(config && config.sort && config.sort.length) {
    config.sort.forEach(n => {
      (map.has(n) || n === 'actions') && headerArr.push({
        text: map.get(n),
        value: n,
        align: 'left',
        sortable: config && config.sortable
      })
    })
  } else {
    const itemArr = Object.entries(item)

    itemArr.forEach(([k]) => {
      (map.has(k) || k === 'actions') && headerArr.push({
        text: map.get(k),
        value: k
      })
    })
  }

  return headerArr;
}

export {
  headersArrToHeadersMap,
  generateHeaders
}