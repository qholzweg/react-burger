import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { register } from '../services/api';
import { useForm } from '../hooks/useForm';

export const ResetPasswordPage = () => {
  const {form, handleChange} = useForm({ password: '', token: '' });
  const [failState, setFailState] = useState({ error: false, message: '' });
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e:React.SyntheticEvent) => {
      e.preventDefault();
      register.resetPassword(form)
        .then(() => navigate('/login', { replace: true, state: {resetSuccessful:true}}), e => setFailState({ error: true, message: e }));
    }, [form, navigate]
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
      <main className='content-center text-center'>
        <form className={styles.loginForm} onSubmit={onSubmit} >
          <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
          {failState.error && <p className='text mb-4 text-error'>Произошла ошибка: {failState.message}</p>}
          <PasswordInput name='password' placeholder='Введите новый пароль' extraClass='mb-6' value={form.password} onChange={handleChange} />
          <Input type='text' name='token' placeholder='Введите код из письма' extraClass='mb-6' value={form.token} onChange={handleChange} />
          <Button htmlType="submit" type='primary' extraClass='mb-20'>
            Сохранить
          </Button>

          <p className='mb-4 text-secondary'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}