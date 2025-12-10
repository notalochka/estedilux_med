// Типи для блогу

export interface BlogPostContentItem {
  type: 'heading' | 'paragraph' | 'list';
  content: string | string[]; // Для heading і paragraph - string, для list - string[]
}

export interface BlogPost {
  id: number;
  image: string;
  date: string;
  title: {
    ru: string;
    en: string;
  };
  content: {
    ru: BlogPostContentItem[];
    en: BlogPostContentItem[];
  };
}

