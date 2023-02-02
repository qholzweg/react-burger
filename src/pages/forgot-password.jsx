import styles from './forgot-password.module.css';
import AppHeader from '../components/app-header/app-header';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const onSubmit = () => {}
  return (
    <div className={styles.ForgotPasswordPage}>
      <AppHeader />
      <main className='content-center text-center'>
      <form className={styles.loginForm}>
          <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
          <Input type='email' placeholder='Укажите e-mail' extraClass='mb-6' />
          <Button htmlType="button" type='primary' onClick={onSubmit} extraClass='mb-20'>
          Восстановить
          </Button>

          <p className='mb-4 text-secondary'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}