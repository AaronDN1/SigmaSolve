export type LegalDocumentKey = "privacy" | "terms" | "aup" | "accessibility";

export type LegalDocument = {
  key: LegalDocumentKey;
  title: string;
  fileName: string;
  content: string;
  downloadable?: boolean;
};

const privacyPolicyContent = `**Privacy Policy**
Effective Date: [4/21/2026]

## 1. Overview

Veridia operates an AI-powered platform ("Service").

---

## 2. Information We Collect

Includes:

* Account data (Google login)
* User prompts and uploads
* Usage analytics via PostHog

---

## 3. AI & Third-Party Processing

Data may be processed by OpenAI.

---

## 4. Cookies and Tracking

We use cookies and similar technologies for:

### Essential Cookies

* Authentication
* Core functionality

### Analytics Cookies

* Usage tracking via PostHog

By using the Service, you consent to these technologies.

---

## 5. Data Retention

We retain data as needed to operate the Service.

Users may request deletion. Some data may persist temporarily due to backups or system limitations.

---

## 6. Data Sharing

We do not sell personal data.

---

## 7. Your Rights (U.S. Privacy Laws)

Depending on your location, you may have rights to:

* Access your data
* Request deletion
* Request correction

California residents (CCPA/CPRA) and Virginia residents (VCDPA) may submit requests to:

[VeridiaSupport@gmail.com](mailto:VeridiaSupport@gmail.com)

We will respond in accordance with applicable laws.

---

## 8. International Data Transfers

The Service is operated in the United States.

By using the Service, you consent to your data being transferred to and processed in the United States.

---

## 9. Security

We implement reasonable safeguards but cannot guarantee absolute security.

---

## 10. Children's Privacy

Not intended for users under 13.

---

## 11. Changes

We may update this policy.

---

## 12. Contact

[VeridiaSupport@gmail.com](mailto:VeridiaSupport@gmail.com)
`;

const termsOfServiceContent = `**Terms of Service**
Effective Date: [4/21/2026]

## 1. Acceptance of Terms

By accessing or using Veridia ("Service"), you agree to be bound by these Terms of Service.

If you do not agree, do not use the Service.

---

## 2. Description of Service

Veridia is an AI-powered platform designed to assist with STEM-related learning.

---

## 3. User Accounts

You are responsible for:

* Maintaining account security
* All activity under your account

---

## 4. Acceptable Use

You agree not to:

* Use the Service for unlawful purposes
* Upload harmful, illegal, or infringing content
* Attempt to exploit or disrupt the Service

---

## 5. Educational Use Disclaimer

The Service is intended for **educational assistance only**.

You are solely responsible for how you use generated content, including compliance with academic policies.

---

## 6. AI Disclaimer

The Service uses AI provided by OpenAI.

AI outputs:

* May be inaccurate or incomplete
* Should not be relied upon without verification

---

## 7. Third-Party Dependencies

The Service depends on third-party providers, including OpenAI and hosting infrastructure.

We are not responsible for:

* Service interruptions
* API failures
* Changes to third-party systems

---

## 8. Intellectual Property & DMCA Policy

### User Responsibility

You are responsible for ensuring that any content you upload does not violate copyright or intellectual property laws.

### DMCA Takedown Requests

If you believe content hosted on Veridia infringes your copyright, you may submit a request to:

[VeridiaSupport@gmail.com](mailto:VeridiaSupport@gmail.com)

Your request should include:

* Identification of the copyrighted work
* Location of the infringing material
* Your contact information
* A statement of good faith belief

We will respond and take appropriate action as required by law.

---

## 9. Data and Content

You retain ownership of your content.

By using the Service, you grant Veridia the right to:

* Process and analyze your content
* Store data for service functionality

---

## 10. Indemnification

You agree to indemnify and hold harmless Veridia from any claims, damages, or legal fees arising from:

* Your use of the Service
* Your violation of these Terms
* Content you upload or generate

---

## 11. Limitation of Liability

To the maximum extent permitted by law:

Veridia is not liable for:

* AI inaccuracies
* Academic consequences
* Data loss
* Service interruptions

Use the Service at your own risk.

---

## 12. Governing Law

These Terms are governed by the laws of the State of New Jersey, United States.

Any disputes shall be resolved in courts located in New Jersey.

---

## 13. Termination

We may suspend or terminate access if you violate these Terms.

---

## 14. Changes to Terms

We may update these Terms at any time. Continued use constitutes acceptance.

---

## 15. Contact

[VeridiaSupport@gmail.com](mailto:VeridiaSupport@gmail.com)
`;

const acceptableUsePolicyContent = `**Acceptable Use Policy**

You agree NOT to use Veridia to:

* Engage in academic dishonesty or cheating
* Upload copyrighted material without permission
* Input sensitive personal, medical, or confidential data
* Use the Service for professional engineering, medical, or legal decisions
* Attempt to bypass AI safety systems ("jailbreaking")

Violation may result in suspension or termination.
`;

const accessibilityStatementContent = `**Accessibility Statement**

Veridia is committed to making its platform accessible to all users.

We strive to meet WCAG 2.1 accessibility standards.

If you experience accessibility issues, please contact:

[VeridiaSupport@gmail.com](mailto:VeridiaSupport@gmail.com)

We will work to address issues promptly.
`;

export const LEGAL_DOCUMENTS: Record<LegalDocumentKey, LegalDocument> = {
  privacy: {
    key: "privacy",
    title: "Privacy Policy",
    fileName: "Veridia-Privacy-Policy.txt",
    content: privacyPolicyContent,
    downloadable: true,
  },
  terms: {
    key: "terms",
    title: "Terms of Service",
    fileName: "Veridia-Terms-of-Service.txt",
    content: termsOfServiceContent,
    downloadable: true,
  },
  aup: {
    key: "aup",
    title: "Acceptable Use Policy",
    fileName: "Veridia-Acceptable-Use-Policy.txt",
    content: acceptableUsePolicyContent,
    downloadable: true,
  },
  accessibility: {
    key: "accessibility",
    title: "Accessibility Statement",
    fileName: "Veridia-Accessibility-Statement.txt",
    content: accessibilityStatementContent,
    downloadable: true,
  },
};

export const FOOTER_LEGAL_DOCUMENTS: LegalDocumentKey[] = ["privacy", "terms", "aup", "accessibility"];
