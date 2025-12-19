/**
 * Quick Links Block - Pill-style button links
 * NSW Government Design System styling
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create structure
  const wrapper = document.createElement('div');
  wrapper.className = 'quick-links-wrapper';

  const linksContainer = document.createElement('ul');
  linksContainer.className = 'quick-links-list';

  rows.forEach((row) => {
    const cell = row.querySelector('div');
    if (!cell) return;

    // Check for heading (h2 element)
    const h2 = cell.querySelector('h2');
    if (h2) {
      const heading = document.createElement('h2');
      heading.className = 'quick-links-heading';
      heading.textContent = h2.textContent;
      wrapper.appendChild(heading);
      return;
    }

    // Check for list item with link
    const ul = cell.querySelector('ul');
    if (ul) {
      const listItem = ul.querySelector('li');
      if (listItem) {
        const link = listItem.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'quick-links-item';

          const a = document.createElement('a');
          a.href = link.href;
          a.className = 'quick-links-button';
          a.textContent = link.textContent;

          // Check for external links
          const href = link.getAttribute('href');
          if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            try {
              const url = new URL(href);
              if (!url.hostname.includes('dcj.nsw.gov.au')) {
                a.classList.add('quick-links-external');
                a.setAttribute('target', '_blank');
                a.setAttribute('rel', 'noopener noreferrer');

                // Add external icon
                const icon = document.createElement('span');
                icon.classList.add('quick-links-external-icon');
                icon.setAttribute('aria-hidden', 'true');
                a.appendChild(icon);
              }
            } catch (e) {
              // Invalid URL, skip
            }
          }

          li.appendChild(a);
          linksContainer.appendChild(li);
        }
      }
    }
  });

  // Assemble
  wrapper.appendChild(linksContainer);

  // Clear and rebuild
  block.textContent = '';
  block.appendChild(wrapper);
}
