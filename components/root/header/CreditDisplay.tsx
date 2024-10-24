"use client";

import { useAppSelector } from "@/lib/hooks";

export default function CreditDisplay() {
  const credit = useAppSelector((state) => state.credit);

  return <div>{credit.balance}</div>;
}
