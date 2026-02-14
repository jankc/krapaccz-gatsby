import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface GalleryLightboxProps {
  images: string[];
  title: string;
  triggerSelector?: string;
}

const loadLightboxModal = () => import('./GalleryLightboxModal');
const LazyGalleryLightboxModal = lazy(loadLightboxModal);

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function GalleryLightbox({
  images,
  title,
  triggerSelector = '[data-gallery-index]',
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => {
    setCurrentIndex(-1);

    const trigger = lastTriggerRef.current;
    if (trigger) {
      window.requestAnimationFrame(() => trigger.focus());
    }
  }, []);

  const openLightbox = useCallback((index: number, trigger: HTMLElement) => {
    void loadLightboxModal();
    lastTriggerRef.current = trigger;
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const triggers = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(triggerSelector)
    );

    if (triggers.length === 0) {
      return;
    }

    const preloadLightbox = () => {
      void loadLightboxModal();
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      const trigger = event.currentTarget;
      if (!(trigger instanceof HTMLAnchorElement)) {
        return;
      }

      const parsedIndex = Number.parseInt(
        trigger.dataset.galleryIndex ?? '0',
        10
      );
      openLightbox(Number.isNaN(parsedIndex) ? 0 : parsedIndex, trigger);
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', handleClick);
      trigger.addEventListener('pointerenter', preloadLightbox, { once: true });
      trigger.addEventListener('focus', preloadLightbox, { once: true });
    });

    return () => {
      triggers.forEach((trigger) => {
        trigger.removeEventListener('click', handleClick);
        trigger.removeEventListener('pointerenter', preloadLightbox);
        trigger.removeEventListener('focus', preloadLightbox);
      });
    };
  }, [openLightbox, triggerSelector]);

  useEffect(() => {
    if (currentIndex < 0) {
      return;
    }

    const ensureFocusInsideModal = () => {
      const modal = document.querySelector<HTMLElement>(
        '.yarl__container[role="dialog"], .yarl__container, .yarl__root'
      );

      if (!modal) {
        return;
      }

      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        return;
      }

      modal.setAttribute('tabindex', '-1');
      modal.focus();
    };

    const focusTimeoutId = window.setTimeout(ensureFocusInsideModal, 0);

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const modal = document.querySelector<HTMLElement>(
        '.yarl__container[role="dialog"], .yarl__container, .yarl__root'
      );

      if (!modal) {
        return;
      }

      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        modal.setAttribute('tabindex', '-1');
        modal.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !modal.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }

        return;
      }

      if (activeElement === lastElement || !modal.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);

    return () => {
      window.clearTimeout(focusTimeoutId);
      document.removeEventListener('keydown', trapFocus);
    };
  }, [currentIndex]);

  return (
    <Suspense fallback={null}>
      {currentIndex >= 0 && (
        <LazyGalleryLightboxModal
          currentIndex={currentIndex}
          images={images}
          title={title}
          onClose={closeLightbox}
          onView={setCurrentIndex}
        />
      )}
    </Suspense>
  );
}
