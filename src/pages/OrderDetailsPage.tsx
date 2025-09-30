import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Text,
  Button,
  List,
  ListItemCustom,
  ObjectStatus,
  Timeline,
  TimelineItem,
} from "@ui5/webcomponents-react";

import { useData } from "../hooks/useData";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const orderId = Number(id);
  const nav = useNavigate();

  const { orders, orderItems, deliveries } = useData();

  const order = orders.find((o) => o.OrderID === orderId);
  const items = orderItems.filter((i) => i.OrderID === orderId);
  const dels = deliveries.filter((d) => d.OrderID === orderId);

  if (!order) return <Text>Order not found</Text>;

  const cur = (v: number) =>
    new Intl.NumberFormat("el-GR", {
      style: "currency",
      currency: order.Currency,
    }).format(v);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card
        header={
          <CardHeader
            titleText={`Order #${order.OrderID}`}
            subtitleText={order.CustomerName}
          />
        }
      >
        <div className="p-4 space-y-1">
          <ObjectStatus
            state={
              order.Status === "Closed"
                ? "Positive"
                : order.Status === "InProgress"
                  ? "Information"
                  : "Critical"
            }
          >
            {order.Status}
          </ObjectStatus>
          <Text>Amount: {cur(order.GrossAmount)}</Text>
          <br />
          <Text>Created: {new Date(order.CreatedAt).toLocaleString()}</Text>
        </div>
      </Card>

      {/* Items Card */}
      <Card header={<CardHeader titleText="Items" />}>
        <div className="p-2">
          <List separators="Inner">
            {items.map((it) => (
              <ListItemCustom key={it.SKU}>
                <div className="grid grid-cols-[1fr_auto_auto] gap-2 w-full">
                  <div>
                    <div className="font-semibold">{it.Name}</div>
                    <div className="opacity-70">{it.SKU}</div>
                  </div>
                  <div className="self-center">
                    Qty: {it.Qty} {it.UoM}
                  </div>
                  <div className="self-center">
                    {cur(it.UnitPrice * it.Qty)}
                  </div>
                </div>
              </ListItemCustom>
            ))}
            {items.length === 0 && (
              <ListItemCustom>
                <div className="p-2 opacity-70">No items</div>
              </ListItemCustom>
            )}
          </List>
        </div>
      </Card>

      {/* Deliveries Card */}
      <Card header={<CardHeader titleText="Deliveries" />}>
        <div className="p-2">
          <Timeline>
            {dels.map((d) => (
              <TimelineItem
                key={d.DeliveryID}
                name={`${d.DeliveryID} • ${d.Status}`}
                titleText={`${d.Carrier} • ${d.TrackingNo}`}
                subtitleText={new Date(d.PlannedDate).toLocaleString()}
              >
                <Text>
                  {d.Status === "Delivered"
                    ? `Delivered at ${new Date(d.ActualDate as string).toLocaleString()}`
                    : "Planned / In transit"}
                </Text>
              </TimelineItem>
            ))}
            {dels.length === 0 && (
              <TimelineItem titleText="No deliveries yet" />
            )}
          </Timeline>
        </div>
      </Card>

      {/* Back button */}
      <div className="flex justify-end">
        <Button design="Emphasized" onClick={() => nav("/dashboard")}>
          Back
        </Button>
      </div>
    </div>
  );
}
