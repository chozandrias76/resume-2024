"use client";
import { RumInitConfiguration, datadogRum } from "@datadog/browser-rum";
import Body from "./body";
import { QueryClient, QueryClientProvider } from "react-query";

const datadogOptions = {
  applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
  clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
  site: 'us3.datadoghq.com',
  service: 'resume',
  env: process.env.NEXT_PUBLIC_APPLICATION_ENV || "development",
  version: process.env.npm_package_version,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
} as RumInitConfiguration

try {
  datadogRum.init(datadogOptions);
} catch(err) {
  console.error("Could not start Datadog", err)
}
finally {
  console.info("Datadog initialized")
}

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
