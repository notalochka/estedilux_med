import type { BlogPostContentItem } from '@/types/blog';

export function convertToMarkdown(contentItems: BlogPostContentItem[]): string {
  return contentItems
    .map((item) => {
      if (item.type === 'heading') {
        return `## ${typeof item.content === 'string' ? item.content : ''}\n`;
      }
      
      if (item.type === 'paragraph') {
        return `${typeof item.content === 'string' ? item.content : ''}\n`;
      }
      
      if (item.type === 'list' && Array.isArray(item.content)) {
        return item.content.map((listItem) => `- ${listItem}`).join('\n') + '\n';
      }
      
      return '';
    })
    .join('\n')
    .trim();
}

