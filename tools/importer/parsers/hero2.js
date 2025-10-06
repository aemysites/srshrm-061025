/* global WebImporter */
export default function parse(element, { document }) {
  // Gather direct children for robust selection
  const children = Array.from(element.children);

  // Find the image - should be referenced directly
  const img = children.find((el) => el.tagName === 'IMG');

  // Find the main content div containing headings/subheading
  const contentDiv = children.find((el) => el.tagName === 'DIV');

  let heading = null, subheading = null, divider = null;
  if (contentDiv) {
    heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    subheading = contentDiv.querySelector('p');
    // The divider (optional decorative element)
    divider = contentDiv.querySelector('span');
  }

  // Compose table rows as per requirements
  const headerRow = ['Hero (hero2)'];
  const imageRow = [img ? img : ''];

  // Compose the content cell strictly from referenced elements
  const contentCellElements = [];
  if (heading) contentCellElements.push(heading);
  if (subheading) contentCellElements.push(subheading);
  if (divider) contentCellElements.push(divider);

  const contentRow = [contentCellElements];

  // Ensure all rows created, preserve semantic and dynamic extraction
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
