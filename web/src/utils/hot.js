import store from '../store';

const update = function (key, value) {
  store.commit({
      type: "_update",
      data: {
          key,
          value,
      },
  });
}

const showSuccessSnackbar = function(text) {
  update('snackbar', {
    text,
    type: 'success'
  })
}

const showErrorSnackbar = function(text) {
  update('snackbar', {
    text,
    type: 'error'
  })
}

export default {
  update,
  showSuccessSnackbar,
  showErrorSnackbar
}