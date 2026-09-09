import { defineConfig } from 'mobilewright';
import { browserStackDriver } from '@browserstack/mobilewright';

export default defineConfig({
  testDir: './tests',
  bundleId: 'com.bstack.demo',
  timeout: 60_000,
  driver: browserStackDriver({
    app: 'bs://3e6fa090f64631b0277501baf5108585ee9780b1',
    project: 'MobileWright - BStackDemo',
  }),
  projects: [
    {
      name: 'android',
      use: {
        platform: 'android',
        deviceName: /Google Pixel/,
        osVersion: '>=13',
      },
    },
  ],
});
