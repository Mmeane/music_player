import { Suspense, lazy } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingBar from "react-top-loading-bar";
import { LoginWrapper } from "./components/Wrapper";

const AuthenticatedLayout = lazy(() =>
  import("./components/Wrapper/AuthenticatedLayoutWrapper")
);

function App() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login") {
      localStorage.setItem("current_path", location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedCurrentPath = localStorage.getItem("current_path");

    if (token) {
      setUser(true);
      if (location.pathname === "/login") {
        navigate(storedCurrentPath || "/");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, setUser, location.pathname]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={<LoadingBar color="#00a827" shadow={true} progress={100} />}
      >
        <Routes>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/*" element={<AuthenticatedLayout />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
