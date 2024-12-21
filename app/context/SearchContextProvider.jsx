"use client"
import { createContext, useContext, useState } from "react";

export const searchContext = createContext(null);

export default function SearchContextProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
}
