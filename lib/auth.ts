const DASHBOARD_SECRET = process.env.DASHBOARD_SECRET || "";

export function checkDashboardAuth(request: Request): boolean {
  if (!DASHBOARD_SECRET) return false;
  const url = new URL(request.url);
  return url.searchParams.get("token") === DASHBOARD_SECRET;
}

export function checkTokenParam(searchParams: { token?: string }): boolean {
  if (!DASHBOARD_SECRET) return false;
  return searchParams.token === DASHBOARD_SECRET;
}
