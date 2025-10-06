import ProtectedRoute from "../../components/ProtectedRoute";
import DashboardLayoutComponent from "../../components/DashboardLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </ProtectedRoute>
  );
}
