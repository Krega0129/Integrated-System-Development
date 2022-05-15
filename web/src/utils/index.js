import store from '@/store';

const timeFormatter = (time) => {
  return time.split('.')[0].split('T').join(' ')
}

const sexFormatter = (sex) => {
  return sex == 1 ? '男' : '女'
}

const roleFormatter = (role) => {
  return (['员工', '自由职业者', '客户'])[role - 1]
}

const categoryFormatter = (category) => {
  return store.state.category.find(n => n.value == category).text
}

export {
  timeFormatter,
  sexFormatter,
  roleFormatter,
  categoryFormatter
}