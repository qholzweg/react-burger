import styles from './reset-password.module.css';
import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { register } from '../services/api';

export const ResetPasswordPage = () => {
  const [form, setValue] = useState({ password: '', token: '' });
  const [success, setSuccess] = useState(false);
  const [failState, setFailState] = useState({ error: false, message: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      register.resetPassword(form)
        .then(() => setSuccess(true), e => setFailState({ error: true, message: e }));
    }, [form]
  )

  const { state } = useLocation();

  if (!state?.resetRequested) {
    return (
      <Navigate
        to={'/forgot-password'}
      />
    );
  }

  return (
    <div className={styles.ResetPasswordPage}>
      <AppHeader />
      <main className='content-center text-center'>
        <form className={styles.loginForm} onSubmit={onSubmit} >
          <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
          {success && <p className='text mb-4'>Пароль успешно обновлен</p>}
          {failState.error && <p className='text mb-4 text-error'>Произошла ошибка: {failState.message}</p>}
          <PasswordInput type='password' name='password' placeholder='Введите новый пароль' extraClass='mb-6' value={form.password} onChange={onChange} />
          <Input type='text' name='token' placeholder='Введите код из письма' extraClass='mb-6' value={form.token} onChange={onChange} />
          <Button htmlType="submit" type='primary' extraClass='mb-20'>
            Сохранить
          </Button>

          <p className='mb-4 text-secondary'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}