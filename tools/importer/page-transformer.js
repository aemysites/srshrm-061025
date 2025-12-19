/**
 * Page Transformer for DCJ NSW Government Import
 * Transforms parsed content into EDS-compliant markdown
 */

import {
  parseHeroDcj,
  parseQuickLinks,
  parseCardsHorizontal,
  parseBlockLinks,
  parseNewsTable
} from './block-parsers.js';

/**
 * Transform DCJ homepage content to markdown
 * @param {Document} document - Parsed HTML document
 * @param {Object} metadata - Page metadata
 * @returns {string} EDS-compliant markdown
 */
export function transformDcjHomepage(document, metadata) {
  const sections = [];

  // Add frontmatter
  sections.push(`---
title: ${metadata.title || 'Communities and Justice'}
description: ${metadata.description || ''}
og:image: ${metadata['og:image'] || ''}
template: ${metadata.template || 'dcj-website-home-page'}
---`);

  // Process hero section
  const heroEl = document.querySelector('.hero-banner, .nsw-hero, [class*="hero"]');
  if (heroEl) {
    const heroData = parseHeroDcj(heroEl);
    sections.push(generateHeroMarkdown(heroData));
  }

  // Process sections in order
  const mainContent = document.querySelector('main, #main, .main-content');
  if (mainContent) {
    const sectionEls = mainContent.querySelectorAll('.nsw-section, section');
    sectionEls.forEach((section) => {
      const sectionMarkdown = processSection(section);
      if (sectionMarkdown) {
        sections.push(sectionMarkdown);
      }
    });
  }

  return sections.join('\n\n---\n\n');
}

/**
 * Process a section and return markdown
 */
function processSection(section) {
  // Check for dark background
  const isDark = section.classList.contains('nsw-section--brand-dark');

  // Check for quick links
  const quickLinks = section.querySelector('.button-link-list, [class*="quick-link"]');
  if (quickLinks) {
    const data = parseQuickLinks(section);
    return generateQuickLinksMarkdown(data);
  }

  // Check for horizontal cards
  const horizontalCards = section.querySelector('.nsw-card--horizontal');
  if (horizontalCards) {
    const data = parseCardsHorizontal(section);
    return generateCardsHorizontalMarkdown(data);
  }

  // Check for block links
  const blockLinks = section.querySelector('.block-link-container');
  if (blockLinks) {
    const data = parseBlockLinks(section);
    return generateBlockLinksMarkdown(data);
  }

  // Check for news table
  const newsTable = section.querySelector('.related-content, .relatedContent-title');
  if (newsTable) {
    const data = parseNewsTable(section);
    return generateNewsMarkdown(data);
  }

  // Default section handling
  return null;
}

/**
 * Generate Hero DCJ markdown
 */
function generateHeroMarkdown(data) {
  const { content } = data;
  let md = `| **Hero-DCJ** |
|---|
| # ${content.title} |
| ${content.description} |
| ### ${content.helplineTitle} |`;

  content.helplineItems.forEach((item) => {
    md += `\n| - ${item.text} [${item.phone}](${item.href}) |`;
  });

  return md;
}

/**
 * Generate Quick Links markdown
 */
function generateQuickLinksMarkdown(data) {
  const { content } = data;
  let md = `| **Quick-Links** |
|---|
| ## ${content.heading} |`;

  content.links.forEach((link) => {
    md += `\n| - [${link.text}](${link.href}) |`;
  });

  return md;
}

/**
 * Generate Cards Horizontal markdown
 */
function generateCardsHorizontalMarkdown(data) {
  const { content } = data;
  let md = `| **Cards-Horizontal** |
|---|---|`;

  content.cards.forEach((card) => {
    md += `\n| ![${card.imageAlt}](${card.image}) | [${card.title}](${card.href}) |`;
    md += `\n| | ${card.description} |`;
  });

  return md;
}

/**
 * Generate Block Links markdown
 */
function generateBlockLinksMarkdown(data) {
  const { content } = data;
  let md = `| **Block-Links** |
|---|---|---|---|`;

  // Generate rows based on items
  // This is simplified - actual implementation would need grid logic
  return md;
}

/**
 * Generate News markdown
 */
function generateNewsMarkdown(data) {
  const { content } = data;
  let md = `## ${content.heading}

| Title | Date |
|---|---|`;

  content.rows.forEach((row) => {
    md += `\n| [${row.title}](${row.href}) | ${row.date} |`;
  });

  if (content.cta) {
    md += `\n\n[${content.cta.text}](${content.cta.href})`;
  }

  return md;
}

export default {
  transformDcjHomepage
};
