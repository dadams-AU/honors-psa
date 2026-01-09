# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static HTML website for Cal State Fullerton's Political Science Honor Societies: Pi Alpha Alpha (Public Administration) and Pi Sigma Alpha (Political Science). The site serves as an information portal and application platform for current and prospective honor society members.

## Architecture & Structure

### Core Website Structure
- **`index.html`**: Landing page with navigation to both honor societies
- **`paa.html`**: Pi Alpha Alpha (Public Administration) society page with embedded application modals
- **`psa.html`**: Pi Sigma Alpha (Political Science) society page with embedded application modals
- **Event pages**: `paa_events.html` and `psa_events.html` for society-specific events
- **Legal pages**: `privacy.html` and `tou.html` (Terms of Use)

### Static Assets
- **`css/`**: Contains `styles.css` (main Bootstrap-based styles) and `cover.css` (landing page styles)
- **`js/`**: Contains `scripts.js` (deadline banner logic and basic interactions)
- **`images/`**: Large collection of society logos, campus photos, and application-related images

### Deployment Structure
- **`_site/`**: GitHub Pages deployment directory containing built/processed versions of all files
- **`_site/CNAME`**: Custom domain configuration for `posc-societies.com`

## Technology Stack

### Frontend Framework
- **Bootstrap 5.2.3**: Primary UI framework loaded via CDN
- **Font Awesome 6.3.0**: Icon library for UI elements
- **Google Fonts**: Custom typography (Montserrat, Roboto Slab, Cinzel, Ubuntu)

### Form Integration
- **Formspree**: Third-party form processing service for membership applications
- **reCaptcha**: Google's spam prevention service integrated with forms
- **Important**: Forms use demonstration API keys that need replacement for production use

### JavaScript Functionality
- Date-based deadline banner control in `scripts.js`
- Bootstrap modal system for application forms and information displays
- Responsive navigation with mobile hamburger menu

## Development Workflow

### Local Development
```bash
# Clone the repository
git clone https://github.com/dadams-AU/honors.git
cd honors

# Open in browser for development
# No build process required - static HTML files
python -m http.server 8000  # For local testing with CORS if needed
```

### File Editing
- HTML files can be edited directly
- CSS changes in `css/styles.css` and `css/cover.css`
- JavaScript modifications in `js/scripts.js`
- Image assets in `images/` directory

### Testing Forms
- Forms currently use demonstration Formspree/reCaptcha keys
- For testing: Replace API keys in HTML form sections
- Test form submissions and validation logic

## Content Management

### Adding New Events
- Update `paa_events.html` or `psa_events.html` with new event information
- Follow existing HTML structure and Bootstrap grid system
- Add corresponding images to `images/` directory if needed

### Updating Deadlines
- Modify deadline date in `js/scripts.js` for banner display control
- Update deadline text in HTML comment sections of society pages

### Society Information Updates
- Main content in `paa.html` and `psa.html` within section tags
- Modal content for requirements, applications, and FAQs embedded in HTML
- Maintain consistent styling with existing Bootstrap classes

## Deployment

### GitHub Pages
- Site auto-deploys from `_site/` directory
- Custom domain configured via `CNAME` file
- Any changes to main HTML files should be reflected in `_site/` directory

### File Synchronization
The `_site/` directory contains processed versions of main files. When editing:
1. Make changes to root-level files
2. Copy changes to corresponding `_site/` files for deployment
3. Ensure `_site/` directory stays synchronized for GitHub Pages

## Key Configuration Points

### API Keys & External Services
- **Formspree endpoint**: Search for form action URLs in HTML files
- **reCaptcha site keys**: Found in form HTML sections
- **Font Awesome**: Currently using CDN version 6.3.0

### Responsive Design
- Bootstrap grid system used throughout
- Mobile-first approach with responsive navigation
- Image optimization important due to large file sizes in `images/`

### SEO & Meta Data
- Each page has appropriate meta tags for description and author
- Semantic HTML structure with proper heading hierarchy
- Alt text provided for images (verify completeness)

## Common Tasks

### Update Application Deadlines
1. Edit date in `js/scripts.js`
2. Update any hardcoded deadline text in HTML files
3. Test banner display logic

### Add New Honor Society
1. Create new HTML file following `paa.html` or `psa.html` structure
2. Add navigation links in all pages
3. Create corresponding events page
4. Add society logo to `images/` directory

### Modify Form Fields
1. Locate form sections in society HTML files
2. Update form HTML while maintaining Bootstrap styling
3. Ensure Formspree integration remains functional
4. Test form validation and submission

### Update Styling
1. Modify `css/styles.css` for global changes
2. Use `css/cover.css` for landing page specific styles
3. Maintain Bootstrap class consistency
4. Test responsive behavior across devices
