import {
  getOrders,
  getKPIs,
  getTimeSeriesData,
  getProductMetrics,
  getRetailerMetrics,
  getFarmerMetrics,
  getWatchlist,
  getStateLevelMetrics,
} from "@/lib/data";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

// Data lives in the repo and every data commit redeploys, so the page can be served
// from Vercel's CDN cache instead of re-rendering ~20 MB of orders on every visit.
// (force-dynamic here was the main driver of Fast Origin Transfer usage.)
export const revalidate = 86400; // 24 hours

export default function DashboardPage() {
  const orders = getOrders();
  const kpis = getKPIs(orders);
  const timeSeries = getTimeSeriesData(orders);
  const products = getProductMetrics(orders);
  const retailers = getRetailerMetrics(orders);
  const farmers = getFarmerMetrics(orders);
  const watchlist = getWatchlist(orders);
  const stateMetrics = getStateLevelMetrics(orders);

  return (
    <DashboardClient
      initialOrders={orders}
      initialKPIs={kpis}
      initialTimeSeries={timeSeries}
      initialProducts={products}
      initialRetailers={retailers}
      initialFarmers={farmers.slice(0, 150)} // Top 150 farmers for fast initial render
      initialWatchlist={watchlist}
      initialStateMetrics={stateMetrics}
      initialTimestamp={new Date().toISOString()}
    />
  );
}
