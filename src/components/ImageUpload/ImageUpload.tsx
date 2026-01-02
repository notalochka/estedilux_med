import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, name }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Конвертуємо файл в base64
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        
        try {
          // Завантажуємо base64 на сервер
          const response = await fetch('/api/upload/image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64String }),
          });

          if (!response.ok) {
            throw new Error('Ошибка загрузки изображения');
          }

          const data = await response.json();
          const imagePath = data.path;

          // Використовуємо API endpoint для preview
          const previewPath = imagePath.startsWith('/blog/') || imagePath.startsWith('/events/')
            ? `/api/images${imagePath}`
            : imagePath;

          setPreview(previewPath);
          onChange(imagePath);
        } catch (error) {
          console.error('Upload error:', error);
          alert('Ошибка загрузки изображения. Попробуйте еще раз.');
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        alert('Ошибка чтения файла');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File handling error:', error);
      alert('Ошибка обработки файла');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.uploadContainer}>
      {preview ? (
        <div className={styles.preview}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
          <div className={styles.previewActions}>
            <button
              type="button"
              onClick={handleClick}
              className={styles.changeButton}
              disabled={isUploading}
            >
              Изменить
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className={styles.removeButton}
              disabled={isUploading}
            >
              <X size={16} />
              Удалить
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${isUploading ? styles.uploading : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className={styles.dropzoneContent}>
            {isUploading ? (
              <>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.dropzoneText}>Загрузка...</p>
              </>
            ) : (
              <>
                <Upload className={styles.uploadIcon} size={48} />
                <p className={styles.dropzoneText}>
                  Перетащите изображение сюда или <span className={styles.link}>выберите файл</span>
                </p>
                <p className={styles.dropzoneHint}>PNG, JPG, GIF до 5MB</p>
              </>
            )}
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;
