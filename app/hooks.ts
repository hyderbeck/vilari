"use client";

import { useState, useEffect } from "react";
import { Order, OrderItem, SearchParams } from "@/interfaces";
import { useSearchParams as useSParams } from "next/navigation";

function getBag(orderType: Order) {
  return JSON.parse(localStorage.getItem(orderType) ?? "[]") as OrderItem[];
}

export function useBag(orderType: Order) {
  const [items, setItems] = useState([] as OrderItem[]);

  useEffect(() => {
    setItems(getBag(orderType));
    window.addEventListener(orderType, () => setItems(getBag(orderType)));
  }, [orderType]);

  return items;
}

export function useSearchParams() {
  const params: SearchParams = {};
  useSParams().forEach(
    (value, key) => (params[key as keyof SearchParams] = value)
  );
  return params;
}
