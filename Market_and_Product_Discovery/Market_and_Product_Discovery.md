# Market and Product Discovery: Job Aggregator

This document outlines the strategic research and product design phase for the Job Aggregator project, focusing on transforming raw job data into structured, actionable insights.

## 1. Market Analysis & Trends
The tech recruitment market is currently saturated with platforms that prioritize volume over readability.

### Key Trends:
* **Information Overload:** Developers spend hours sifting through poorly formatted, long-form ads.
* **Lack of Transparency:** Salary ranges and tech stacks are often buried in dense paragraphs.
* **Data Fragmentation:** Inconsistent naming conventions for roles (e.g., "Fullstack" vs "Software Engineer") make comparisons difficult.

### Competing Solutions & Gap Analysis:
| Actor | Strengths | Weaknesses |
| :--- | :--- | :--- |
| **LinkedIn** | Massive volume. | High noise; inconsistent data formatting. |
| **WeLoveDevs** | Dev-centric data; cultural focus. | Lacks advanced data research/aggregation features for market comparison |
| **Our Aggregator** | **AI-Driven Normalization.** | Focuses on standardized "Mini-Cards" for instant decision-making. |

---

## 2. User Personas & Needs
### Persona A: "The Efficient Junior" (Alex)
* **Need:** Needs to find entry-level roles that match their stack quickly.
* **Goal:** Use AI-generated summaries to identify "real" junior roles without reading full descriptions.

### Persona B: "The High-Value Researcher" (Jordan)
* **Need:** Wants to compare pay and benefits across multiple offers.
* **Goal:** Use "Mini-Cards" to compare standardized data points (salary, hours, location) at a glance.

---

## 3. Value Proposition
**"The Structured Market View"**
We solve "tab fatigue" by using AI to distill chaotic job descriptions into standardized **Mini-Cards**. We provide one-click clarity on salary, tech stacks, and contract types, ensuring developers never waste time on an irrelevant listing.

---

## 4. Core Product Flows
* **Search & Filter:** Users filter through real ingested data from WeLoveDevs
* **Offer Details:** A clean view displaying mandatory fields: Title, Company, Location, Contract, Date, Description, and Salary.

---

## 5. Innovation Justification (AI Feature)
* **User Problem:** Job descriptions are too long and non-standardized.
* **Feature Hypothesis:** By implementing a **Lightweight LLM/NER Model** (<500MB), we can extract 7 key attributes (Title, Company, Location, Schedule, Contract, Pay, Summary) into a "Mini-Card".
* **Why it's relevant:** It allows for "comparison at scale," which raw descriptions do not support.
---
## 6. Architecture & Constraints
* **AI Model:** Must be a local, lightweight model under 500MB.
* **Performance:** Results must be produced in under 5 seconds per offer.
* **Data Source:** Mandatory integration of the WeLoveDevs API with a 1 req/sec rate limit.