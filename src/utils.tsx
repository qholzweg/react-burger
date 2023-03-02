import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Preloader = () => (
  <div className="message">
    <p className="text text_type_main-medium"><InfoIcon type="primary" /> Пожалуйста, подождите...</p>
  </div>
)
export const Error = () => (
  <div className="message">
    <p className="text text-error text_type_main-medium"><InfoIcon type="error" /> Что-то пошло не так, пожалуйста, проверьте подключение к интернет и попробуйте еще раз</p>
  </div>
)