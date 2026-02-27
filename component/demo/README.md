Demo folder for warrior card component

How to run locally:

1. From the project root, serve the component/demo folder using a simple static server. For example:

   - Using Python 3: python -m http.server 8080 --directory component/demo
   - Using Node (http-server): npx http-server component/demo -p 8080

2. Open http://localhost:8080 in your browser.

Test viewports:
- 320px (mobile)
- 768px (tablet)
- 1440px (desktop)

QA artifacts:
- qa_report.md (contains test results and screenshots)

Note: Replace warrior PNGs in this folder with the delivered assets if they differ. The card expects files named:
- warrior_front.png
- warrior_back.png
- warrior_icon.png

The demo loads character.json and renders the card accordingly.