import { useState } from 'react';
import { register } from '../api/auth';

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
      <h1>Sign up</h1>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={buttonHandler}>Send</button>
    </>
  );
};
