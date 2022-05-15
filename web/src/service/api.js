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
