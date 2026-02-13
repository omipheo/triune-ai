import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

import { randomUUID } from "node:crypto";
const revision = randomUUID();

const withSerwist = withSerwistInit({
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwist(nextConfig);
