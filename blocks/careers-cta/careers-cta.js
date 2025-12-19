/**
 * Careers CTA Block - NSW Government Design System
 * Pixel-perfect implementation matching https://dcj.nsw.gov.au/
 */
export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];

  // Create the card structure
  const card = document.createElement('div');
  card.className = 'careers-cta-card';

  // Create content wrapper (left side)
  const content = document.createElement('div');
  content.className = 'careers-cta-content';

  // Create image wrapper (right side)
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'careers-cta-image';

  // Process each row - single column structure
  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;

    // Check if cell contains a picture/image
    const picture = cell.querySelector('picture');
    if (picture) {
      imageWrapper.appendChild(picture);
      return;
    }

    // Check for standalone link (CTA button)
    const links = cell.querySelectorAll('a');
    const hasOnlyLink = cell.children.length === 1 && links.length === 1 && cell.querySelector('p a');
    if (hasOnlyLink || (cell.textContent.trim() === links[0]?.textContent.trim() && links.length === 1)) {
      const link = links[0];
      link.classList.add('careers-cta-button');
      content.appendChild(link.parentElement || link);
      return;
    }

    // Move all other content (h3, p) to content area
    while (cell.firstChild) {
      content.appendChild(cell.firstChild);
    }
  });

  // Clear and rebuild block structure
  block.textContent = '';
  card.appendChild(content);
  card.appendChild(imageWrapper);
  block.appendChild(card);
}
