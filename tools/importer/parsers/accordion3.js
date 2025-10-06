/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create section breaks
  const hrStart = document.createElement('hr');
  const hrEnd = document.createElement('hr');

  // Step 2: Create content section container for child blocks
  const contentSection = document.createElement('div');
  contentSection.className = 'parent-block-content';
  // Add helpful comment for child block processing
  contentSection.appendChild(document.createComment('Child accordion blocks will be inserted here'));

  // Step 3: Create Section Metadata table with proper <thead> and <tbody>
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header row
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Section Metadata';
  headerRow.appendChild(headerCell);
  thead.appendChild(headerRow);

  // Data row
  const row = document.createElement('tr');
  const key = document.createElement('td');
  const value = document.createElement('td');
  key.textContent = 'block';
  value.textContent = 'accordion3';
  row.appendChild(key);
  row.appendChild(value);
  tbody.appendChild(row);

  table.appendChild(thead);
  table.appendChild(tbody);

  // Step 4: Replace original element with new structure
  element.replaceWith(
    hrStart,
    contentSection,
    table,
    hrEnd
  );
}
