import Toast from 'react-native-toast-message';

import { MESSAGE_TOAST_TYPE, NOT_IMPLEMENTED_TEXT } from './constants';

export const showToast = (text: string) => {
  Toast.show({ type: MESSAGE_TOAST_TYPE, text1: text });
};

export const showNotImplemented = () => showToast(NOT_IMPLEMENTED_TEXT);
