/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the specified header row
  // Header row must span 2 columns
  const rows = [];

  // Create header with colspan=2
  const header = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('colspan', '2');
  th.textContent = 'Accordion (accordion4)';
  header.appendChild(th);
  rows.push(header);

  // Find all .faqAns1 blocks inside the element (which contain accordion items)
  const faqSections = element.querySelectorAll('.faqAns1');
  faqSections.forEach(faqSection => {
    // Each .faqAns1 contains a sequence: h3.insideFaqQue, div.insideFaqAns (pairs)
    const children = Array.from(faqSection.children);
    for (let i = 0; i < children.length; i++) {
      const titleEl = children[i];
      if (titleEl.tagName === 'H3' && titleEl.classList.contains('insideFaqQue')) {
        // Remove icon span from title
        const titleClone = titleEl.cloneNode(true);
        Array.from(titleClone.querySelectorAll('span')).forEach((span) => span.remove());
        const answerEl = children[i + 1];
        if (answerEl && answerEl.classList.contains('insideFaqAns')) {
          // Create row with 2 cells
          const row = document.createElement('tr');
          const td1 = document.createElement('td');
          const td2 = document.createElement('td');
          td1.appendChild(titleClone);
          td2.appendChild(answerEl.cloneNode(true));
          row.appendChild(td1);
          row.appendChild(td2);
          rows.push(row);
          i++; // skip answer
        }
      }
    }
  });

  // Build table only if there are any items
  if (rows.length > 1) {
    const table = document.createElement('table');
    rows.forEach(row => table.appendChild(row));
    element.replaceWith(table);
  }
}
