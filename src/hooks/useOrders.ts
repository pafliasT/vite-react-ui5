import { useEffect, useState } from 'react'

export type Order = {
  OrderID: number
  CustomerName: string
  Status: 'Open' | 'InProgress' | 'Closed'
  GrossAmount: number
  Currency: string
  CreatedAt: string
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/orders.json', { cache: 'no-store' })
      .then(r => r.json())
      .then(setOrders)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  return { orders, loading, error }
}
