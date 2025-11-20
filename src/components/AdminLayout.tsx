import { ReactNode } from "react";
import AdminNavigation from "./AdminNavigation";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <AdminNavigation />
      <main className="bg-background">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;