/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - constants.ts
 */

export const USAGE_URL =
  (process.env.REACT_APP_SERVER as string) + "/dashboard/usage-history";
export const USAGE_API_URL =
  (process.env.REACT_APP_SERVER as string) + "/api/usage-count";
export const S_LEVEL_URL =
  (process.env.REACT_APP_SERVER as string) + "/dashboard/level-history";
export const NEW_NOTIFICATIONS_URL =
  (process.env.REACT_APP_SERVER as string) + "/dashboard/notifications/new";
export const NOTIFICATIONS_URL =
  (process.env.REACT_APP_SERVER as string) + "/dashboard/notifications";
