import React from 'react';
import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import { useState, useCallback } from 'react';

export const LoginPage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { state } = useLocation();
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const resetSuccessful = state?.resetSuccessful;

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      auth.login(form)
        .then(() => navigate(state?.prev ? state?.prev : '/', { replace: true }));
    }, [form, navigate, state?.prev]
  )

  return (
    <div className={styles.LoginPage}>
      <AppHeader />
      <main className='content-center text-center'>
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <h3 className='text text_type_main-medium mb-6'>Вход</h3>
          {resetSuccessful && <p className='text mb-4'>Пароль успешно обновлен</p>}
          <Input type='email' placeholder='Email' extraClass='mb-6' name="email" value={form.email} onChange={onChange} />
          <PasswordInput type='password' placeholder='Пароль' extraClass='mb-6' name="password" value={form.password} onChange={onChange} />
          <Button htmlType="submit" type='primary' extraClass='mb-20'>
            Войти
          </Button>

          <p className='mb-4 text-secondary'>Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>

          <p className='text-secondary'>Забыли пароль? <Link to='/forgot-password'>Забыли пароль?</Link></p>

        </form>
      </main>
    </div>
  )
}