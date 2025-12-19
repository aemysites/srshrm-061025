/**
 * Cards Horizontal Block - Side-by-side cards with image and content
 * NSW Government Design System styling
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create cards container
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-horizontal-grid');

  rows.forEach((row) => {
    const cols = [...row.children];

    // Each row becomes a card
    const card = document.createElement('div');
    card.classList.add('cards-horizontal-card');

    if (cols.length >= 2) {
      // First column is image
      const imageCol = cols[0];
      const contentCol = cols[1];

      // Process image
      const picture = imageCol.querySelector('picture');
      if (picture) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('cards-horizontal-image');
        imageWrapper.appendChild(picture.cloneNode(true));
        card.appendChild(imageWrapper);
      }

      // Process content
      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('cards-horizontal-content');

      // Find title (first link or heading)
      const titleLink = contentCol.querySelector('a');
      const heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');

      if (titleLink || heading) {
        const titleEl = document.createElement('div');
        titleEl.classList.add('cards-horizontal-title');

        if (titleLink) {
          const link = titleLink.cloneNode(true);
          titleEl.appendChild(link);

          // Check for external link
          const href = titleLink.getAttribute('href');
          if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            try {
              const url = new URL(href);
              if (!url.hostname.includes('dcj.nsw.gov.au') && !url.hostname.includes('nsw.gov.au')) {
                link.classList.add('cards-horizontal-external');
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');

                // Add external icon
                const icon = document.createElement('span');
                icon.classList.add('cards-horizontal-external-icon');
                icon.setAttribute('aria-hidden', 'true');
                link.appendChild(icon);
              }
            } catch (e) {
              // Invalid URL
            }
          }

          // Make entire card clickable
          card.setAttribute('data-href', titleLink.getAttribute('href'));
          card.classList.add('cards-horizontal-clickable');
        } else if (heading) {
          titleEl.textContent = heading.textContent;
        }

        contentWrapper.appendChild(titleEl);
      }

      // Find description (paragraph text that's not in a link)
      const paragraphs = contentCol.querySelectorAll('p');
      paragraphs.forEach((p) => {
        // Skip if paragraph only contains the link we already processed
        if (!p.querySelector('a') || p.textContent.trim() !== p.querySelector('a')?.textContent.trim()) {
          const desc = document.createElement('div');
          desc.classList.add('cards-horizontal-description');
          desc.textContent = p.textContent;
          contentWrapper.appendChild(desc);
        }
      });

      // Add arrow icon
      const arrow = document.createElement('span');
      arrow.classList.add('cards-horizontal-arrow');
      arrow.setAttribute('aria-hidden', 'true');
      contentWrapper.appendChild(arrow);

      card.appendChild(contentWrapper);
    }

    cardsContainer.appendChild(card);
  });

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(cardsContainer);

  // Add click handler for cards
  block.querySelectorAll('.cards-horizontal-clickable').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        const href = card.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        }
      }
    });
  });
}