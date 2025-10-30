// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // Check if this is a nested block pattern (empty controller block)
  // In nested pattern, tab sections come before the controller block
  const isNestedPattern = block.children.length === 0 ||
    (block.children.length === 1 && !block.children[0].textContent.trim());

  if (isNestedPattern) {
    // Handle nested block pattern: find all sections with parent-block metadata
    const mainElement = block.closest('main');
    if (!mainElement) return;

    // Find all sections that contain cards-recipe blocks and h2 headings
    // These are the tab sections (EDS has already processed and removed section-metadata)
    const tabSections = [];
    const allSections = mainElement.querySelectorAll('main > .section');

    // Get the index of the tabs-recipe container block
    const tabsContainer = block.closest('.section');
    const tabsContainerIndex = Array.from(allSections).indexOf(tabsContainer);

    // Find all sections BEFORE the tabs-recipe that contain cards-recipe
    allSections.forEach((section, index) => {
      // Only look at sections before the tabs-recipe controller
      if (index < tabsContainerIndex) {
        const hasCardsRecipe = section.querySelector('.cards-recipe');
        const hasHeading = section.querySelector('h2, h3, h4');

        // If section has both cards-recipe and a heading, it's a tab section
        if (hasCardsRecipe && hasHeading) {
          tabSections.push(section);
        }
      }
    });

    if (tabSections.length === 0) return;

    // Build tablist
    const tablist = document.createElement('div');
    tablist.className = 'tabs-list';
    tablist.setAttribute('role', 'tablist');

    // Process each tab section
    tabSections.forEach((section, i) => {
      // Get the heading (tab label)
      const heading = section.querySelector('h2, h3, h4');
      if (!heading) return;

      const tabLabel = heading.textContent.trim();
      const id = toClassName(tabLabel);

      // Convert section to tabpanel
      section.className = 'tabs-panel';
      section.id = `tabpanel-${id}`;
      section.setAttribute('aria-hidden', !!i);
      section.setAttribute('aria-labelledby', `tab-${id}`);
      section.setAttribute('role', 'tabpanel');

      // Remove the heading and metadata div
      heading.remove();
      const metadataDiv = section.querySelector('.section-metadata');
      if (metadataDiv) metadataDiv.remove();

      // Build tab button
      const button = document.createElement('button');
      button.className = 'tabs-tab';
      button.id = `tab-${id}`;
      button.textContent = tabLabel;
      button.setAttribute('aria-controls', `tabpanel-${id}`);
      button.setAttribute('aria-selected', !i);
      button.setAttribute('role', 'tab');
      button.setAttribute('type', 'button');

      button.addEventListener('click', () => {
        // Hide all panels
        tabSections.forEach((s) => s.setAttribute('aria-hidden', true));
        // Deselect all buttons
        tablist.querySelectorAll('button').forEach((btn) => {
          btn.setAttribute('aria-selected', false);
        });
        // Show selected panel and button
        section.setAttribute('aria-hidden', false);
        button.setAttribute('aria-selected', true);
      });

      tablist.append(button);
    });

    // Replace the empty controller block with tablist
    block.innerHTML = '';
    block.append(tablist);

    // Move all tabpanels INSIDE the tabs-recipe block (not as siblings)
    tabSections.forEach((section) => {
      block.append(section);
    });

  } else {
    // Handle standard table-based pattern (fallback)
    const tablist = document.createElement('div');
    tablist.className = 'tabs-list';
    tablist.setAttribute('role', 'tablist');

    const tabs = [...block.children].map((child) => child.firstElementChild);
    tabs.forEach((tab, i) => {
      const id = toClassName(tab.textContent);

      const tabpanel = block.children[i];
      tabpanel.className = 'tabs-panel';
      tabpanel.id = `tabpanel-${id}`;
      tabpanel.setAttribute('aria-hidden', !!i);
      tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
      tabpanel.setAttribute('role', 'tabpanel');

      const button = document.createElement('button');
      button.className = 'tabs-tab';
      button.id = `tab-${id}`;

      moveInstrumentation(tab.parentElement, tabpanel.lastElementChild);
      button.innerHTML = tab.innerHTML;

      button.setAttribute('aria-controls', `tabpanel-${id}`);
      button.setAttribute('aria-selected', !i);
      button.setAttribute('role', 'tab');
      button.setAttribute('type', 'button');
      button.addEventListener('click', () => {
        block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
          panel.setAttribute('aria-hidden', true);
        });
        tablist.querySelectorAll('button').forEach((btn) => {
          btn.setAttribute('aria-selected', false);
        });
        tabpanel.setAttribute('aria-hidden', false);
        button.setAttribute('aria-selected', true);
      });
      tablist.append(button);
      tab.remove();
      moveInstrumentation(button.querySelector('p'), null);
    });

    block.prepend(tablist);
  }
}