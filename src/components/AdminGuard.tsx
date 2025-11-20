import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  return isLoggedIn ? <>{children}</> : null;
};

export default AdminGuard;