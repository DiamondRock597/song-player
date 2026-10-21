import Toast from 'react-native-toast-message';

// The only place outside the host that touches react-native-toast-message.
// Features call these helpers and never import the library directly.

export const MESSAGE_TOAST_TYPE = 'message';

const NOT_IMPLEMENTED_TEXT = 'Not implemented yet';

export const showToast = (text: string) => {
  Toast.show({ type: MESSAGE_TOAST_TYPE, text1: text });
};

export const showNotImplemented = () => showToast(NOT_IMPLEMENTED_TEXT);
