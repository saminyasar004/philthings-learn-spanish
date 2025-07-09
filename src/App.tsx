import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/routes";
import { useAuth } from "@/Context/AuthContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const protectedRoutes = ["/dashboard", "/users", "/notification", "/settings/privacy-policy", "/settings/terms-and-condition", "/profile"];
    // Do not redirect to dashboard if just logged in from /login, allow Login component to handle navigation
    if (isAuthenticated && location.pathname === "/login") {
      // No immediate redirection to dashboard, let Login component navigate to /chat
    } else if (!isAuthenticated && protectedRoutes.includes(location.pathname)) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.layout ? (
              <route.layout>{route.element}</route.layout>
            ) : (
              route.element
            )
          }
        />
      ))}
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
