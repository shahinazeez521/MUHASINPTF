/**
 * 
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  function renderProjectCaseStudy() {
    const details = document.querySelector("#portfolio-details");
    const otherWorksLink = details?.querySelector(".other-works-link");
    const info = details?.querySelector(".portfolio-info");
    const slider = details?.querySelector(".portfolio-details-slider");
    const firstImage = slider?.querySelector(".swiper-slide img");
    const title = info?.querySelector("h3")?.textContent.trim();

    if (!details || !info || !slider || !firstImage || !title) return;

    const fields = [...info.querySelectorAll("li")].reduce((values, item) => {
      const label = item.querySelector("strong")?.textContent.replace(/:$/, "").trim().toLowerCase();
      const value = item.textContent.replace(item.querySelector("strong")?.textContent ?? "", "").replace(/^\s*:\s*/, "").trim();
      if (label && value) values[label] = { value, link: item.querySelector("a")?.href };
      return values;
    }, {});
    const description = [...info.querySelectorAll("p")].map(paragraph => paragraph.textContent.trim()).filter(Boolean).join(" ");
    const category = /hospital|health/i.test(title) ? "Healthcare" : /museum/i.test(title) ? "Cultural" : "Entertainment";
    const role = fields.role?.value || "BIM Lead Architect";
    const location = fields.location?.value || "UAE";
    const projectSummary = description.length > 78 ? `${description.slice(0, 75).trimEnd()}...` : description || title;
    const galleryImages = slider.querySelectorAll(".swiper-slide img");
    const projectSpecificDetails = details.querySelector(".project-detail-grid[data-project-specific]");
    const projectSpecificKey = projectSpecificDetails?.dataset.projectSpecific;
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const makeElement = (tag, className, text) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text) element.textContent = text;
      return element;
    };
    const makeFact = (label, value) => {
      const fact = makeElement("div", "case-fact");
      fact.append(makeElement("span", "", label), makeElement("strong", "", value));
      return fact;
    };

    document.body.classList.add("case-study-page");
    const page = makeElement("article", "case-study");
    const heading = makeElement("header", "case-header");
    heading.append(makeElement("h1", "", title), makeElement("div", "case-meta", `${location} · ${category} · ${role}`));

    const hero = makeElement("figure", "case-hero");
    slider.querySelectorAll(".swiper-slide img").forEach((image, index) => {
      image.alt = `${title} gallery image ${index + 1}`;
    });
    slider.classList.add("case-hero-slider");
    hero.append(slider);

    const facts = makeElement("div", "case-facts");
    facts.append(
      makeFact("My role", role),
      makeFact("Project", projectSummary),
      makeFact("Contribution", "Design development · BIM coordination · Digital workflows")
    );

    const cards = makeElement("div", "case-cards");
    if (projectSpecificKey && normalizedTitle.includes(projectSpecificKey)) {
      cards.classList.add(`${projectSpecificKey}-case-cards`);
      projectSpecificDetails.querySelectorAll(".detail-item").forEach(item => {
        const card = makeElement("section", "case-card");
        const heading = makeElement("h2", "", item.querySelector(".detail-number")?.textContent.trim());
        const kicker = item.querySelector(".detail-kicker")?.textContent.trim();
        const paragraph = item.querySelector("p")?.textContent.trim();
        card.append(heading);
        if (kicker) card.append(makeElement("span", "case-card-kicker", kicker));
        if (paragraph) card.append(makeElement("p", "", paragraph));
        const tags = item.querySelector(".detail-tags");
        if (tags) {
          const tagList = makeElement("ul", "case-card-tags");
          tags.querySelectorAll("li").forEach(tag => tagList.append(makeElement("li", "", tag.textContent.trim())));
          card.append(tagList);
        }
        cards.append(card);
      });
    } else {
      [
        ["01 Design", "Develop design solutions for complex architectural forms and coordinate design intent across project teams."],
        ["02 BIM Delivery", "Lead model coordination, issue resolution and multidisciplinary BIM delivery."],
        ["03 Digital Workflow", "Use Rhino, Grasshopper and Rhino.Inside.Revit to connect design geometry with Revit delivery."]
      ].forEach(([cardTitle, text]) => {
        const card = makeElement("section", "case-card");
        card.append(makeElement("h2", "", cardTitle), makeElement("p", "", text));
        cards.append(card);
      });
    }

    if (otherWorksLink) page.append(otherWorksLink);
    page.append(heading, hero, facts, cards);
    if (description) {
      const overview = makeElement("section", "case-overview");
      overview.append(makeElement("h2", "", "Project overview"), makeElement("p", "", description));
      if (fields["project url"]?.link) {
        const projectLink = makeElement("a", "text-link", "VISIT PROJECT WEBSITE");
        projectLink.href = fields["project url"].link;
        projectLink.target = "_blank";
        projectLink.rel = "noopener";
        projectLink.append(" ", makeElement("i", "bi bi-arrow-up-right"));
        overview.append(projectLink);
      }
      page.append(overview);
    }

    details.replaceChildren(page);
  }

  renderProjectCaseStudy();

  
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * View Desktop/Mobile Button
   */
  document.addEventListener('DOMContentLoaded', function() {
    const viewDesktopBtn = document.getElementById('viewDesktopBtn');
    let isDesktopView = false;

    if (viewDesktopBtn) {
      viewDesktopBtn.addEventListener('click', function() {
        isDesktopView = !isDesktopView;
        
        // Get the viewport meta tag
        const viewport = document.querySelector('meta[name="viewport"]');
        
        if (isDesktopView) {
          // Switch to desktop view
          viewport.setAttribute('content', 'width=1200');
          viewDesktopBtn.innerHTML = '<i class="bi bi-phone"></i> View Mobile Site';
        } else {
          // Switch back to mobile view
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
          viewDesktopBtn.innerHTML = '<i class="bi bi-display"></i> View Desktop Site';
        }

        // Store the user's preference
        localStorage.setItem('preferDesktop', isDesktopView);
      });

      // Check for stored preference on page load
      const preferDesktop = localStorage.getItem('preferDesktop') === 'true';
      if (preferDesktop) {
        // Trigger the desktop view if previously selected
        viewDesktopBtn.click();
      }
    }
  });
   document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.portfolio-details-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 600,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });


  // Ongoing Projects Animation and Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS for ongoing projects
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Progress bar animation
  const progressBars = document.querySelectorAll('.ongoing-info .progress-bar');
  
  // Function to animate progress bars when they come into view
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const value = bar.getAttribute('aria-valuenow');
      bar.style.width = '0%';
      
      // Animate after a short delay
      setTimeout(() => {
        bar.style.width = value + '%';
      }, 300);
    });
  }

  // Intersection Observer to trigger progress bar animation
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Observe the ongoing projects section
    const ongoingSection = document.getElementById('ongoing-projects');
    if (ongoingSection) {
      observer.observe(ongoingSection);
    }
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animateProgressBars();
  }

  // Add hover effects for ongoing project cards
  const ongoingCards = document.querySelectorAll('.ongoing-card');
  
  ongoingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Handle responsive behavior
  function handleResponsiveLayout() {
    const ongoingItems = document.querySelectorAll('.ongoing-item');
    
    if (window.innerWidth < 768) {
      // Mobile layout adjustments
      ongoingItems.forEach(item => {
        item.style.marginBottom = '30px';
      });
    } else {
      // Reset for larger screens
      ongoingItems.forEach(item => {
        item.style.marginBottom = '';
      });
    }
  }

  // Initial call and window resize listener
  handleResponsiveLayout();
  window.addEventListener('resize', handleResponsiveLayout);
});
})();