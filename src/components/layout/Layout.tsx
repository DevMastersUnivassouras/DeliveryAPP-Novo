
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Header } from "./Header";
import { Footer } from "./Footer";

const protectedRoutes = ["/", "/my-orders", "/cart", "/checkout", "/order-status"];
const adminRoutes = ["/admin"];

export const Layout = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if current route is protected and redirect if needed
  useEffect(() => {
    if (!isLoading) {
      // Check for protected routes
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname === route || location.pathname.startsWith(`${route}/`)
      );
      
      const isAdminRoute = adminRoutes.some(route => 
        location.pathname === route || location.pathname.startsWith(`${route}/`)
      );
      
      // Redirect if trying to access protected route without being logged in
      if (isProtectedRoute && !user) {
        navigate("/login", { replace: true });
      }
      
      // Redirect if trying to access admin route without admin privileges
      if (isAdminRoute && (!user || !user.isAdmin)) {
        navigate("/", { replace: true });
      }
    }
  }, [user, isLoading, location.pathname, navigate]);

  // Show minimal loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
