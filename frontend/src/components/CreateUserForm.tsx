import { useState } from 'react';
import { createUser } from '../api/users';

export default function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newUser = await createUser({ email, name, password });
      console.log('✅ User created:', newUser);
    } catch (err) {
      console.error('❌ Error creating user:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
