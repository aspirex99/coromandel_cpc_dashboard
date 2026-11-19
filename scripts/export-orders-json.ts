/**
 * Runs automatically before `next build` (npm "prebuild" hook).
 *
 * Writes the full orders list to public/orders-data.json so the browser can load it
 * as a static file from Vercel's CDN. This keeps the cached dashboard page small
 * (Vercel's cached-page limit is 20 MB) and static files don't count toward
 * Fast Origin Transfer.
 */
import fs from "fs";
import path from "path";
import { getOrders } from "../lib/data";

const orders = getOrders();
const outFile = path.join(process.cwd(), "public", "orders-data.json");
fs.writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), orders }));
console.log(`[export-orders-json] Wrote ${orders.length} orders to public/orders-data.json`);
