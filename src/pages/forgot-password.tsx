import styles from './forgot-password.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { register } from '../services/api';
import { useForm } from '../hooks/useForm';

export const ForgotPasswordPage = () => {
  const {form, handleChange} = useForm({ email: '' });
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      register.restore(form)
        .then(() => {
          navigate('/reset-password', { replace: true, state: { resetRequested: true } });
        });
    }, [form, navigate]
  )

  return (
    <div className={styles.ForgotPasswordPage}>
      <main className='content-center text-center'>
        <form className={styles.loginForm} onSubmit={onSubmit} >
          <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            extraClass='mb-6'
            name="email"
            onChange={handleChange}
            value={form.email} />
          <Button htmlType="submit" type='primary' extraClass='mb-20'>
            Восстановить
          </Button>

          <p className='mb-4 text-secondary'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}