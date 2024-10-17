"use client";

import { useState, useEffect } from "react";
import { Item } from "@/interfaces";

function getBag(bag: "order" | "pre") {
  return JSON.parse(localStorage.getItem(bag) || "[]") as Item[];
}

export function useItems(bag: "order" | "pre") {
  const [items, setItems] = useState([] as Item[]);

  useEffect(() => {
    setItems(getBag(bag));
    window.addEventListener(bag, () => setItems(getBag(bag)));
  }, [bag]);

  return items;
}

/* 

export function useMount() {
  const [mount, setMount] = useState(false);

  useEffect(() => setMount(true));
  return mount;
}

*/
