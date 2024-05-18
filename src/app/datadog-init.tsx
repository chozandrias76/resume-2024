import { RumInitConfiguration, datadogRum } from "@datadog/browser-rum";

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
  allowedTracingUrls: [
    { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
  ]
} as RumInitConfiguration

try {
  datadogRum.init(datadogOptions);
} catch(err) {
  console.error("Could not start Datadog", err)
}
finally {
  console.info("Datadog initialized")
}

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}