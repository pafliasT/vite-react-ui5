// src/App.tsx
import { ShellBar } from "@ui5/webcomponents-react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ThemeSelect from "./components/ThemeSelect";

export default function App() {
  return (
    <>
      <ShellBar
        primaryTitle="Coke Orders"
        logo={<img src="/coke.svg" alt="" style={{ height: '32px' }} />}
      />

      <ThemeSelect />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Routes>
      </div>
    </>
  );
}
