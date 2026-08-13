import {
  Component,
  ElementRef,
  HostListener,
  afterNextRender,
  computed,
  input,
  numberAttribute,
  signal,
  viewChildren,
} from '@angular/core';
import { Header } from '../header/header';
import { RouterLink } from '@angular/router';

interface PortfolioImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [Header, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  showHeader = input(true);
  limit = input<number | undefined>(undefined, { transform: numberAttribute });

  heroBackgroundImage =
    'linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url(filer.jpg)';

  images: PortfolioImage[] = [
    { src: '568275838_18026039051743072_4596159081375165059_n.jpg', alt: 'Biomechanical skull and spine tattoo covering the upper back' },
    { src: '607455240_18033846740743072_3019134241718634470_n.jpg', alt: 'Abstract dotwork tattoo with stars and ornamental swirls on the forearm' },
    { src: '730628496_18057680060743072_810516089346641112_n.jpg', alt: 'Racing helmet tattoo with "Godspeed" script on forearm' },
    { src: 'SaveClip.App_742060285_18059034194743072_5612397009091980391_n.jpg', alt: 'Two connected sea turtles line tattoo on forearm' },
    { src: 'SaveInta.com_518158073_18014296604743072_1377489836195853714_n.jpg', alt: 'Red linework snake tattoo wrapping around hip and thigh' },
    { src: 'SaveInta.com_741828014_18059035850743072_5250763748853522636_n.jpg', alt: 'Floral tattoo with flowers, leaves, and angel wing on shoulder and upper arm' },
    { src: 'SaveInta.com_741968392_18059034185743072_8037032056922005722_n.jpg', alt: 'Sea turtle line tattoo close-up on forearm' },
    { src: 'SaveInta.com_771757318_18064215152743072_7911027186258295102_n.jpg', alt: 'Ornamental filigree tattoo on ribs and hip' },
    { src: 'SaveInta.com_771802257_18064216553743072_8097706567373389068_n.jpg', alt: 'Holly leaves and berries tattoo on forearm' },
    { src: 'SaveInta.com_772265166_18064218698743072_4018973436552614878_n.jpg', alt: 'Black tribal spiky armband tattoo on forearm' },
    { src: 'SaveInta.com_773290936_18064211723743072_812301802961494287_n.jpg', alt: 'Crab constellation tattoo on ribs' },
    { src: 'SaveInta.com_773379106_18064213154743072_5046602977356262325_n.jpg', alt: 'Large-scale dragon and peony tattoo on shoulder' },
    { src: 'SaveClip.App_670001795_17954745798006618_1756144357712975470_n.jpg', alt: 'Manchester City crest and realistic portrait half-sleeve tattoo' },
    { src: 'SaveClip.App_671046884_17954745786006618_9060316732870158837_n.jpg', alt: 'Close-up of Manchester City crest and portrait forearm tattoo' },
    { src: 'SaveClip.App_681127081_17956274460006618_1932524958847712225_n.jpg', alt: 'Snake and rabbit forearm tattoo alongside a Kuromi character rib tattoo' },
    { src: 'SaveClip.App_683572261_17956274451006618_7290546571113260962_n.jpg', alt: 'Hello Kitty and teddy bear line tattoo with Kuromi rib tattoo' },
    { src: 'SaveClip.App_683599188_17956274478006618_2321856002190440281_n.jpg', alt: 'Realistic black and grey snake tattoo on forearm' },
    { src: 'SaveClip.App_722314051_17961524820006618_2694387760131887797_n.jpg', alt: 'Creation of Adam reaching hands tattoo on chest' },
    { src: 'SaveClip.App_729674291_17963630583006618_7764791732632905461_n.jpg', alt: 'Jesus Christ portrait tattoo with crown of thorns on upper arm' },
    { src: 'SaveClip.App_748396874_17965086462006618_8453223933407510121_n.jpg', alt: 'Realistic lion head tattoo with tribal accents on forearm' },
    { src: 'SaveClip.App_753707787_17965956834006618_5003896698200885890_n.jpg', alt: 'Mechanical raven tattoo on inner elbow' },
    { src: 'SaveClip.App_756612672_17965956375006618_3120827808494134835_n.jpg', alt: 'Mechanical raven tattoo with full wing detail on forearm' },
    { src: 'SaveClip.App_759871963_17966455881006618_1866240395204906513_n.jpg', alt: 'Dark blackwork tattoo with skull, snake, and flowers on forearm and hand' },
    { src: 'SaveClip.App_760930257_17966455173006618_7886373810378616691_n.jpg', alt: 'Dog and cat pet portrait tattoos on forearm' },
    { src: 'SaveClip.App_774469185_17968083819006618_8122967372779720410_n.jpg', alt: 'Archangel Michael tattoo with prayer script on forearm' },
  ];

  displayedImages = computed(() => {
    const limit = this.limit();
    return limit ? this.images.slice(0, limit) : this.images;
  });

  gridItemEls = viewChildren<ElementRef<HTMLElement>>('gridItemEl');
  imgEls = viewChildren<ElementRef<HTMLImageElement>>('imgEl');
  visibleIndices = signal<ReadonlySet<number>>(new Set());
  loadedIndices = signal<ReadonlySet<number>>(new Set());

  constructor() {
    afterNextRender(() => {
      const checkAll = () => {
        const els = this.gridItemEls();
        const next = new Set(this.visibleIndices());
        let changed = false;

        els.forEach((elRef, i) => {
          if (next.has(i)) return;
          const rect = elRef.nativeElement.getBoundingClientRect();
          const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          if (visible > rect.height * 0.3) {
            next.add(i);
            changed = true;
          }
        });

        if (changed) this.visibleIndices.set(next);
        if (next.size === els.length) window.removeEventListener('scroll', onScroll);
      };

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          checkAll();
        });
      };

      // Images already served from the browser cache fire no `load` event by the
      // time we're listening, so mark those as loaded up front.
      const loaded = new Set(this.loadedIndices());
      this.imgEls().forEach((elRef, i) => {
        if (elRef.nativeElement.complete) loaded.add(i);
      });
      this.loadedIndices.set(loaded);

      requestAnimationFrame(() => requestAnimationFrame(checkAll));
      window.addEventListener('scroll', onScroll, { passive: true });
    });
  }

  onImageLoad(index: number): void {
    if (this.loadedIndices().has(index)) return;
    this.loadedIndices.set(new Set(this.loadedIndices()).add(index));
  }

  isRevealed(index: number): boolean {
    return this.visibleIndices().has(index) && this.loadedIndices().has(index);
  }

  activeIndex = signal<number | null>(null);
  activeImage = computed(() => {
    const i = this.activeIndex();
    return i === null ? null : this.displayedImages()[i];
  });

  open(index: number): void {
    this.activeIndex.set(index);
  }

  close(): void {
    this.activeIndex.set(null);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.clientX < window.innerWidth / 2) {
      this.prev(event);
    } else {
      this.next(event);
    }
  }

  prev(event: Event): void {
    event.stopPropagation();
    const i = this.activeIndex();
    if (i === null) return;
    const total = this.displayedImages().length;
    this.activeIndex.set((i - 1 + total) % total);
  }

  next(event: Event): void {
    event.stopPropagation();
    const i = this.activeIndex();
    if (i === null) return;
    const total = this.displayedImages().length;
    this.activeIndex.set((i + 1) % total);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.activeIndex() === null) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowLeft') this.prev(event);
    if (event.key === 'ArrowRight') this.next(event);
  }
}
