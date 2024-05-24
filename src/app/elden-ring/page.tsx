"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Body from "./body";

export default function EldenRing() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}><Body /></QueryClientProvider>
  );
}
