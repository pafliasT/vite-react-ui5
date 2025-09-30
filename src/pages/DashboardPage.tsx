// src/pages/DashboardPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/useData";
import { Card, CardHeader, Text } from "@ui5/webcomponents-react";
import ModeToggle from "../components/ModeToggle";
import OrdersCard from "../components/OrdersCard";
import DeliveriesCard from "../components/DeliveriesCard";

export default function DashboardPage() {
  const { orders, deliveries, totals, loading, error } = useData();
  const [mode, setMode] = useState<"orders" | "deliveries">("orders");
  const nav = useNavigate();

  if (loading) return <Text>Loading…</Text>;
  if (error) return <Text>⚠ {error}</Text>;

  const fmtEUR = (v: number) =>
    new Intl.NumberFormat("el-GR", {
      style: "currency",
      currency: "EUR",
    }).format(v);

  return (
    <div className="space-y-4">
      {/* KPI row */}
      <div className="grid gap-3 md:grid-cols-4">
        <Card
          header={
            <CardHeader
              titleText={`Orders: ${totals.orderCount}`}
              subtitleText="All customers"
            />
          }
        />
        <Card
          header={
            <CardHeader
              titleText={`Open: ${totals.open}`}
              subtitleText="Pending"
            />
          }
        />
        <Card
          header={
            <CardHeader
              titleText={`In Progress: ${totals.inprog}`}
              subtitleText="Processing"
            />
          }
        />
        <Card
          header={
            <CardHeader
              titleText={fmtEUR(totals.totalValue)}
              subtitleText="Total value"
            />
          }
        />
      </div>

      <div className="flex justify-end">
        <ModeToggle value={mode} onChange={setMode} />
      </div>

      {mode === "orders" ? (
        <OrdersCard
          orders={orders}
          onOpenOrder={(id) => nav(`/orders/${id}`)}
        />
      ) : (
        <DeliveriesCard
          deliveries={deliveries}
          onOpenOrder={(id) => nav(`/orders/${id}`)}
        />
      )}
    </div>
  );
}
