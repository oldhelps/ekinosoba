//This is a ES moudle file.Do not use require()
import { snackbar } from 'https://unpkg.com/mdui@2/mdui.esm.js';
document.querySelector('.btn').addEventListener('click', () => {
    snackbar({ message: '点击了按钮' });
  });