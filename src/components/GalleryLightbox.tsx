import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';

interface GalleryLightboxProps {
  images: string[];
  title: string;
}

export default function GalleryLightbox({ images, title }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const slides = useMemo(
    () => images.map((src, index) => ({ src, alt: `${title} ${index + 1}` })),
    [images, title]
  );

  const columns = useMemo(() => {
    const data: Array<Array<{ src: string; index: number }>> = [[], []];

    images.forEach((src, index) => {
      data[index % 2].push({ src, index });
    });

    return data;
  }, [images]);

  return (
    <>
      <div className="my-masonry-grid">
        {columns.map((column, columnIndex) => (
          <div className="my-masonry-grid_column" key={`col-${columnIndex}`}>
            {column.map(image => (
              <div key={image.src}>
                <a
                  className="image fit thumb"
                  href={image.src}
                  onClick={event => {
                    event.preventDefault();
                    setCurrentIndex(image.index);
                  }}
                >
                  <img src={image.src} alt={`${title} ${image.index + 1}`} loading="lazy" />
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Lightbox
        open={currentIndex >= 0}
        close={() => setCurrentIndex(-1)}
        index={Math.max(currentIndex, 0)}
        slides={slides}
        plugins={[Fullscreen]}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
      />
    </>
  );
}
