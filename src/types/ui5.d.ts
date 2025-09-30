// src/types/ui5.d.ts
import 'react'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui5-table-column': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'ui5-table-row': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'ui5-table-cell': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
export {}
