"use client";

import Script from "next/script";

export {};

declare global {
  interface Window {
    gaconnector2?: {
      track: (id: string) => void;
    };
  }
}

export default function GAConnector() {
  return (
    <Script
      id="ga-connector"
      src="https://track.gaconnector.com/gaconnector.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.gaconnector2?.track(
          "19aa3177ca2bb4364523ad62a9d02338"
        );
      }}
    />
  );
}