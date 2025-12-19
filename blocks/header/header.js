/**
 * Header Block - NSW Government Design System
 * Pixel-perfect implementation matching DCJ.NSW.GOV.AU
 */

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// SVG Icons
const icons = {
  home: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>`,

  hamburger: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  speaker: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>`,

  play: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5v14l11-7z"/>
  </svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2.5"/>
    <path d="M16 16l4 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  globe: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" stroke-width="2"/>
    <path d="M3 12h18" stroke="currentColor" stroke-width="2"/>
  </svg>`,

  chevronDown: `<svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  chevronDownSmall: `<svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};

// Media query for desktop
const isDesktop = window.matchMedia('(min-width: 992px)');

/**
 * Creates the top bar section
 * @param {Object} config - Configuration object
 * @returns {HTMLElement}
 */
function createTopBar(config) {
  const { govText, homeUrl, listenUrl } = config;
  const topBar = document.createElement('div');
  topBar.className = 'nav-top-bar';

  topBar.innerHTML = `
    <div class="nav-top-bar-inner">
      <p class="gov-text">${govText}</p>
      <div class="top-actions">
        <a href="${homeUrl}" class="top-action-btn home-btn" aria-label="Home">
          ${icons.home}
        </a>
        <button type="button" class="nav-hamburger" aria-label="Open menu" aria-expanded="false">
          ${icons.hamburger}
        </button>
        <a href="${listenUrl}" class="top-action-btn listen-btn" target="_blank" rel="noopener">
          ${icons.speaker}
          <span class="listen-text">Listen</span>
          <span class="play-icon">${icons.play}</span>
        </a>
      </div>
    </div>
  `;

  return topBar;
}

/**
 * Creates the brand section
 * @param {Object} config - Configuration object
 * @returns {HTMLElement}
 */
function createBrandSection(config) {
  const { logoElement, brandText, homeUrl } = config;
  const brandSection = document.createElement('div');
  brandSection.className = 'nav-brand-section';

  const brandInner = document.createElement('div');
  brandInner.className = 'nav-brand-inner';

  // Brand link with logo and text
  const brandLink = document.createElement('a');
  brandLink.href = homeUrl;
  brandLink.className = 'nav-brand';
  brandLink.setAttribute('aria-label', `${brandText} - Home`);

  // Add logo if available
  if (logoElement) {
    const logoContainer = document.createElement('div');
    logoContainer.className = 'nav-brand-logo';
    const clonedLogo = logoElement.cloneNode(true);
    // Make sure images in the logo load eagerly
    const imgs = clonedLogo.querySelectorAll('img');
    imgs.forEach((img) => {
      img.setAttribute('loading', 'eager');
    });
    logoContainer.appendChild(clonedLogo);
    brandLink.appendChild(logoContainer);
  }

  const brandTextEl = document.createElement('span');
  brandTextEl.className = 'nav-brand-text';
  brandTextEl.textContent = brandText;
  brandLink.appendChild(brandTextEl);

  // Tools section (search and language)
  const tools = document.createElement('div');
  tools.className = 'nav-brand-tools';

  tools.innerHTML = `
    <button type="button" class="nav-brand-tool-btn search-btn" aria-label="Search">
      ${icons.search}
    </button>
    <button type="button" class="nav-brand-tool-btn language-btn" aria-label="Select language" aria-expanded="false">
      ${icons.globe}
      <span>Language</span>
      ${icons.chevronDownSmall}
    </button>
  `;

  brandInner.appendChild(brandLink);
  brandInner.appendChild(tools);
  brandSection.appendChild(brandInner);

  return brandSection;
}

/**
 * Creates the main navigation section
 * @param {HTMLElement} navList - The navigation ul element
 * @returns {HTMLElement}
 */
function createMainNav(navList) {
  const mainNav = document.createElement('nav');
  mainNav.className = 'nav-main';
  mainNav.setAttribute('aria-label', 'Main navigation');

  const navInner = document.createElement('div');
  navInner.className = 'nav-main-inner';

  const menu = document.createElement('ul');
  menu.className = 'nav-menu';
  menu.setAttribute('role', 'menubar');

  if (navList) {
    const items = navList.querySelectorAll(':scope > li');
    items.forEach((item) => {
      const menuItem = document.createElement('li');
      menuItem.className = 'nav-menu-item';
      menuItem.setAttribute('role', 'none');
      menuItem.setAttribute('aria-expanded', 'false');

      // Get the first text node or strong element for the label
      const strongEl = item.querySelector(':scope > strong');
      const linkEl = item.querySelector(':scope > a');
      let labelText = '';
      let linkHref = '#';

      if (strongEl) {
        labelText = strongEl.textContent.trim();
      } else if (linkEl) {
        labelText = linkEl.textContent.trim();
        linkHref = linkEl.href;
      } else {
        // Get direct text content
        labelText = item.childNodes[0]?.textContent?.trim() || item.textContent.trim();
      }

      const menuLink = document.createElement('a');
      menuLink.className = 'nav-menu-link';
      menuLink.setAttribute('role', 'menuitem');
      menuLink.href = linkHref;

      menuLink.innerHTML = `
        <span>${labelText}</span>
        ${icons.chevronDown}
      `;

      menuItem.appendChild(menuLink);

      // Check for submenu
      const subList = item.querySelector('ul');
      if (subList) {
        menuLink.setAttribute('aria-haspopup', 'true');
        const dropdown = document.createElement('div');
        dropdown.className = 'nav-dropdown';
        dropdown.setAttribute('role', 'menu');

        subList.querySelectorAll('li').forEach((subItem) => {
          const subLink = subItem.querySelector('a');
          if (subLink) {
            const dropdownLink = subLink.cloneNode(true);
            dropdownLink.className = 'nav-dropdown-link';
            dropdownLink.setAttribute('role', 'menuitem');
            dropdown.appendChild(dropdownLink);
          }
        });

        menuItem.appendChild(dropdown);
      }

      menu.appendChild(menuItem);
    });
  }

  navInner.appendChild(menu);
  mainNav.appendChild(navInner);

  return mainNav;
}

/**
 * Toggle mobile menu
 * @param {HTMLElement} block - The block element
 * @param {boolean} [forceState] - Force open (true) or close (false)
 */
function toggleMobileMenu(block, forceState) {
  const hamburger = block.querySelector('.nav-hamburger');
  if (!hamburger) return;

  const isOpen = block.getAttribute('data-nav-open') === 'true';
  const newState = forceState !== undefined ? forceState : !isOpen;

  block.setAttribute('data-nav-open', newState ? 'true' : 'false');
  hamburger.setAttribute('aria-expanded', newState ? 'true' : 'false');
  hamburger.setAttribute('aria-label', newState ? 'Close menu' : 'Open menu');
  hamburger.innerHTML = newState ? icons.close : icons.hamburger;

  // Prevent body scroll when menu is open
  document.body.style.overflow = newState && !isDesktop.matches ? 'hidden' : '';
}

/**
 * Toggle dropdown menu
 * @param {HTMLElement} menuItem - The menu item element
 * @param {HTMLElement} navMain - The nav-main element
 * @param {boolean} [forceState] - Force open (true) or close (false)
 */
function toggleDropdown(menuItem, navMain, forceState) {
  const isOpen = menuItem.getAttribute('aria-expanded') === 'true';
  const newState = forceState !== undefined ? forceState : !isOpen;

  // Close all other dropdowns first
  navMain.querySelectorAll('.nav-menu-item').forEach((item) => {
    if (item !== menuItem) {
      item.setAttribute('aria-expanded', 'false');
    }
  });

  menuItem.setAttribute('aria-expanded', newState ? 'true' : 'false');
}

/**
 * Parse fragment content to extract header data
 * @param {DocumentFragment} fragment - The loaded fragment
 * @returns {Object} Parsed header configuration
 */
function parseFragmentContent(fragment) {
  const config = {
    govText: 'A NSW Government website',
    homeUrl: '/',
    listenUrl: '#',
    logoElement: null,
    brandText: 'Communities and Justice',
    navList: null,
  };

  // Get all section divs from fragment
  const sections = fragment.querySelectorAll(':scope > div');

  // First section: top bar content
  if (sections[0]) {
    const paragraphs = sections[0].querySelectorAll('p');
    paragraphs.forEach((p) => {
      const text = p.textContent.trim().toLowerCase();
      const link = p.querySelector('a');

      if (text.includes('nsw government')) {
        config.govText = p.textContent.trim();
      } else if (link && text.includes('home')) {
        config.homeUrl = link.href || '/';
      } else if (link && text.includes('listen')) {
        config.listenUrl = link.href || '#';
      }
    });
  }

  // Second section: brand content
  if (sections[1]) {
    const picture = sections[1].querySelector('picture');
    if (picture) {
      config.logoElement = picture;
    }

    // Find the brand text (usually in a strong tag or second paragraph)
    const paragraphs = sections[1].querySelectorAll('p');
    paragraphs.forEach((p) => {
      const strong = p.querySelector('strong');
      const text = (strong || p).textContent.trim();
      // Skip if this paragraph contains the picture
      if (!p.querySelector('picture') && text && text.length > 0) {
        config.brandText = text;
      }
    });
  }

  // Third section: navigation
  if (sections[2]) {
    config.navList = sections[2].querySelector('ul');
  }

  return config;
}

/**
 * Loads and decorates the header
 * @param {HTMLElement} block - The header block element
 */
export default async function decorate(block) {
  // Load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // Parse the fragment content
  const config = parseFragmentContent(fragment);

  // Clear the block
  block.textContent = '';
  block.setAttribute('data-nav-open', 'false');

  // Create the header structure
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const topBar = createTopBar(config);
  const brandSection = createBrandSection(config);
  const mainNav = createMainNav(config.navList);

  navWrapper.appendChild(topBar);
  navWrapper.appendChild(brandSection);
  navWrapper.appendChild(mainNav);
  block.appendChild(navWrapper);

  // Event listeners
  const hamburger = topBar.querySelector('.nav-hamburger');
  hamburger.addEventListener('click', () => toggleMobileMenu(block));

  // Dropdown interactions
  mainNav.querySelectorAll('.nav-menu-item').forEach((menuItem) => {
    const menuLink = menuItem.querySelector('.nav-menu-link');

    menuLink.addEventListener('click', (e) => {
      const hasDropdown = menuItem.querySelector('.nav-dropdown');
      if (hasDropdown || menuLink.getAttribute('href') === '#') {
        e.preventDefault();
        toggleDropdown(menuItem, mainNav);
      }
    });

    // Keyboard navigation
    menuLink.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (menuItem.querySelector('.nav-dropdown')) {
          e.preventDefault();
          toggleDropdown(menuItem, mainNav);
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target)) {
      mainNav.querySelectorAll('.nav-menu-item').forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mainNav.querySelectorAll('.nav-menu-item').forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
      });
      if (!isDesktop.matches) {
        toggleMobileMenu(block, false);
      }
    }
  });

  // Handle window resize
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) {
      toggleMobileMenu(block, false);
    }
  });
}
