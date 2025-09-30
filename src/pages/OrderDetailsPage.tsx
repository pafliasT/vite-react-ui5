// src/pages/OrderDetailsPage.tsx
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Title, Text, Button } from "@ui5/webcomponents-react";
import { useOrders } from "../hooks/useOrders";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const orderId = Number(id);
  const { orders } = useOrders();
  const order = useMemo(
    () => orders.find((o) => o.OrderID === orderId),
    [orders, orderId]
  );

  if (!order) return <Text>Order not found</Text>;

  return (
    <div style={{ padding: "1rem" }}>
      <Title level="H3">Order #{order.OrderID}</Title>
      <Text>Customer: {order.CustomerName}</Text>
      <br />
      <Text>Status: {order.Status}</Text>
      <br />
      <Text>
        Amount: {order.GrossAmount.toLocaleString("el-GR")} {order.Currency}
      </Text>
      <br />
      <Text>Created: {new Date(order.CreatedAt).toLocaleString()}</Text>
      <br />
      <br />
      <Link to="/orders" style={{ textDecoration: "none" }}>
        <Button design="Emphasized">Back</Button>
      </Link>
    </div>
  );
}
