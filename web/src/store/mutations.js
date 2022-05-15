export default {
  _update(state, {
    data
  }) {
    if(typeof data.key === 'string') {
      toKey(data.key, data.value)
    } else {
      data.key.forEach((k, i) => {
        toKey(k, data.value[i])
      });
    }

    function toKey(str, data) {
      let keys = str.split('.')
      let lastKey = keys.pop()
      let _state = keys.reduce((pre, aft) => {
        return pre[aft]
      }, state)

      _state[lastKey] = data
    }
  }
}