import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Main, NotFound, Project } from './pages';
import { Signup } from './pages/Signup';
import { ProtectedAuthRoute } from './components/auth';
import { SidebarLayout } from './layouts';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <ProtectedAuthRoute>
                <SidebarLayout />
              </ProtectedAuthRoute>
            }
          >
            <Route
              path="/"
              element={
                <ProtectedAuthRoute>
                  <Main />
                </ProtectedAuthRoute>
              }
            />

            <Route
              path="/projects/:id"
              element={
                <ProtectedAuthRoute>
                  <Project />
                </ProtectedAuthRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
