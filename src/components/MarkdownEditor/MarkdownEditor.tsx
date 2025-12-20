import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, Edit } from 'lucide-react';
import styles from './MarkdownEditor.module.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, name }) => {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Забезпечуємо, що value завжди є рядком
  const safeValue = value || '';

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = safeValue.substring(start, end);
    const newText = safeValue.substring(0, start) + before + selectedText + after + safeValue.substring(end);
    
    onChange(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'H1', action: () => insertMarkdown('# ', '\n\n'), tooltip: 'Заголовок 1' },
    { label: 'H2', action: () => insertMarkdown('## ', '\n\n'), tooltip: 'Заголовок 2' },
    { label: 'H3', action: () => insertMarkdown('### ', '\n\n'), tooltip: 'Заголовок 3' },
    { label: 'B', action: () => insertMarkdown('**', '**'), tooltip: 'Жирний', bold: true },
    { label: 'I', action: () => insertMarkdown('*', '*'), tooltip: 'Курсив', italic: true },
    { label: 'Lista', action: () => insertMarkdown('- ', '\n'), tooltip: 'Список' },
    { label: 'Число', action: () => insertMarkdown('1. ', '\n'), tooltip: 'Нумерованный список' },
    { label: 'Code', action: () => insertMarkdown('`', '`'), tooltip: 'Инлайн код', mono: true },
    { label: 'Quote', action: () => insertMarkdown('> ', '\n\n'), tooltip: 'Цитата' },
    { label: '¶', action: () => insertMarkdown('\n\n', ''), tooltip: 'Новый абзац' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Забезпечуємо, що textarea завжди доступний для редагування
  useEffect(() => {
    if (!showPreview && textareaRef.current) {
      // Фокусуємо textarea при відкритті редактора
      textareaRef.current.focus();
    }
  }, [showPreview]);

  return (
    <div className={styles.editor}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarButtons}>
          {toolbarButtons.map((btn, index) => (
            <button
              key={index}
              type="button"
              onClick={btn.action}
              className={`${styles.toolbarButton} ${btn.bold ? styles.bold : ''} ${btn.italic ? styles.italic : ''} ${btn.mono ? styles.mono : ''}`}
              title={btn.tooltip}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={styles.previewToggle}
        >
          {showPreview ? (
            <>
              <Edit size={16} />
              Редактировать
            </>
          ) : (
            <>
              <Eye size={16} />
              Предварительный просмотр
            </>
          )}
        </button>
      </div>

      {/* Editor/Preview */}
      <div className={styles.content}>
        {showPreview ? (
          <div className={styles.preview}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                br: ({node, ...props}) => <br {...props} />,
              }}
            >
              {safeValue || '*Введите текст для предварительного просмотра*'}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            name={name}
            value={safeValue}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="# Заголовок статьи&#10;&#10;Ваш текст тут...&#10;&#10;## Подзаголовок&#10;&#10;- Пункт списка&#10;- Еще один пункт&#10;&#10;**Жирный текст** и *курсив*"
          />
        )}
      </div>

      {/* Help */}
      <div className={styles.help}>
        <details className={styles.helpDetails}>
          <summary className={styles.helpSummary}>📖 Markdown шпаргалка</summary>
          <div className={styles.helpContent}>
            <div className={styles.helpItem}>
              <code># Заголовок 1</code>
              <span>Большой заголовок</span>
            </div>
            <div className={styles.helpItem}>
              <code>## Заголовок 2</code>
              <span>Средний заголовок</span>
            </div>
            <div className={styles.helpItem}>
              <code>**жирний**</code>
              <span><strong>Жирный текст</strong></span>
            </div>
            <div className={styles.helpItem}>
              <code>*курсив*</code>
              <span><em>Курсив</em></span>
            </div>
            <div className={styles.helpItem}>
              <code>- пункт списка</code>
              <span>Маркированный список</span>
            </div>
            <div className={styles.helpItem}>
              <code>1. пункт</code>
              <span>Нумерованный список</span>
            </div>
            <div className={styles.helpItem}>
              <code>`код`</code>
              <span>Инлайн код</span>
            </div>
            <div className={styles.helpItem}>
              <code>&gt; цитата</code>
              <span>Блок цитаты</span>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default MarkdownEditor;

