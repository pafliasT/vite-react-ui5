import {
  Card,
  CardHeader,
  List,
  ListItemStandard,
} from "@ui5/webcomponents-react";

type Order = {
  OrderID: number;
  CustomerName: string;
  Status: "Open" | "InProgress" | "Closed";
  GrossAmount: number;
  Currency: string;
  CreatedAt: string;
};
type ListItemClickDetail = { item: HTMLElement }

export default function OrdersCard({
  orders,
  onOpenOrder,
}: {
  orders: Order[];
  onOpenOrder: (orderId: number) => void;
}) {
  const fmt = (v: number, c: string) =>
    new Intl.NumberFormat("el-GR", { style: "currency", currency: c }).format(
      v
    );

  const state = (s: Order["Status"]) =>
    s === "Closed"
      ? "Positive"
      : s === "InProgress"
        ? "Information"
        : "Critical";

  const icon = (s: Order["Status"]) =>
    s === "Open" ? "process" : s === "InProgress" ? "refresh" : "accept";

  return (
    <Card header={<CardHeader titleText="Recent Orders" />}>
      <div className="p-2">
        <List
          separators="Inner"
          onItemClick={(e: CustomEvent<ListItemClickDetail>) => {
            const id = Number((e.detail.item as HTMLElement).dataset.id);
            if (id) onOpenOrder(id);
          }}
        >
          {orders.slice(0, 10).map((o) => (
            <ListItemStandard
              key={o.OrderID}
              data-id={o.OrderID}
              type="Active"
              icon={icon(o.Status)}
              description={`${o.CustomerName} • ${o.Status}`}
              additionalText={fmt(o.GrossAmount, o.Currency)}
              additionalTextState={state(o.Status)}
            >
              {o.OrderID}
            </ListItemStandard>
          ))}
        </List>
      </div>
    </Card>
  );
}
