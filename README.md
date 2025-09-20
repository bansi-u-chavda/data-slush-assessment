# DataSlush Analytics Implementation Engineer Intern Assessment

This repository contains the required files for the DataSlush Analytics Implementation Engineer Intern Assessment.

## Project Structure

```
DATA-SLUSH-ASSESSMENT/
├── assets/
│   ├── css/
│   │   └── styles.css           # Styling for the webpage
│   └── js/
│       └── tracking.js          # JavaScript tracking implementation
├── screenshots/                 # Implementation evidence
│   ├── Browser_console.PNG      # Browser console showing dataLayer events
│   ├── publish.png              # GTM publish confirmation
│   ├── realtime_overview_analytics.png # GA4 Realtime data overview
│   ├── realtime_pages.png       # GA4 Realtime pages data
│   └── tagAssistant.png         # Tag Assistant showing GTM connection
├── ga4-framework.md            # Comprehensive GA4 implementation framework
├── gtm-container-export.json # GTM container configuration export
├── index.html                   # Main HTML page with navigation and content
└── README.md                   # This file
```

## Setup Instructions

1. **Clone the Repository:** Clone this repository to your local machine.
2. **Open the File:** Open the `index.html` file in your preferred web browser.
3. **Install Tag Assistant:** Install the Google Tag Assistant Chrome extension.
4. **Connect to Tag Manager:** Use the GTM Preview mode with your local URL (e.g., `http://127.0.0.1:3000/index.html`) to connect to the GTM container.

## Testing Instructions

1. Open `index.html` in browser
2. Install Google Tag Assistant extension
3. Navigate and scroll to see tracking in action
4. Check console (F12) for dataLayer events
5. Verify events appear in GTM Preview mode
6. Confirm data flows to GA4 Realtime reports

## Logic Explanation and Assumptions

This implementation uses the `dataLayer` to capture user interactions and send them to Google Analytics 4 (GA4) via Google Tag Manager (GTM).

### Required Events (Per Assessment)

**Navigation Click Tracking (Part 1):**
- A custom event named `nav_click` is pushed to the `dataLayer` whenever a user clicks on a navigation link in the main menu or footer.
- The `section_name` parameter is also pushed to the `dataLayer`, capturing the `data-section` attribute of the clicked element (e.g., "Home", "About", "Services").
- In GTM, a `Custom Event` trigger listens for the `nav_click` event, and a `GA4 Event` tag sends the event and the `section_name` parameter to GA4.

**Scroll Depth Tracking (Part 2):**
- A custom event named `scroll_depth` is pushed to the `dataLayer` at four distinct scroll milestones: 25%, 50%, 75%, and 100%.
- The `scroll_percent` parameter captures the specific percentage milestone reached.
- The implementation uses a Set() data structure to track each milestone only once per page load to prevent duplicate events.
- Uses `requestAnimationFrame` for performance optimization.
- In GTM, a `Custom Event` trigger listens for the `scroll_depth` event, and a `GA4 Event` tag sends the event and the `scroll_percent` parameter to GA4.

### Enhanced Events (Beyond Requirements)

**CTA Click Tracking:**
- Tracks button clicks with `cta_click` event and `cta_label` parameter
- Monitors conversion intent and button performance

**Outbound Link Tracking:**
- Tracks external service page clicks with `outbound_click` event and `outbound_url` parameter
- Helps identify user interest in specific services

**Contact Form Tracking:**
- Tracks form submissions with `contact_submit` event and `msg_length` parameter (privacy-safe)
- Monitors form completion without capturing PII

## Technical Implementation Details

### GTM Configuration
- **Container ID:** GTM-58XP7S39
- **Container Name:** dataslush-test
- **Total Tags:** 6 (1 Config + 5 Event tags)
- **Total Triggers:** 5 (Custom Event triggers)
- **Total Variables:** 5 (Data Layer variables)

### GA4 Configuration
- **Property Name:** DataSlush Website
- **Measurement ID:** G-B8VFYN3KMX
- **Events Tracked:** nav_click, scroll_depth, cta_click, outbound_click, contact_submit

### Event Deduplication Strategy
- Scroll events use `Set()` to track fired milestones
- Navigation events allow multiple fires for repeat interactions
- Form events prevent duplicate submissions via form reset

## Known Limitations

- Custom parameters (section_name, scroll_percent) may need 24-48 hours to appear in Looker Studio after initial GA4 registration
- Current Looker Studio dashboard shows event-level data; parameter-level breakdowns may be pending
- All tracking is functional and data is flowing correctly to GA4

## Screenshots Evidence

The `/screenshots/` folder contains:
- **Browser_console.PNG:** Browser console showing dataLayer events with correct parameters
- **publish.png:** GTM container publish confirmation showing successful deployment
- **realtime_overview_analytics.png:** GA4 Realtime overview demonstrating active users and event data
- **realtime_pages.png:** GA4 Realtime pages showing page-level analytics data
- **tagAssistant.png:** Tag Assistant showing GTM connection and container verification

## Answers to Follow-Up Questions

1. **How did you prevent duplicate scroll depth events?**
   I used a `Set()` data structure to ensure each scroll milestone (25%, 50%, 75%, 100%) is tracked only once per page load. Once a milestone is reached and the event is fired, it's added to the Set, preventing duplicate events even if the user scrolls up and down repeatedly.

2. **Why is it useful to track navigation interactions separately from pageviews?**
   Tracking navigation interactions as separate events provides granular understanding of user behavior. While a pageview indicates a user landed on a page, a `nav_click` event reveals specific interests and navigation patterns. This data is crucial for analyzing user flow, identifying popular content sections, and understanding user intent within single-page experiences.

3. **How would this change if the site was a single-page application (SPA)?**
   For an SPA, traditional pageviews wouldn't capture navigation between views. Instead, virtual pageview events would need to be pushed to the `dataLayer` when content changes. The scroll depth tracking logic would need to reset for each virtual pageview to accurately measure engagement on new content sections.

4. **How would you debug scroll tracking issues in GTM or GA4?**
   - **GTM Preview Mode:** Verify `scroll_depth` events fire correctly and push expected data to `dataLayer`. Check Variables and Data Layer tabs for correct `scroll_percent` values.
   - **GA4 DebugView:** Confirm `scroll_depth` events and parameters are received by GA4, verifying successful data passage from GTM.
   - **Browser Console:** Check for dataLayer events and any JavaScript errors that might prevent tracking.
   - **Performance Analysis:** Monitor event firing frequency and ensure no performance impact.

## Deliverables

- **GitHub Repository:** https://github.com/bansi-u-chavda/dataslush-analytics-assessment
- **Looker Studio Dashboard:** https://lookerstudio.google.com/reporting/6b5b3932-a9ba-4bee-966c-7a7c966bc258
- **GTM Container:** GTM-58XP7S39 (exported as JSON)
- **GA4 Property:** DataSlush Website (G-B8VFYN3KMX)
- **Live Demo:** Open index.html locally and test

## Dashboard Summary

The Looker Studio dashboard demonstrates:
- **Event Tracking Overview:** Shows all tracked events (nav_click, scroll_depth, cta_click, etc.)
- **User Interaction Analysis:** Event counts and distribution patterns
- **Data Flow Validation:** Proves implementation is working correctly
- **Real-time Analytics:** Data flowing from GTM to GA4 to Looker Studio

## Bonus Features Implemented

- **Event Deduplication:** Sophisticated scroll milestone tracking with Set() data structure
- **Performance Optimization:** requestAnimationFrame usage for smooth scrolling
- **Enhanced Tracking:** Additional CTA, outbound link, and form tracking beyond requirements
- **Privacy Compliance:** Form tracking without capturing PII (message length only)
- **Comprehensive Documentation:** Detailed GA4 framework and implementation guide

---

