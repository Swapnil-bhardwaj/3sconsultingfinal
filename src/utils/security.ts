/**
 * Security Utilities for 3Sconsulting Application
 * Provides input sanitization, safe URL verification, and XSS prevention.
 */

export function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/javascript:[^\s"']*/gi, "")
    .trim();
}

export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  
  // Reject dangerous pseudo-protocols
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:text/html") ||
    trimmed.startsWith("vbscript:")
  ) {
    return false;
  }

  // Allow relative paths, standard protocols, or safe image data URIs
  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("data:image/")
  );
}

export function sanitizeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
