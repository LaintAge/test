// src/components/LoginForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка аутентификации', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Имя пользователя</label>
        <input type="text" {...register('username', { required: true })} />
        {errors.username && <span>Это поле обязательно</span>}
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" {...register('password', { required: true })} />
        {errors.password && <span>Это поле обязательно</span>}
      </div>
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
