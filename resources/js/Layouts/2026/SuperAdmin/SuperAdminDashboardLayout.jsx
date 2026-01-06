// resources/js/Layouts/2026/SuperAdmin/SuperAdminDashboardLayout.jsx
const SuperAdminDashboardLayout = ({ children, user }) => (
  <div className="min-h-screen bg-red-50">
    <div className="bg-red-500 text-white text-center p-3 font-bold">
      ✅ SUPER ADMIN LAYOUT ACTIVO ✅
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default SuperAdminDashboardLayout;
