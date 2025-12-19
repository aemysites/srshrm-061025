/**
 * Hero DCJ Block - Two-column hero with helpline panel
 * NSW Government Department of Communities and Justice styling
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Create the main structure
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-dcj-wrapper';

  // Left column (main content)
  const leftCol = document.createElement('div');
  leftCol.className = 'hero-dcj-content';

  // Right column (helpline)
  const rightCol = document.createElement('div');
  rightCol.className = 'hero-dcj-helpline';

  // Process each row
  let inHelpline = false;
  const helplineItems = [];

  rows.forEach((row) => {
    const cell = row.querySelector('div');
    if (!cell) return;

    // Check for h1 (main title)
    const h1 = cell.querySelector('h1');
    if (h1) {
      const title = document.createElement('h1');
      title.className = 'hero-dcj-title';
      title.textContent = h1.textContent;
      leftCol.appendChild(title);
      return;
    }

    // Check for h3 (helpline title - switches context to helpline)
    const h3 = cell.querySelector('h3');
    if (h3) {
      inHelpline = true;
      const title = document.createElement('h3');
      title.className = 'hero-dcj-helpline-title';
      title.textContent = h3.textContent;
      rightCol.appendChild(title);
      return;
    }

    // Check for list items (helpline phone numbers)
    const ul = cell.querySelector('ul');
    if (ul && inHelpline) {
      const li = ul.querySelector('li');
      if (li) {
        helplineItems.push(li.innerHTML);
      }
      return;
    }

    // Plain text (description) - only if not in helpline section
    const text = cell.textContent.trim();
    if (text && !inHelpline && !cell.querySelector('h1, h2, h3, ul')) {
      const desc = document.createElement('p');
      desc.className = 'hero-dcj-description';
      desc.innerHTML = cell.innerHTML;
      leftCol.appendChild(desc);
    }
  });

  // Create helpline list
  if (helplineItems.length > 0) {
    const list = document.createElement('ul');
    list.className = 'hero-dcj-helpline-list';

    helplineItems.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = item;

      // Style phone links
      const phoneLink = li.querySelector('a[href^="tel:"]');
      if (phoneLink) {
        phoneLink.className = 'hero-dcj-phone-link';
      }

      list.appendChild(li);
    });

    rightCol.appendChild(list);
  }

  // Assemble the structure
  wrapper.appendChild(leftCol);
  wrapper.appendChild(rightCol);

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(wrapper);
}
