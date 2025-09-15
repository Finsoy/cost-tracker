import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Main, NotFound } from './pages';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Main />} />

          {/* Логин */}
          <Route path="/login" element={<Login />} />

          {/* 404 – всегда в конце */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
