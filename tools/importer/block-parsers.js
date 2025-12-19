/**
 * Block Parsers for DCJ NSW Government Import
 * These parsers extract content from source HTML and convert to EDS block format
 */

/**
 * Parse Hero DCJ block
 * @param {Element} element - The hero element from source HTML
 * @returns {Object} Block data for markdown generation
 */
export function parseHeroDcj(element) {
  const title = element.querySelector('h1')?.textContent?.trim() || '';
  const description = element.querySelector('p')?.textContent?.trim() || '';

  // Extract helpline items
  const helplineItems = [];
  const listItems = element.querySelectorAll('.hero-helpline li, .need-help li, ul li');
  listItems.forEach((li) => {
    const text = li.textContent?.trim();
    const link = li.querySelector('a[href^="tel:"]');
    if (text && link) {
      helplineItems.push({
        text: text.replace(link.textContent, '').trim(),
        phone: link.textContent?.trim(),
        href: link.getAttribute('href')
      });
    }
  });

  return {
    blockName: 'hero-dcj',
    content: {
      title,
      description,
      helplineTitle: 'Need help now?',
      helplineItems
    }
  };
}

/**
 * Parse Quick Links block
 * @param {Element} element - The quick links element
 * @returns {Object} Block data for markdown generation
 */
export function parseQuickLinks(element) {
  const heading = element.querySelector('h2')?.textContent?.trim() || '';
  const links = [];

  element.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    const text = link.textContent?.trim();
    const isExternal = href?.startsWith('http') && !href.includes('dcj.nsw.gov.au');

    if (text && href) {
      links.push({ text, href, isExternal });
    }
  });

  return {
    blockName: 'quick-links',
    content: { heading, links }
  };
}

/**
 * Parse Cards Horizontal block
 * @param {Element} element - The cards element
 * @returns {Object} Block data for markdown generation
 */
export function parseCardsHorizontal(element) {
  const cards = [];

  element.querySelectorAll('.nsw-card, [class*="card"]').forEach((card) => {
    const img = card.querySelector('img');
    const titleLink = card.querySelector('.nsw-card__title a, .card-title a, h3 a, h4 a');
    const description = card.querySelector('.nsw-card__copy, .card-description, p')?.textContent?.trim();

    if (titleLink) {
      cards.push({
        image: img?.getAttribute('src') || '',
        imageAlt: img?.getAttribute('alt') || '',
        title: titleLink.textContent?.trim(),
        href: titleLink.getAttribute('href'),
        description,
        isExternal: titleLink.getAttribute('href')?.startsWith('http') &&
                    !titleLink.getAttribute('href')?.includes('dcj.nsw.gov.au')
      });
    }
  });

  return {
    blockName: 'cards-horizontal',
    content: { cards }
  };
}

/**
 * Parse Block Links grid
 * @param {Element} element - The block links element
 * @returns {Object} Block data for markdown generation
 */
export function parseBlockLinks(element) {
  const items = [];

  // Parse feature image
  const featureImg = element.querySelector('.featureImage img, .feature-image img');
  if (featureImg) {
    items.push({
      type: 'feature-image',
      src: featureImg.getAttribute('src'),
      alt: featureImg.getAttribute('alt') || ''
    });
  }

  // Parse link cards
  element.querySelectorAll('.nsw-card__title a, .block-link a').forEach((link) => {
    items.push({
      type: 'link-card',
      title: link.textContent?.trim(),
      href: link.getAttribute('href')
    });
  });

  // Parse image cards
  element.querySelectorAll('.sideImage img, .block-link-image img').forEach((img) => {
    if (!img.closest('.featureImage, .feature-image')) {
      items.push({
        type: 'image-card',
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || ''
      });
    }
  });

  return {
    blockName: 'block-links',
    content: { items }
  };
}

/**
 * Parse News table
 * @param {Element} element - The news section element
 * @returns {Object} Block data for markdown generation
 */
export function parseNewsTable(element) {
  const heading = element.querySelector('h2, .relatedContent-title')?.textContent?.trim() || '';
  const rows = [];

  element.querySelectorAll('table tbody tr').forEach((tr) => {
    const titleCell = tr.querySelector('td:first-child');
    const dateCell = tr.querySelector('td:last-child');
    const link = titleCell?.querySelector('a');

    if (link && dateCell) {
      rows.push({
        title: link.textContent?.trim(),
        href: link.getAttribute('href'),
        date: dateCell.textContent?.trim()
      });
    }
  });

  const ctaLink = element.querySelector('.buttonsubmit_auto a, a.nsw-button');

  return {
    blockName: 'news-table',
    content: {
      heading,
      rows,
      cta: ctaLink ? {
        text: ctaLink.textContent?.trim(),
        href: ctaLink.getAttribute('href')
      } : null
    }
  };
}

export default {
  parseHeroDcj,
  parseQuickLinks,
  parseCardsHorizontal,
  parseBlockLinks,
  parseNewsTable
};
