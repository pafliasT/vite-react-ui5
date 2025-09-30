// src/pages/OrdersPage.tsx
import { useNavigate } from "react-router-dom";
import { List, ListItemStandard, Text } from "@ui5/webcomponents-react";
import { useOrders, type Order } from "../hooks/useOrders";

const statusIcon = (s: Order["Status"]) =>
  s === "Open" ? "process" : s === "InProgress" ? "refresh" : "accept";

// map status to value-state string
const amountState = (
  s: Order['Status']
): 'Positive' | 'Critical' | 'Information' | 'Negative' | 'None' => {
  switch (s) {
    case 'Open':        return 'Critical'      // (yellow)
    case 'InProgress':  return 'Information'   // (blue)
    case 'Closed':      return 'Positive'      // (green)
    default:            return 'None'
  }
}
export default function OrdersPage() {
  const nav = useNavigate();
  const { orders, loading, error } = useOrders();

  if (loading) return <Text>Loading…</Text>;
  if (error) return <Text>⚠ {error}</Text>;

  const onItemClick = (e: any) => {
    const li = e.detail.item as HTMLElement;
    const id = Number(li.dataset.id);
    if (id) nav(`/orders/${id}`);
  };

  return (
    <div style={{ padding: "0 0.5rem" }}>
      <List separators="Inner" onItemClick={onItemClick}>
        {orders.map((o) => (
          <ListItemStandard
            key={o.OrderID}
            data-id={o.OrderID}
            type="Active"
            icon={statusIcon(o.Status)}
            description={`${o.CustomerName} • ${o.Status}`} // <-- string only
            additionalText={new Intl.NumberFormat("el-GR", {
              style: "currency",
              currency: o.Currency,
            }).format(o.GrossAmount)}
            additionalTextState={amountState(o.Status)} // <-- strings OK
          >
            {o.OrderID}
          </ListItemStandard>
        ))}
      </List>
    </div>
  );
}
