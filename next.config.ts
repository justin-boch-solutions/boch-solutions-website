import type { NextConfig } from "next";

const contentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  object-src 'none';
  script-src 'self' 'unsafe-inline' https:;
  style-src 'self' 'unsafe-inline' https:;
  img-src 'self' data: blob: https:;
  font-src 'self' data: https:;
  connect-src 'self' https:;
  frame-src 'self' https:;
  media-src 'self' blob: data: https:;
  manifest-src 'self';
  worker-src 'self' blob:;
  upgrade-insecure-requests;
`;

const permissionsPolicy = `
  accelerometer=(),
  autoplay=(self),
  camera=(),
  clipboard-read=(),
  clipboard-write=(self),
  display-capture=(),
  fullscreen=(self),
  geolocation=(),
  gyroscope=(),
  magnetometer=(),
  microphone=(),
  midi=(),
  payment=(),
  picture-in-picture=(self),
  publickey-credentials-get=(self),
  screen-wake-lock=(),
  sync-xhr=(),
  usb=(),
  web-share=()
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Permissions-Policy",
            value: permissionsPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
