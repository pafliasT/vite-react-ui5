// src/components/ThemeSelect.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  Option,
  Label,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const THEMES = [
  { value: "sap_horizon", label: "Horizon (Light)" },
  { value: "sap_horizon_dark", label: "Horizon (Dark)" },
  { value: "sap_horizon_hcb", label: "High Contrast Black" },
  { value: "sap_horizon_hcw", label: "High Contrast White" },
];

const STORAGE_KEY = "ui5-theme";

export default function ThemeSelect() {
  const [theme, setThemeState] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || THEMES[0].value
  );

  useEffect(() => {
    setTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const selectedIndex = useMemo(
    () =>
      Math.max(
        0,
        THEMES.findIndex((t) => t.value === theme)
      ),
    [theme]
  );

  return (
    <FlexBox
      alignItems={FlexBoxAlignItems.Center}
      justifyContent={FlexBoxJustifyContent.End}
      style={{ gap: "0.5rem" }}
      className="px-4 py-2"
    >
      <Label>Theme</Label>
      <Select
        style={{ width: 260 }}
        onChange={(e: any) => {
          const opt = e.detail.selectedOption as HTMLElement;
          setThemeState(opt.getAttribute("data-value") || THEMES[0].value);
        }}
      >
        {THEMES.map((t, idx) => (
          <Option
            key={t.value}
            data-value={t.value}
            /* @ts-ignore */ selected={idx === selectedIndex}
          >
            {t.label}
          </Option>
        ))}
      </Select>
    </FlexBox>
  );
}
