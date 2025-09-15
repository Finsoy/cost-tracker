import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Main, NotFound } from './pages';
import { Signup } from './pages/Signup';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* 404 – всегда в конце */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
