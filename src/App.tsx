// src/App.tsx
import { ShellBar } from "@ui5/webcomponents-react";
import { Routes, Route, Navigate } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ThemeSelect from "./components/ThemeSelect";

export default function App() {
  return (
    <>
      <ShellBar primaryTitle="Coke Orders" />
      <ThemeSelect />
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
      </Routes>
    </>
  );
}
