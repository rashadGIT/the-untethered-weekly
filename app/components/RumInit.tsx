"use client";

import { useEffect } from "react";

export default function RumInit() {
  useEffect(() => {
    const applicationId = process.env.NEXT_PUBLIC_RUM_APP_MONITOR_ID;
    const identityPoolId = process.env.NEXT_PUBLIC_RUM_IDENTITY_POOL_ID;
    const region = process.env.NEXT_PUBLIC_RUM_REGION;

    if (!applicationId || !identityPoolId || !region) return;

    import("aws-rum-web").then(({ AwsRum }) => {
      try {
        new AwsRum(applicationId, "1.0.0", region, {
          sessionSampleRate: 1,
          identityPoolId,
          endpoint: `https://dataplane.rum.${region}.amazonaws.com`,
          telemetries: ["errors", "performance"],
          allowCookies: false,
        });
      } catch {
        // RUM initialization failures shouldn't break the app
      }
    });
  }, []);

  return null;
}
