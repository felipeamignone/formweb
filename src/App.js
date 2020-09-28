import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import './App.css';


import Input from './components/Form/input';

const initialData = {
  email: 'felipemignone@gmail.com'
}

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, {reset}) {
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome e obrigatorio'),
        email: Yup.string()
          .email('Digite um email valido')
          .required('O email e obrigatorio'),
        addres: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No minimo 3 caracteres')
            .required('A cidade e obrigatoria')
        })
      })

      await schema.validate(data, {
        abortEarly: false, //impede que o Yup nao complete toda a validacao por encontrar uma no comeco do codigo
      })

      console.log(data);

      formRef.current.setErrors({});

      reset();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }
  return (
    <div className="App">
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />

        <Scope path='address'>
          <Input name="street" />
          <Input name="number" />
          <Input name="complement" />
          <Input name="city" />
          <Input name="neighborhood" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
