import { defineConfig } from 'mobilewright';
import { browserStackDriver } from '@browserstack/mobilewright';

export default defineConfig({
  testDir: './tests',
  bundleId: 'com.bstack.demo',
  timeout: 60_000,
  workers: 3,
  fullyParallel: true,
  driver: browserStackDriver({
    app: 'bs://3e6fa090f64631b0277501baf5108585ee9780b1',
    project: 'MobileWright - BStackDemo',
    build: `BStackDemo Build ${new Date().toISOString().slice(0, 10)}`,
  }),
  projects: [
    {
      name: 'pixel-9-android-17',
      use: {
        platform: 'android',
        deviceName: /Google Pixel 9\b/,
        osVersion: '>=17',
      },
    },
    {
      name: 'samsung-s23-android-13',
      use: {
        platform: 'android',
        deviceName: /Samsung Galaxy S23\b/,
        osVersion: '>=13',
      },
    },
    {
      name: 'samsung-s24-android-14',
      use: {
        platform: 'android',
        deviceName: /Samsung Galaxy S24\b/,
        osVersion: '>=14',
      },
    },
  ],
});
