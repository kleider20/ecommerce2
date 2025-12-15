// resources/js/Components/Custom/ImageUploader.jsx
import { useRef, useState } from 'react';

const ImageUploader = ({
  onUploadSuccess,
  onPreviewChange, // 👈 Nueva función para vista previa local
  initialImageUrl = null
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(initialImageUrl);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 👇 Vista previa local inmediata
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target.result;
      setPreview(previewUrl);
      if (onPreviewChange) onPreviewChange(previewUrl);
    };
    reader.readAsDataURL(file);

    // 👇 Subida al servidor (opcional)
    if (onUploadSuccess) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'products');

      fetch(route('upload.image'), {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            onUploadSuccess(data.url, data.path);
          }
        })
        .finally(() => setUploading(false));
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col items-center">
      {preview ? (
        <img
          src={preview}
          alt="Vista previa"
          className="w-32 h-32 object-cover rounded-lg mb-2 border"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center border-2 border-dashed border-gray-300">
          <span className="text-gray-400 text-sm">Sin imagen</span>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
      >
        {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
      </button>
    </div>
  );
};

export default ImageUploader;
