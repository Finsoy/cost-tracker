const API_URL = import.meta.env.VITE_API_URL;
console.log('🚀 ~ API_URL:', API_URL);

function App() {
  const handleButton = async () => {
    const res = await fetch(`${API_URL}/ping`);
    const json = await res.json();
    console.log('json: ', json);
  };

  return (
    <div className="main">
      <h1>Vite + React</h1>
      <button onClick={handleButton}>Click me</button>
    </div>
  );
}

export default App;
