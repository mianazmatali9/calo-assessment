import { toast, TypeOptions } from 'react-toastify';

interface Props {
  message: string;
  type?: TypeOptions
}

export const showNotification = ({ message, type = 'error' }: Props) => {
  toast(message, {
    position: 'top-center',
    autoClose: 5000, //5 seconds
    hideProgressBar: true,
    pauseOnHover: true,
    type,
  });
};
