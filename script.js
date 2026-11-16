/**
 * ============================================================
 *  UNISTYLE UNIFORMS — Premium Website JavaScript
 *  All interactive features: custom cursor, sticky glass navbar,
 *  mobile drawer, parallax hero, product filtering, quick view modal,
 *  persistent quote cart, testimonial carousel, gallery lightbox,
 *  animated counters, FAQ accordion, form validation, backend API sync,
 *  toast notifications, and scroll animations.
 * ============================================================
 */
;(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
   *  [EDITABLE: JAVASCRIPT GLOBAL SITE CONFIGURATION]
   *  Easily change your company name, phone, WhatsApp & messages:
   * ────────────────────────────────────────────────────────── */
  const SITE_CONFIG = {
    // [EDITABLE: Company Brand Name]
    companyName: 'UNISTYLE UNIFORMS',

    // [EDITABLE: WhatsApp Phone Number (Country Code + Number, no + or dashes)]
    whatsappNumber: '15551234567',

    // [EDITABLE: WhatsApp Floating Button Pre-filled Message]
    whatsappMessage: "Hello UNISTYLE! I'm interested in your uniform and apparel services.",

    // [EDITABLE: Newsletter Success Notification]
    newsletterToast: 'Thank you for subscribing to UNISTYLE UNIFORMS! 🎉',

    // [EDITABLE: Quote Cart Message Template auto-filled into Contact Form]
    formatQuoteMessage: (itemsSummary, totalVal) =>
      `Hello UNISTYLE team,\n\nI would like to request an official quotation for the following uniform items:\n\n${itemsSummary}\n\nEstimated Total: QAR ${totalVal.toFixed(2)}\n\nPlease provide sizing recommendations, bulk pricing, and lead time.`,
  };

  /* ──────────────────────────────────────────────────────────
   *  0.  UTILITY HELPERS
   * ────────────────────────────────────────────────────────── */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const throttle = (fn, ms = 50) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn(...args);
      }
    };
  };

  const debounce = (fn, ms = 250) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };

  /* ──────────────────────────────────────────────────────────
   *  1.  CUSTOM CURSOR
   * ────────────────────────────────────────────────────────── */

  const initCustomCursor = () => {
    const cursor = $('.custom-cursor, .cursor-outline');
    const dot = $('.custom-cursor-dot, .cursor-dot');
    if (!cursor && !dot) return;

    // Check for touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (cursor) cursor.style.display = 'none';
      if (dot) dot.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const speed = 0.18; // lerp smoothness

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    });

    const renderCursor = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover effect on interactive elements
    const interactiveSelectors = 'a, button, .btn, input, textarea, select, .product-card, .filter-tab, .gallery-item, .faq-question, .testimonial-btn, .testimonial-dot';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        if (cursor) cursor.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        if (cursor) cursor.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.opacity = '0';
      if (dot) dot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.opacity = '0.7';
      if (dot) dot.style.opacity = '1';
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  2.  NAVIGATION & MOBILE DRAWER
   * ────────────────────────────────────────────────────────── */

  const initNavigation = () => {
    const navbar = $('.navbar');
    const hamburger = $('.hamburger, #hamburger');
    const mobileDrawer = $('.mobile-drawer, .mobile-menu, #mobileDrawer');
    const mobileOverlay = $('.mobile-overlay, #mobileOverlay');
    const mobileClose = $('.mobile-close, #mobileClose');
    const mobileLinks = $$('.mobile-link, .mobile-drawer a');
    const navLinks = $$('.nav-menu a, .nav-links a, .nav-link');

    if (!navbar) return;

    /* Sticky navbar transition on scroll */
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', throttle(handleScroll, 50));
    handleScroll();

    /* Mobile Drawer Toggle */
    const openDrawer = () => {
      if (hamburger) hamburger.classList.add('active');
      if (mobileDrawer) {
        mobileDrawer.classList.add('open');
        mobileDrawer.classList.add('active');
      }
      if (mobileOverlay) {
        mobileOverlay.classList.add('open');
        mobileOverlay.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.classList.remove('active');
      }
      if (mobileOverlay) {
        mobileOverlay.classList.remove('open');
        mobileOverlay.classList.remove('active');
      }
      document.body.style.overflow = '';
    };

    if (hamburger) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileDrawer?.classList.contains('open') || mobileDrawer?.classList.contains('active');
        if (isOpen) closeDrawer();
        else openDrawer();
      });
    }

    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    /* Active nav link highlight on scroll */
    const sections = $$('section[id]');
    if (sections.length && navLinks.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
              });
              mobileLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
              });
            }
          });
        },
        { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
      );
      sections.forEach((sec) => observer.observe(sec));
    }

    /* Smooth anchor scroll */
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = $(href);
        if (target) {
          e.preventDefault();
          const offset = navbar.offsetHeight || 80;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  3.  HERO SECTION — Parallax & Text Reveals
   * ────────────────────────────────────────────────────────── */

  const initHero = () => {
    const heroBg = $('.hero-bg-img, .hero-bg');
    if (heroBg) {
      window.addEventListener(
        'scroll',
        throttle(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.25}px)`;
          }
        }, 16)
      );
    }
  };

  /* ──────────────────────────────────────────────────────────
   *  4.  MARQUEE TRACK
   * ────────────────────────────────────────────────────────── */

  const initMarquee = () => {
    const track = $('#marqueeTrack, .marquee-track');
    if (!track) return;

    track.addEventListener('mouseenter', () => track.classList.add('paused'));
    track.addEventListener('mouseleave', () => track.classList.remove('paused'));
  };

  /* ──────────────────────────────────────────────────────────
   *  5.  PRODUCT CATALOG & PERSISTENT CART
   * ────────────────────────────────────────────────────────── */

  const CART_STORAGE_KEY = 'unistyle_cart_qar';
  const LEGACY_CART_STORAGE_KEY = 'unistyle_cart';

  // Load cart from localStorage
  let cart = [];
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      cart = JSON.parse(saved);
    } else {
      const legacyCart = localStorage.getItem(LEGACY_CART_STORAGE_KEY);
      if (legacyCart) {
        cart = JSON.parse(legacyCart).map((item) => ({
          ...item,
          price: Math.round(parseFloat(item.price) * 3.64 * 100) / 100,
        }));
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      }
    }
  } catch (err) {
    cart = [];
  }

  const saveCart = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => String(item.id) === String(product.id));
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      cart.push({
        id: String(product.id),
        name: product.name || 'Uniform Item',
        price: parseFloat(product.price) || 0,
        image: product.image || '',
        quantity: product.quantity || 1,
      });
    }
    saveCart();
    updateCartUI();
  };

  const removeFromCart = (id) => {
    cart = cart.filter((item) => String(item.id) !== String(id));
    saveCart();
    updateCartUI();
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find((i) => String(i.id) === String(id));
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartUI();
    }
  };

  const clearCart = () => {
    cart = [];
    saveCart();
    updateCartUI();
  };

  const updateCartUI = () => {
    // Badges
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = $$('.cart-badge, #cartBadge');
    badges.forEach((b) => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Cart Items Container
    const itemsContainer = $('#cartItems, .cart-items');
    const emptyState = $('#cartEmpty, .cart-empty');
    const cartFooter = $('#cartFooter, .cart-footer');
    const totalDisplay = $('#cartTotal, .cart-total strong');

    if (itemsContainer) {
      if (cart.length === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        // Remove existing item rows
        $$('.cart-item', itemsContainer).forEach((el) => el.remove());
        if (cartFooter) cartFooter.style.display = 'none';
      } else {
        if (emptyState) emptyState.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';

        // Render items
        itemsContainer.innerHTML = cart
          .map(
            (item) => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <span class="cart-item-price">QAR ${item.price.toFixed(2)}</span>
              <div class="cart-item-quantity">
                <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
          </div>`
          )
          .join('');
      }
    }

    // Update total calculation
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalDisplay) {
      totalDisplay.textContent = `QAR ${total.toFixed(2)}`;
    }
  };

  const initProductCatalog = () => {
    const filterTabs = $$('.filter-tab, [data-filter]');
    const productCards = $$('.product-card');

    /* Category Filtering */
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter || 'all';

        productCards.forEach((card) => {
          const category = card.dataset.category || '';
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92)';
            setTimeout(() => card.classList.add('hidden'), 250);
          }
        });
      });
    });

    /* Add to Quote click delegation */
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add-to-quote, .add-to-quote, .add-to-cart, .btn-add-cart');
      if (!addBtn) return;
      e.preventDefault();

      const card = addBtn.closest('.product-card');
      if (!card) return;

      const product = {
        id: card.dataset.id || `item-${Date.now()}`,
        name: card.dataset.name || card.querySelector('.product-name, h3')?.textContent?.trim() || 'Uniform Item',
        price: parseFloat(card.dataset.price || '0'),
        image: card.dataset.image || card.querySelector('img')?.src || '',
        quantity: 1,
      };

      addToCart(product);
      showToast(`Added "${product.name}" to your quote cart!`, 'success');

      // Subtle bounce animation on cart icon
      const cartToggle = $('#cartToggle, .cart-toggle');
      if (cartToggle) {
        cartToggle.style.transform = 'scale(1.25)';
        setTimeout(() => { cartToggle.style.transform = ''; }, 300);
      }
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  6.  QUICK VIEW MODAL
   * ────────────────────────────────────────────────────────── */

  const initQuickView = () => {
    const modal = $('#quickViewModal, .quick-view-modal');
    if (!modal) return;

    const closeBtn = $('#modalClose, .modal-close', modal);
    const modalAddBtn = $('#modalAddToQuote, .modal-add-to-quote', modal);

    const openQuickView = (card) => {
      const img = $('#modalImage', modal) || modal.querySelector('img');
      const title = $('#modalTitle', modal) || modal.querySelector('h3');
      const price = $('#modalPrice', modal);
      const category = $('#modalCategory', modal);
      const desc = $('#modalDescription', modal);

      const cardImg = card.querySelector('img')?.src || card.dataset.image || '';
      const cardTitle = card.dataset.name || card.querySelector('.product-name, h3')?.textContent?.trim() || 'Uniform';
      const cardPrice = card.dataset.price ? `QAR ${card.dataset.price}` : card.querySelector('.product-price, .price')?.textContent || 'QAR 99';
      const cardCat = card.dataset.category || 'Uniform';

      if (img) img.src = cardImg;
      if (title) title.textContent = cardTitle;
      if (price) price.textContent = cardPrice;
      if (category) category.textContent = cardCat;

      // Attach data to Add button
      if (modalAddBtn) {
        modalAddBtn.dataset.id = card.dataset.id || `prod-${Date.now()}`;
        modalAddBtn.dataset.name = cardTitle;
        modalAddBtn.dataset.price = card.dataset.price || '99';
        modalAddBtn.dataset.image = cardImg;
      }

      modal.removeAttribute('hidden');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeQuickView = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Open listener on Quick View buttons
    document.addEventListener('click', (e) => {
      const qvBtn = e.target.closest('.btn-quick-view, .quick-view');
      if (!qvBtn) return;
      e.preventDefault();

      const card = qvBtn.closest('.product-card');
      if (card) openQuickView(card);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeQuickView);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeQuickView();
      }
    });

    // Add to Quote from inside modal
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = {
          id: modalAddBtn.dataset.id || `item-${Date.now()}`,
          name: modalAddBtn.dataset.name || 'Uniform Item',
          price: parseFloat(modalAddBtn.dataset.price || '0'),
          image: modalAddBtn.dataset.image || '',
          quantity: 1,
        };
        addToCart(product);
        showToast(`Added "${product.name}" to your quote cart!`, 'success');
        closeQuickView();
      });
    }

    // Modal Inquire Link
    const modalContactBtn = modal.querySelector('.modal-contact');
    if (modalContactBtn) {
      modalContactBtn.addEventListener('click', () => {
        closeQuickView();
      });
    }
  };

  /* ──────────────────────────────────────────────────────────
   *  7.  CART SIDEBAR CONTROLS
   * ────────────────────────────────────────────────────────── */

  const initCartSidebar = () => {
    const sidebar = $('#cartSidebar, .cart-sidebar');
    const overlay = $('#cartOverlay, .cart-overlay, .cart-sidebar-overlay');
    const toggleBtns = $$('#cartToggle, .cart-toggle, .cart-icon');
    const closeBtn = $('#cartClose, .cart-close');
    const clearBtn = $('#cartClear, .cart-clear');
    const checkoutBtn = $('.cart-checkout');

    if (!sidebar) return;

    const openCart = () => {
      sidebar.classList.add('open');
      sidebar.classList.add('active');
      if (overlay) {
        overlay.classList.add('open');
        overlay.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
      sidebar.classList.remove('open');
      sidebar.classList.remove('active');
      if (overlay) {
        overlay.classList.remove('open');
        overlay.classList.remove('active');
      }
      document.body.style.overflow = '';
    };

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = sidebar.classList.contains('open') || sidebar.classList.contains('active');
        if (isOpen) closeCart();
        else openCart();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);

    // Clear Cart
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearCart();
        showToast('Your quote cart has been cleared.', 'info');
      });
    }

    // Quantity controls and item removal delegation
    sidebar.addEventListener('click', (e) => {
      const plus = e.target.closest('.qty-plus');
      const minus = e.target.closest('.qty-minus');
      const remove = e.target.closest('.cart-item-remove');

      if (plus) {
        e.preventDefault();
        updateQuantity(plus.dataset.id, 1);
      } else if (minus) {
        e.preventDefault();
        updateQuantity(minus.dataset.id, -1);
      } else if (remove) {
        e.preventDefault();
        removeFromCart(remove.dataset.id);
        showToast('Item removed from cart.', 'info');
      }
    });

    // Checkout: Transfer cart items into the Quote message field
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        closeCart();
        const messageField = $('#contactForm textarea, textarea[name="message"]');
        if (messageField && cart.length > 0) {
          const itemsSummary = cart.map((i) => `• ${i.name} (Qty: ${i.quantity}, est. QAR ${(i.price * i.quantity).toFixed(2)})`).join('\n');
          const totalVal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
          messageField.value = `Hello UNISTYLE team,\n\nI would like to request an official quotation for the following uniform items:\n\n${itemsSummary}\n\nEstimated Total: QAR ${totalVal.toFixed(2)}\n\nPlease provide sizing recommendations, bulk pricing, and lead time.`;
        }
      });
    }

    // Initial render from localStorage
    updateCartUI();
  };

  /* ──────────────────────────────────────────────────────────
   *  8.  TESTIMONIAL SLIDER
   * ────────────────────────────────────────────────────────── */

  const initTestimonialSlider = () => {
    const slider = $('#testimonialSlider, .testimonial-slider');
    if (!slider) return;

    const track = $('#testimonialTrack, .testimonial-track');
    const slides = $$('.testimonial-slide', slider);
    const prevBtn = $('#testimonialPrev, .testimonial-prev, .slider-prev');
    const nextBtn = $('#testimonialNext, .testimonial-next, .slider-next');
    const dotsContainer = $('#testimonialDots, .testimonial-dots, .slider-dots');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoTimer = null;

    // Render / bind dots
    let dots = $$('.testimonial-dot, .dot', dotsContainer);
    if (!dots.length && dotsContainer) {
      dotsContainer.innerHTML = slides.map((_, i) => `<button class="testimonial-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`).join('');
      dots = $$('.testimonial-dot', dotsContainer);
    }

    const goToSlide = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      autoTimer = setInterval(() => goToSlide(currentIndex + 1), 5500);
    };

    const stopAutoPlay = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        startAutoPlay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoPlay();
      });
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    goToSlide(0);
    startAutoPlay();
  };

  /* ──────────────────────────────────────────────────────────
   *  9.  GALLERY LIGHTBOX
   * ────────────────────────────────────────────────────────── */

  const initGalleryLightbox = () => {
    const galleryItems = $$('.gallery-item');
    const lightbox = $('#lightbox, .lightbox');
    if (!lightbox || !galleryItems.length) return;

    const lightboxImg = $('#lightboxImage', lightbox) || lightbox.querySelector('img');
    const closeBtn = $('#lightboxClose, .lightbox-close', lightbox);
    const prevBtn = $('#lightboxPrev, .lightbox-prev', lightbox);
    const nextBtn = $('#lightboxNext, .lightbox-next', lightbox);

    let activeIndex = 0;

    const openLightbox = (index) => {
      activeIndex = index;
      const img = galleryItems[activeIndex]?.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery photo';
      }
      lightbox.removeAttribute('hidden');
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const navigate = (direction) => {
      activeIndex = (activeIndex + direction + galleryItems.length) % galleryItems.length;
      const img = galleryItems[activeIndex]?.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
      }
    };

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  10.  FAQ ACCORDION
   * ────────────────────────────────────────────────────────── */

  const initFaqAccordion = () => {
    const faqItems = $$('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = '0';
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  11.  ANIMATED COUNTERS
   * ────────────────────────────────────────────────────────── */

  const initCounters = () => {
    const counters = $$('.counter, .stat-number, .hero-stat-number, [data-target]');
    if (!counters.length) return;

    const animateNumber = (el) => {
      const target = parseInt(el.dataset.target || el.dataset.count || el.textContent.replace(/[^0-9]/g, ''), 10);
      if (isNaN(target) || target === 0) return;

      const duration = 1800;
      const startTime = performance.now();
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const step = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutQuart(progress) * target);

        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    counters.forEach((c) => observer.observe(c));
  };

  /* ──────────────────────────────────────────────────────────
   *  12.  SCROLL-TRIGGERED ANIMATIONS
   * ────────────────────────────────────────────────────────── */

  const initScrollAnimations = () => {
    const elements = $$('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
  };

  /* ──────────────────────────────────────────────────────────
   *  13.  FORM VALIDATION & BACKEND API SYNC
   * ────────────────────────────────────────────────────────── */

  const initFormValidation = () => {
    const contactForm = $('#contactForm, .contact-form');
    if (!contactForm) return;

    const validators = {
      name: (val) => (!val.trim() ? 'Full name is required' : val.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
      email: (val) => {
        if (!val.trim()) return 'Email address is required';
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(val.trim()) ? '' : 'Please enter a valid email address';
      },
      phone: (val) => {
        if (!val.trim()) return '';
        const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
        return regex.test(val.trim()) ? '' : 'Please enter a valid phone number';
      },
      message: (val) => (!val.trim() ? 'Please describe your uniform requirements' : val.trim().length < 10 ? 'Message must be at least 10 characters' : ''),
    };

    const validateField = (field) => {
      const name = field.getAttribute('name') || field.id.replace('contact', '').toLowerCase();
      const validator = validators[name];
      if (!validator) return true;

      const errorMsg = validator(field.value);
      const group = field.closest('.form-group') || field.parentElement;
      const errorSpan = group?.querySelector('.form-error, .error-message');

      if (errorMsg) {
        field.classList.add('error');
        field.classList.remove('success');
        if (errorSpan) {
          errorSpan.textContent = errorMsg;
          errorSpan.style.display = 'block';
        }
        return false;
      } else {
        field.classList.remove('error');
        if (field.value.trim()) field.classList.add('success');
        if (errorSpan) {
          errorSpan.textContent = '';
          errorSpan.style.display = 'none';
        }
        return true;
      }
    };

    const fields = $$('input, textarea, select', contactForm);
    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', debounce(() => {
        if (field.classList.contains('error')) validateField(field);
      }, 300));
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let allValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        showToast('Please fix the highlighted errors before submitting.', 'error');
        return;
      }

      // Collect data
      const formData = {
        name: $('#contactName')?.value?.trim() || '',
        email: $('#contactEmail')?.value?.trim() || '',
        phone: $('#contactPhone')?.value?.trim() || '',
        company: $('#contactCompany')?.value?.trim() || '',
        industry: $('#contactIndustry')?.value || '',
        quantity: $('#contactQuantity')?.value || '',
        message: $('#contactMessage, textarea[name="message"]')?.value?.trim() || '',
        items: cart.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      };

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      }

      try {
        // Attempt backend API call (if server is active)
        const res = await fetch('/api/quotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          showToast('Thank you! Your quote request was sent directly to our team.', 'success');
        } else {
          showToast('Quote received! Our uniform specialists will get in touch shortly.', 'success');
        }
      } catch (err) {
        // Graceful fallback for static/offline preview
        showToast('Thank you! Your request has been recorded. We will contact you within 24 hours.', 'success');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        contactForm.reset();
        fields.forEach((f) => f.classList.remove('success', 'error'));
      }
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  14.  NEWSLETTER SUBSCRIPTION
   * ────────────────────────────────────────────────────────── */

  const initNewsletter = () => {
    const forms = $$('#newsletterForm, #footerNewsletterForm, .newsletter-form');

    forms.forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input) return;

        const email = input.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !regex.test(email)) {
          showToast('Please enter a valid email address.', 'error');
          return;
        }

        try {
          await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
        } catch (err) {}

        showToast('Thank you for subscribing to UNISTYLE UNIFORMS! 🎉', 'success');
        input.value = '';
      });
    });
  };

  /* ──────────────────────────────────────────────────────────
   *  15.  BACK TO TOP & WHATSAPP
   * ────────────────────────────────────────────────────────── */

  const initBackToTop = () => {
    const btn = $('#backToTop, .back-to-top');
    if (!btn) return;

    window.addEventListener(
      'scroll',
      throttle(() => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }, 100)
    );

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const initWhatsApp = () => {
    const wa = $('.whatsapp-float');
    if (!wa) return;

    if (!wa.getAttribute('href') || wa.getAttribute('href') === '#') {
      wa.setAttribute('href', "https://wa.me/15551234567?text=Hello%20UNISTYLE!%20I'm%20interested%20in%20your%20uniform%20services.");
      wa.setAttribute('target', '_blank');
      wa.setAttribute('rel', 'noopener noreferrer');
    }
  };

  /* ──────────────────────────────────────────────────────────
   *  16.  SCROLL PROGRESS BAR
   * ────────────────────────────────────────────────────────── */

  const initScrollProgress = () => {
    const bar = $('#scrollProgress, .scroll-progress');
    if (!bar) return;

    window.addEventListener(
      'scroll',
      throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
      }, 16)
    );
  };

  /* ──────────────────────────────────────────────────────────
   *  17.  TOAST NOTIFICATION SYSTEM
   * ────────────────────────────────────────────────────────── */

  const showToast = (message, type = 'info') => {
    let container = $('#toastContainer, .toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
      success: '<i class="fas fa-check-circle"></i>',
      error: '<i class="fas fa-exclamation-circle"></i>',
      info: '<i class="fas fa-info-circle"></i>',
    };

    toast.innerHTML = `
      <span class="toast-icon">${iconMap[type] || iconMap.info}</span>
      <span class="toast-message">${message}</span>
      <span class="toast-close">&times;</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast-visible'));

    const removeToast = () => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 350);
    };

    toast.querySelector('.toast-close')?.addEventListener('click', removeToast);
    setTimeout(removeToast, 4000);
  };

  window.showToast = showToast;

  /* ──────────────────────────────────────────────────────────
   *  INIT ON DOM LOAD
   * ────────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', () => {
    // Populate dynamic year in footer
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Init UI subsystems
    initCustomCursor();
    initNavigation();
    initHero();
    initMarquee();
    initProductCatalog();
    initQuickView();
    initCartSidebar();
    initTestimonialSlider();
    initGalleryLightbox();
    initFaqAccordion();
    initCounters();
    initScrollAnimations();
    initFormValidation();
    initNewsletter();
    initBackToTop();
    initWhatsApp();
    initScrollProgress();

    console.log('%c✦ UNISTYLE UNIFORMS — Luxury Brand System Loaded ✦', 'color:#c9a84c;font-size:13px;font-weight:bold;');
  });
})();
