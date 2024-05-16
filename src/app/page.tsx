"use client";
import Body from "./body";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Body />
      </main>
    </QueryClientProvider>
  );
}
