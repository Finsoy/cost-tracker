import { useState } from 'react';
import { register } from '../api/auth';
import { SignupForm } from '@/components/SignupForm';

export const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const buttonHandler = async () => {
    const data = { email, name, password };
    const response = await register(data);
    console.log('🚀 ~ buttonHandler ~ response:', response);
  };

  return (
    <>
      <SignupForm></SignupForm>
    </>
  );
};
