import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Mama Nature';
  private appearOnScroll: IntersectionObserver;
  private autoAdvanceTimer: number | undefined;
  private currentImageIndex: number = 0;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor(private translate: TranslateService) {
    const appearOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    };

    this.appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    translate.addLangs(['en', 'me', 'ru', 'no']);
    translate.setDefaultLang('en');
    translate.use('en'); // Set initial language
  }

  ngOnInit(): void {
    // const browserLang = this.translate.getBrowserLang() || 'en';
    // this.setLanguage(browserLang.match(/en|me|ru|no/) ? browserLang : 'en');
    this.setLanguage('en');

    const faders = document.querySelectorAll<HTMLElement>('.fade-in');
    const staggerElements = document.querySelectorAll<HTMLElement>('.stagger');

    faders.forEach((fader) => {
      this.appearOnScroll.observe(fader);
    });

    staggerElements.forEach((element) => {
      this.appearOnScroll.observe(element);
    });

    this.initializeMobileMenu();
    this.initializeCarousel();
  }

  ngOnDestroy(): void {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
    }
    this.appearOnScroll.disconnect();
  }

  setLanguage(lang?: string): void {
    if (!lang) {
      return;
    }

    this.translate.use(lang);
  }

  private initializeMobileMenu(): void {
    const hamburger = document.querySelector<HTMLElement>('.hamburger');
    const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll<HTMLAnchorElement>(
      '.mobile-menu-links a'
    );

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active')
        ? 'hidden'
        : '';
    });

    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  private initializeCarousel(): void {
    const carousel = document.querySelector<HTMLElement>('.carousel');
    const images = document.querySelectorAll<HTMLElement>('.carousel-image');
    const prevButton = document.querySelector<HTMLElement>(
      '.carousel-button.prev'
    );
    const nextButton = document.querySelector<HTMLElement>(
      '.carousel-button.next'
    );

    if (!carousel || !prevButton || !nextButton || images.length === 0) return;

    const nextImage = (): void => {
      this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
      this.showImage(this.currentImageIndex);
      this.resetTimer();
    };

    const prevImage = (): void => {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + images.length) % images.length;
      this.showImage(this.currentImageIndex);
      this.resetTimer();
    };

    const handleSwipe = (): void => {
      const swipeThreshold = 50;
      const difference = this.touchStartX - this.touchEndX;

      if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    };

    carousel.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    // Initial preload of the next image
    this.preloadImage(1);
    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
    }
    this.autoAdvanceTimer = window.setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) %
        document.querySelectorAll<HTMLElement>('.carousel-image').length;
      this.showImage(this.currentImageIndex);
    }, 5000);
  }

  private showImage(index: number): void {
    const images = document.querySelectorAll<HTMLElement>('.carousel-image');
    images.forEach((img) => img.classList.remove('active'));
    images[index].classList.add('active');
    
    // Preload adjacent images
    this.preloadImage(index - 1);  // Previous image
    this.preloadImage(index + 1);  // Next image
    this.preloadImage(index + 2);  // Next + 1 image
  }

  private preloadImage(index: number): void {
    const images = document.querySelectorAll<HTMLElement>('.carousel-image');
    if (index < 0 || index >= images.length) return;
    
    const img = images[index] as HTMLImageElement;
    if (img.dataset['src'] && !img.src) {
      img.src = img.dataset['src'];
    }
  }
}
