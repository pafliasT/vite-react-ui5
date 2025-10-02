// src/components/ModeToggle.tsx
import { SegmentedButton, SegmentedButtonItem } from "@ui5/webcomponents-react";
// (optional) ensure WCs are registered
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";

type Mode = "orders" | "deliveries";

// Event detail can be either single selectedItem or an array selectedItems
type SegmentedChangeDetail = {
  selectedItem?: HTMLElement
  selectedItems?: HTMLElement[]
}

export default function ModeToggle({
  value,
  onChange,
}: {
  value: Mode
  onChange: (v: Mode) => void;
}) {
  return (
    <SegmentedButton
      onSelectionChange={(e: CustomEvent<SegmentedChangeDetail>) => {
        const item =
          e.detail?.selectedItem ??
          e.detail?.selectedItems?.[0] ??
          undefined
        if (!item) return
        onChange(item.id === "ordersBtn" ? "orders" : "deliveries")
      }}
    >
      <SegmentedButtonItem id="ordersBtn" selected={value === "orders"}>
        Orders
      </SegmentedButtonItem>

      <SegmentedButtonItem id="deliveriesBtn" selected={value === "deliveries"}>
        Deliveries
      </SegmentedButtonItem>
    </SegmentedButton>
  );
}
