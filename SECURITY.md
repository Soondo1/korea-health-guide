# Security Measures

This document outlines the security measures implemented in the Korea Health Guide application to protect against common web vulnerabilities.

## Input Validation and Sanitization

All user inputs are validated and sanitized to prevent injection attacks:

- **Form Field Validation**: All form fields are validated for correct format and content, including email addresses, phone numbers, and URLs.
- **Input Sanitization**: DOMPurify is used to sanitize all user inputs and prevent XSS attacks by stripping HTML tags and other potentially dangerous content.
- **Content Length Limits**: All input fields have character limits to prevent buffer overflow and other attacks.

## CSRF Protection

Cross-Site Request Forgery (CSRF) protection is implemented via:

- **CSRF Tokens**: Unique tokens are generated for each user session and included with each form submission.
- **Token Validation**: Tokens are validated before processing any form submissions.
- **Security Headers**: The application sets security headers like `X-CSRF-Token` for API requests.

## Rate Limiting

To prevent abuse and brute force attacks:

- **Request Throttling**: Forms implement rate limiting to prevent too many submissions in a short time period.
- **Exponential Backoff**: Users are given increasing timeouts when rate limits are exceeded.
- **Error Messaging**: Friendly error messages inform users when they've hit rate limits.

## Secure Headers

The application implements secure HTTP headers via Netlify configuration:

- **Content Security Policy (CSP)**: Restricts which resources can be loaded.
- **X-Frame-Options**: Prevents clickjacking attacks by disabling iframe embedding.
- **X-Content-Type-Options**: Prevents MIME type sniffing.
- **Referrer-Policy**: Controls how much referrer information is sent.
- **Permissions-Policy**: Restricts which browser features can be used.

## Environment Variables

Sensitive configuration is managed securely:

- **Environment Files**: `.env` files are used for local development and excluded from version control.
- **Netlify Environment Variables**: Production secrets are stored in Netlify's secure environment variable system.
- **Fallback Mechanisms**: The application has safe fallbacks when environment variables are not available.

## API Security

- **API Proxying**: External API calls (like to NewsAPI) are proxied through Netlify functions to protect API keys.
- **Data Validation**: All API responses are validated before processing.

## Security Redirects

The application enforces security redirects:

- **Forced HTTPS**: All HTTP requests are redirected to HTTPS.
- **Secure Paths**: Sensitive directories are protected with redirects.

## Best Practices for Further Enhancement

- **Regular Updates**: Keep all dependencies up-to-date with security patches.
- **Security Scanning**: Implement regular security scanning of code and dependencies.
- **Server-Side Validation**: Implement server-side validation to complement client-side validation.
- **Authentication**: For protected resources, implement proper authentication with JWT or OAuth.
- **Logging**: Implement security event logging and monitoring.

## Reporting Security Issues

If you discover a security vulnerability, please email soondorob02@gmail.com with details.
Do not disclose security vulnerabilities publicly until they have been addressed by the team.