const HEADERS = {
  SERVICE_HISTORY: [
    ['name', '服务名称'],
    ['buyer', '购买者'],
    ['price', '价格'],
    ['category', '分类'],
    ['introduction', '简介'],
    ['sold', '状态']
  ]
}

const headersArrToHeadersMap = function(hName) {
  if(Array.isArray(HEADERS[hName]) && HEADERS[hName].every(item => Array.isArray(item))) {
    return new Map(HEADERS[hName]);
  } else {
    throw new Error('传入格式错误');
  }
}

const generateHeaders = function(item, map, sort = []) {
  if(!item) return;

  if(typeof item !== 'object' || !(map instanceof Map)) {
    throw new Error('传入数据类型错误')
  }

  let headerArr = []

  if(sort.length) {
    sort.forEach(n => {
      (map.has(n) || n === 'actions') && headerArr.push({
        text: map.get(n),
        value: n,
        align: 'center',
        sortable: false
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