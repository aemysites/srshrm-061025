/**
 * News List Block - NSW Government Design System
 * Two-column layout: Image left, News content right
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create main wrapper with two-column layout
  const wrapper = document.createElement('div');
  wrapper.className = 'news-list-wrapper';

  // Create image column (left)
  const imageCol = document.createElement('div');
  imageCol.className = 'news-list-image';

  // Create content column (right)
  const contentCol = document.createElement('div');
  contentCol.className = 'news-list-content';

  // Create table for news items
  const table = document.createElement('table');
  table.className = 'news-list-table';

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const titleHeader = document.createElement('th');
  titleHeader.textContent = 'Title';
  const dateHeader = document.createElement('th');
  dateHeader.textContent = 'Date';
  headerRow.appendChild(titleHeader);
  headerRow.appendChild(dateHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');

  // CTA link placeholder
  let ctaLink = null;

  rows.forEach((row) => {
    const cells = row.querySelectorAll(':scope > div');
    const firstCell = cells[0];

    // Check for image (first row)
    const picture = firstCell?.querySelector('picture');
    if (picture) {
      imageCol.appendChild(picture);
      return;
    }

    // Check for heading (second row)
    const heading = firstCell?.querySelector('h2');
    if (heading) {
      contentCol.appendChild(heading);
      return;
    }

    // Check for CTA link (last row - single link without date)
    const links = firstCell?.querySelectorAll('a');
    const hasDate = cells.length >= 2 && cells[1]?.textContent.trim();

    if (links?.length === 1 && !hasDate) {
      // This is the CTA link
      ctaLink = links[0].cloneNode(true);
      ctaLink.className = 'news-list-cta';
      return;
    }

    // News item row (link + date)
    if (cells.length >= 2) {
      const titleCell = cells[0];
      const dateCell = cells[1];
      const link = titleCell.querySelector('a');
      const date = dateCell.textContent.trim();

      if (link && date) {
        const tr = document.createElement('tr');

        const tdTitle = document.createElement('td');
        const newsLink = document.createElement('a');
        newsLink.href = link.href;
        newsLink.className = 'news-list-link';
        newsLink.textContent = link.textContent;
        tdTitle.appendChild(newsLink);

        const tdDate = document.createElement('td');
        tdDate.className = 'news-list-date';
        tdDate.textContent = date;

        tr.appendChild(tdTitle);
        tr.appendChild(tdDate);
        tbody.appendChild(tr);
      }
    }
  });

  table.appendChild(tbody);
  contentCol.appendChild(table);

  // Add CTA link if exists
  if (ctaLink) {
    contentCol.appendChild(ctaLink);
  }

  // Build final structure
  wrapper.appendChild(imageCol);
  wrapper.appendChild(contentCol);

  // Clear and rebuild block
  block.textContent = '';
  block.appendChild(wrapper);
}
