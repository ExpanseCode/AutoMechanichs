import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Поле Логін повинно бути заповнене'),
  password: Yup.string().required('Поле Пароль повинно бути заповнене'),
});
