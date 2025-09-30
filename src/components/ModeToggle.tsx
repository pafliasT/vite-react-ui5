// src/components/ModeToggle.tsx
import { SegmentedButton, SegmentedButtonItem } from "@ui5/webcomponents-react";

// optional but safe: ensure WCs are registered so events fire
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";

type Mode = "orders" | "deliveries";

export default function ModeToggle({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  return (
    <SegmentedButton
      onSelectionChange={(e: any) => {
        // support both wrapper + native event shapes
        const item = e.detail?.selectedItem ?? e.detail?.selectedItems?.[0];
        if (!item) return;
        onChange(item.id === "ordersBtn" ? "orders" : "deliveries");
      }}
    >
      {/* works at runtime , ts bitching */}
      {/* @ts-ignore */}
      <SegmentedButtonItem id="ordersBtn" selected={value === "orders"}>
        Orders
      </SegmentedButtonItem>
      {/* @ts-ignore */}
      <SegmentedButtonItem id="deliveriesBtn" selected={value === "deliveries"}>
        Deliveries
      </SegmentedButtonItem>
    </SegmentedButton>
  );
}
