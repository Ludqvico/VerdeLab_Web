"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoaderContextValue {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  loaded: false,
  setLoaded: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <LoaderContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
