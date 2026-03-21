Demo verification and run instructions

1) Start a simple static server from the repository root. Example using http-server:

   npx http-server -p 8000

2) Open http://localhost:8000/demo/index.html to view the demo.

3) Run automated smoke test (requires Playwright):

   npm install --save-dev playwright
   node scripts/smoke-test.js

See verification.md for the manual checklist and recorded test results.
