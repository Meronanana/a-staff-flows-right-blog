"use client";

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";

export default function CreditDisplay() {
  const [balance, setBalance] = useState<number>(NaN);
  const contentRef = useRef<HTMLDivElement>(null);
  const balanceRef = useRef<HTMLDivElement>(null);
  const increaseTextRef = useRef<HTMLDivElement>(null);
  const decreaseTextRef = useRef<HTMLDivElement>(null);
  const credit = useAppSelector((state) => state.credit);

  useEffect(() => {
    // balanceRef.current의 hover 애니메이션
    if (!contentRef.current || !balanceRef.current) return;

    contentRef.current.addEventListener("mouseover", (e) => {
      balanceRef.current &&
        balanceRef.current.style.setProperty("opacity", "1");
    });

    contentRef.current.addEventListener("mouseleave", (e) => {
      balanceRef.current &&
        balanceRef.current.style.setProperty("opacity", "0");
    });
  }, []);

  useEffect(() => {
    const diff = credit.balance - balance;

    // diff 값에 따른 애니메이션 추가
    if (diff > 0) {
      increaseTextRef.current &&
        (increaseTextRef.current.textContent = `+${diff}`);

      increaseTextRef.current &&
        increaseTextRef.current.style.setProperty("opacity", "1");

      setTimeout(() => {
        increaseTextRef.current &&
          increaseTextRef.current.style.setProperty("opacity", "0");
      }, 1000);
    } else if (diff < 0) {
      decreaseTextRef.current &&
        (decreaseTextRef.current.textContent = `${diff}`);

      decreaseTextRef.current &&
        decreaseTextRef.current.style.setProperty("opacity", "1");

      setTimeout(() => {
        decreaseTextRef.current &&
          decreaseTextRef.current.style.setProperty("opacity", "0");
      }, 1000);
    }

    setBalance(credit.balance);
  }, [balance, credit.balance]);

  return (
    <div
      ref={contentRef}
      className="relative flex flex-row font-serif leading-5"
    >
      <div ref={balanceRef} className="flex flex-row transition opacity-0">
        {"Credit"}
        <div className="mx-2">:</div>
      </div>
      <div>{balance ? balance : "-"}</div>
      <div
        ref={increaseTextRef}
        id="increase-text"
        className="absolute transition top-[-1.25rem] right-0 text-red-500 opacity-0"
      >
        -
      </div>
      <div
        ref={decreaseTextRef}
        id="decrease-text"
        className="absolute transition bottom-[-1.25rem] right-0 text-blue-500 opacity-0"
      >
        -
      </div>
    </div>
  );
}
