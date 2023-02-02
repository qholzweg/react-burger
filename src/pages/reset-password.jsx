import styles from './reset-password.module.css';
import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const onSubmit = () => {}
  return (
    <div className={styles.ResetPasswordPage}>
      <AppHeader />
      <main className='content-center text-center'>
      <form className={styles.loginForm}>
          <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
          <PasswordInput type='password' placeholder='Введите новый пароль' extraClass='mb-6' />
          <Input type='text' placeholder='Введите код из письма' extraClass='mb-6' />
          <Button htmlType="button" type='primary' onClick={onSubmit} extraClass='mb-20'>
          Сохранить
          </Button>

          <p className='mb-4 text-secondary'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}