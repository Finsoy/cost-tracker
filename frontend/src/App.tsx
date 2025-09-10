import { API_URL } from './api';
import { getUsers } from './api/users';
import CreateUserForm from './components/CreateUserForm';

function App() {
  const handleCreateUser = async () => {
    const res = await fetch(`${API_URL}/ping`);
    const json = await res.json();
    console.log('json: ', json);
  };

  const handleButtonUsers = async () => {
    const res = await getUsers();
    console.log('res: ', res);
  };

  return (
    <div className="main">
      <h1>Vite + React</h1>
      <button onClick={handleCreateUser}>Click me</button>
      <button onClick={handleButtonUsers}>Click me to get Users</button>

      <CreateUserForm />
    </div>
  );
}

export default App;
