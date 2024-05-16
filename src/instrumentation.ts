import { registerOTel } from '@vercel/otel'
 
export function register() {
  console.debug("Registering OTel")
  registerOTel({ serviceName: 'next-app' })
}