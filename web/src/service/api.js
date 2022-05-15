import $ from './request';

export function login(data) {
  return $({
    url: '/login',
    method: 'post',
    data,
  })
}

export function register(data) {
  return $({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function checkAccountValid(params) {
  return $({
    url: '/user/checkAccountValid',
    params
  })
}

export function getUserInfo() {
  return $({
    url: '/user/getUserInfo',
  })
}

export function getCategory() {
  return $({
    url: '/user/getCategory',
  })
}

export function releaseService(data) {
  return $({
    url: '/releaseService',
    method: 'post',
    data
  })
}

export function getServiceByUserId() {
  return $({
    url: '/getServiceByUserId'
  })
}

export function getService() {
  return $({
    url: '/getService'
  })
}

export function getServiceOrders() {
  return $({
    url: '/getServiceOrders'
  })
}

export function buyService(data) {
  return $({
    url: '/buyService',
    method: 'post',
    data
  })
}

export function getUserList(params) {
  return $({
    url: '/getUserList',
    params
  })
}

export function getProjectList(params) {
  return $({
    url: '/getProjectList',
    params
  })
}

export function addCategory(data) {
  return $({
    url: '/addCategory',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return $({
    url: '/user/updateUserInfo',
    method: 'patch',
    data
  })
}