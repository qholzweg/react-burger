import React from 'react';
import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const passwordRef = React.useRef(null)
  const onSubmit = () => {}

  return (
    <div className={styles.LoginPage}>
      <AppHeader />
      <main className='content-center text-center'>
        <form className={styles.loginForm}>
          <h3 className='text text_type_main-medium mb-6'>Вход</h3>
          <Input type='email' placeholder='Email' extraClass='mb-6' />
          <PasswordInput type='password' placeholder='Пароль' extraClass='mb-6'  ref={passwordRef} />
          <Button htmlType="button" type='primary' onClick={onSubmit} extraClass='mb-20'>
            Войти
          </Button>

          <p className='mb-4 text-secondary'>Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>

          <p className='text-secondary'>Забыли пароль? <Link to='/forgot-password'>Забыли пароль?</Link></p>

        </form>
      </main>
    </div>
  )
}