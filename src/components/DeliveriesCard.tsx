import {
  Card,
  CardHeader,
  List,
  ListItemStandard,
} from "@ui5/webcomponents-react";

type Delivery = {
  DeliveryID: string;
  OrderID: number;
  PlannedDate: string;
  ActualDate: string | null;
  Status: "Planned" | "Delivered" | "Delayed";
  Carrier: string;
  TrackingNo: string;
};

type ListItemClickDetail = { item: HTMLElement }

export default function DeliveriesCard({
  deliveries,
  onOpenOrder,
}: {
  deliveries: Delivery[];
  onOpenOrder?: (orderId: number) => void;
}) {
  const state = (s: Delivery["Status"]) =>
    s === "Delivered"
      ? "Positive"
      : s === "Planned"
        ? "Information"
        : "Critical";

  return (
    <Card header={<CardHeader titleText="Upcoming Deliveries" />}>
      <div className="p-2">
        <List
          separators="Inner"
          onItemClick={(e: CustomEvent<ListItemClickDetail>) => {
            if (!onOpenOrder) return;
            const el = e.detail.item as HTMLElement;
            const m = (el.textContent || "").match(/Order #(\d+)/);
            if (m) onOpenOrder(Number(m[1]));
          }}
        >
          {deliveries.map((d) => (
            <ListItemStandard
              key={d.DeliveryID}
              type={onOpenOrder ? "Active" : "Inactive"}
              description={`${d.Carrier} • ${d.TrackingNo}`}
              additionalText={new Date(d.PlannedDate).toLocaleDateString()}
              additionalTextState={state(d.Status)}
            >
              {d.DeliveryID} → Order #{d.OrderID}
            </ListItemStandard>
          ))}
        </List>
      </div>
    </Card>
  );
}
