import styles from './register.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useState, useCallback } from 'react';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {
  const {form, handleChange} = useForm({ name: '', email: '', password: '' });
  const [failState, setFailState] = useState({ error: false, message: '' })
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e:React.SyntheticEvent) => {
      e.preventDefault();
      register.register(form)
        .then(() => navigate('/', { replace: true }))
        .catch(e => setFailState({ error: true, message: e }));
    }, [form, navigate]
  )
  return (
    <div className={styles.RegisterPage}>
      <main className='content-center text-center'>
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <h3 className='text text_type_main-medium mb-6'>Регистрация</h3>
          {failState.error && <p className='text mb-4 text-error'>Произошла ошибка: {failState.message}</p>}
          <Input type='text' placeholder='Имя' extraClass='mb-6' name="name" value={form.name} onChange={handleChange} />
          <Input type='email' placeholder='Email' extraClass='mb-6' name="email" value={form.email} onChange={handleChange} />
          <PasswordInput placeholder='Пароль' extraClass='mb-6' name="password" value={form.password} onChange={handleChange} />
          <Button htmlType="submit" type='primary' extraClass='mb-20'>
            Зарегистрироваться
          </Button>

          <p className='mb-4 text-secondary'>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>

        </form>
      </main>
    </div>
  )
}