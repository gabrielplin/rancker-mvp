export type ContentPosition = 'left' | 'right';

export interface ContentSectionProps {
  content: React.ReactNode;
  image?: {
    src: string;
    alt?: string;
  };
  contentPosition?: ContentPosition;
}
