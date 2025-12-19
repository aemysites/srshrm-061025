/**
 * Block Links Block - Complex grid of link cards and images
 * NSW Government Design System - DCJ Learn About section
 * Pixel-perfect implementation matching https://dcj.nsw.gov.au/
 */

/**
 * Get color variant class based on link text content
 * Maps specific links to their designated background colors
 */
function getColorVariant(linkText) {
  const text = linkText.toLowerCase().trim();

  // Dark blue cards (white text) - Our ministers only
  if (text.includes('our ministers')) {
    return 'block-links-blue';
  }

  // Light blue - Who we are
  if (text.includes('who we are')) {
    return 'block-links-lightblue';
  }

  // Light grey cards - Easy Read
  if (text.includes('easy read')) {
    return 'block-links-grey-light';
  }

  // Slightly darker grey - Family and community insights
  if (text.includes('family') && text.includes('community')) {
    return 'block-links-grey';
  }

  // Pink card - Resource centre
  if (text.includes('resource centre')) {
    return 'block-links-pink';
  }

  // Default light blue
  return 'block-links-lightblue';
}

export default function decorate(block) {
  const rows = [...block.children];

  // Create grid container
  const grid = document.createElement('div');
  grid.classList.add('block-links-grid');

  let itemIndex = 0;
  let isFirstImage = true;

  rows.forEach((row) => {
    const cols = [...row.children];

    cols.forEach((col) => {
      // Skip empty cells
      if (!col.textContent.trim() && !col.querySelector('picture')) {
        return;
      }

      const item = document.createElement('div');
      item.classList.add('block-links-item');

      const picture = col.querySelector('picture');
      const link = col.querySelector('a');

      if (picture && !link) {
        // Image-only card
        item.classList.add('block-links-image');

        // First image is the feature image (spans 2x2)
        if (isFirstImage) {
          item.classList.add('block-links-feature');
          isFirstImage = false;
        }

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('block-links-image-wrapper');
        imageWrapper.appendChild(picture.cloneNode(true));
        item.appendChild(imageWrapper);
      } else if (link) {
        // Link card with color variant
        item.classList.add('block-links-link');

        const linkText = link.textContent.trim();
        const colorClass = getColorVariant(linkText);
        item.classList.add(colorClass);

        const cardLink = document.createElement('a');
        cardLink.href = link.getAttribute('href');
        cardLink.classList.add('block-links-card');

        // Check for external link
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          try {
            const url = new URL(href);
            if (!url.hostname.includes('dcj.nsw.gov.au') && !url.hostname.includes('nsw.gov.au')) {
              cardLink.classList.add('block-links-external');
              cardLink.setAttribute('target', '_blank');
              cardLink.setAttribute('rel', 'noopener noreferrer');
            }
          } catch (e) {
            // Invalid URL
          }
        }

        const titleEl = document.createElement('span');
        titleEl.classList.add('block-links-title');
        titleEl.textContent = linkText;
        cardLink.appendChild(titleEl);

        // Add arrow icon
        const arrow = document.createElement('span');
        arrow.classList.add('block-links-arrow');
        arrow.setAttribute('aria-hidden', 'true');
        cardLink.appendChild(arrow);

        item.appendChild(cardLink);
      }

      if (item.children.length > 0) {
        grid.appendChild(item);
        itemIndex++;
      }
    });
  });

  // Clear block and add grid
  block.textContent = '';
  block.appendChild(grid);
}