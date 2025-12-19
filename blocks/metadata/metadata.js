/**
 * Metadata Block
 * Extracts page metadata and hides the block from view
 */
export default function decorate(block) {
  // Extract metadata from block rows
  const meta = {};
  [...block.children].forEach((row) => {
    if (row.children.length >= 2) {
      const key = row.children[0].textContent.trim();
      const value = row.children[1].textContent.trim();
      if (key && value) {
        meta[key] = value;
      }
    }
  });

  // Set document title if provided
  if (meta.title) {
    document.title = meta.title;
  }

  // Set meta tags
  Object.entries(meta).forEach(([key, value]) => {
    if (key === 'title') return; // Already handled

    // Check for existing meta tag
    let metaTag = document.querySelector(`meta[name="${key}"], meta[property="${key}"]`);

    if (!metaTag) {
      metaTag = document.createElement('meta');
      // Use property for og: tags, name for others
      if (key.startsWith('og:')) {
        metaTag.setAttribute('property', key);
      } else {
        metaTag.setAttribute('name', key);
      }
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', value);
  });

  // Hide the metadata block from view
  block.closest('.section').style.display = 'none';
}
