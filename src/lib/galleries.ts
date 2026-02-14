import { getCollection, type CollectionEntry } from 'astro:content';

const galleryImageModules = import.meta.glob(
  '../../content/galleries/**/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}',
  { eager: true, import: 'default' }
) as Record<string, string | { src: string }>;

export interface GalleryIndexItem {
  slug: string;
  title: string;
  order: number;
  featuredPhotoSrc: string;
}

export interface GalleryDetail extends GalleryIndexItem {
  entry: CollectionEntry<'galleries'>;
  images: string[];
}

const normalizeSlug = (id: string) => {
  const normalizedId = id.replace(/\\/g, '/');
  const fileName = normalizedId.split('/').pop() ?? normalizedId;
  return fileName.replace(/\.md$/, '');
};

const fileNameFromPath = (filePath: string) => {
  const normalizedPath = filePath.replace(/\\/g, '/');
  return normalizedPath.split('/').pop() ?? normalizedPath;
};

const sortByFileName = (a: string, b: string) =>
  fileNameFromPath(a).localeCompare(fileNameFromPath(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });

const getImageSrc = (imageModule: string | { src: string }) =>
  typeof imageModule === 'string' ? imageModule : imageModule.src;

const normalizeContentPath = (filePath: string) =>
  filePath.replace(/\\/g, '/').replace(/^.*\/content\/galleries\//, '');

const getGalleryImages = (slug: string) => {
  const imagePrefix = `${slug}/`;

  return Object.keys(galleryImageModules)
    .filter(filePath => normalizeContentPath(filePath).startsWith(imagePrefix))
    .sort(sortByFileName)
    .map(filePath => getImageSrc(galleryImageModules[filePath]));
};

const getFeaturedPhotoSrc = (featuredPhoto: string) =>
  getImageSrc(
    Object.entries(galleryImageModules).find(([filePath]) => {
      return normalizeContentPath(filePath) === featuredPhoto;
    })?.[1] ?? ''
  );

export const getSortedGalleries = async (): Promise<GalleryIndexItem[]> => {
  const galleries = await getCollection('galleries');

  return galleries
    .map(entry => {
      const slug = normalizeSlug(entry.id);

      return {
        slug,
        title: entry.data.title,
        order: entry.data.order,
        featuredPhotoSrc: getFeaturedPhotoSrc(entry.data.featuredPhoto),
      };
    })
    .sort((a, b) => a.order - b.order);
};

export const getGalleryBySlug = async (
  slug: string
): Promise<GalleryDetail | undefined> => {
  const galleries = await getCollection('galleries');
  const entry = galleries.find(item => normalizeSlug(item.id) === slug);

  if (!entry) {
    return undefined;
  }

  return {
    slug,
    title: entry.data.title,
    order: entry.data.order,
    featuredPhotoSrc: getFeaturedPhotoSrc(entry.data.featuredPhoto),
    entry,
    images: getGalleryImages(slug),
  };
};
