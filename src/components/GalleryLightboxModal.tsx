import { useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';

interface GalleryLightboxModalProps {
  currentIndex: number;
  images: string[];
  title: string;
  onClose: () => void;
  onView: (index: number) => void;
}

export default function GalleryLightboxModal({
  currentIndex,
  images,
  title,
  onClose,
  onView,
}: GalleryLightboxModalProps) {
  const slides = useMemo(
    () => images.map((src, index) => ({ src, alt: `${title} ${index + 1}` })),
    [images, title]
  );

  return (
    <Lightbox
      open
      close={onClose}
      index={Math.max(currentIndex, 0)}
      slides={slides}
      noScroll={{ disabled: true }}
      plugins={[Fullscreen]}
      labels={{
        Close: 'Close gallery lightbox',
        Next: 'Next photo',
        Previous: 'Previous photo',
      }}
      on={{
        view: ({ index }) => onView(index),
      }}
    />
  );
}
