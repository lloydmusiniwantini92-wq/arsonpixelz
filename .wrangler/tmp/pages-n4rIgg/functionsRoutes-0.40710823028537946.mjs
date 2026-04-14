import { onRequestPost as __api_arson_intel_js_onRequestPost } from "Z:\\ARSONPIXELZ\\functions\\api\\arson-intel.js"
import { onRequestPost as __api_create_checkout_session_js_onRequestPost } from "Z:\\ARSONPIXELZ\\functions\\api\\create-checkout-session.js"
import { onRequestPost as __api_webhook_js_onRequestPost } from "Z:\\ARSONPIXELZ\\functions\\api\\webhook.js"

export const routes = [
    {
      routePath: "/api/arson-intel",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_arson_intel_js_onRequestPost],
    },
  {
      routePath: "/api/create-checkout-session",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_create_checkout_session_js_onRequestPost],
    },
  {
      routePath: "/api/webhook",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_webhook_js_onRequestPost],
    },
  ]