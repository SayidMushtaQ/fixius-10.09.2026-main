export function transliterateUrl(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Collapse multiple dashes
}

export function encodeSitemapUrl(url: string) {
  // First URL encode the string
  const urlEncoded = encodeURIComponent(url);

  // Then XML escape any remaining special characters
  return urlEncoded
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
