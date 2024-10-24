"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { getStore, AppStore } from "../lib/store";
import { CreditState, initializeCredit } from "../lib/features/creditSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = getStore();

    // Initialize credit balance
    fetch("/api/credit")
      .then((res) => res.json())
      .then((data: CreditState) => {
        if (storeRef.current !== null)
          storeRef.current.dispatch(initializeCredit(data.balance));
      });
  }

  useEffect(() => {}, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
