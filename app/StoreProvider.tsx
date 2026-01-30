"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { getStore, AppStore } from "../lib/store";
import { CreditState, initializeCredit } from "../lib/features/creditSlice";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = getStore();

    // Initialize credit balance
    // Use relative path for client-side to avoid CORS issues
    fetch("/api/credit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: process.env.NODE_ENV === "production" ? 1 : 2,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: CreditState) => {
        if (storeRef.current !== null) storeRef.current.dispatch(initializeCredit(data.balance));
      });
  }

  useEffect(() => {}, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
