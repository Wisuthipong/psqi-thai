import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests/e2e',use:{baseURL:'http://127.0.0.1:5173/psqi-thai/'},webServer:{command:'npm run dev',url:'http://127.0.0.1:5173/psqi-thai/',reuseExistingServer:!process.env.CI},projects:[{name:'desktop',use:{viewport:{width:1280,height:900}}},{name:'mobile',use:{viewport:{width:390,height:844}}}]});
