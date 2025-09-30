import { useEffect, useMemo, useState } from "react";

export type Order = {
  OrderID: number;
  CustomerName: string;
  Status: "Open" | "InProgress" | "Closed";
  GrossAmount: number;
  Currency: string;
  CreatedAt: string;
};
export type OrderItem = {
  OrderID: number;
  SKU: string;
  Name: string;
  Qty: number;
  UnitPrice: number;
  UoM: string;
};
export type Delivery = {
  DeliveryID: string;
  OrderID: number;
  PlannedDate: string;
  ActualDate: string | null;
  Status: "Planned" | "Delivered" | "Delayed";
  Carrier: string;
  TrackingNo: string;
};

type Dataset = {
  orders: Order[];
  orderItems: OrderItem[];
  deliveries: Delivery[];
};

export function useData() {
  const [data, setData] = useState<Dataset>({
    orders: [],
    orderItems: [],
    deliveries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(
    () => ({
      orderCount: data.orders.length,
      totalValue: data.orders.reduce((a, o) => a + (o.GrossAmount || 0), 0),
      open: data.orders.filter((o) => o.Status === "Open").length,
      inprog: data.orders.filter((o) => o.Status === "InProgress").length,
      closed: data.orders.filter((o) => o.Status === "Closed").length,
    }),
    [data]
  );

  return { ...data, totals, loading, error };
}
