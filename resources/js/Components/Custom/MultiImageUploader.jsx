// resources/js/Components/Custom/MultiImageUploader.jsx
import { useRef, useState } from 'react';
import { ImageIcon, Star, Trash2, Plus } from 'lucide-react';

const MultiImageUploader = ({
  onMainImageSelect,
  onGalleryImagesSelect,
  initialMainImage = null,
  initialGallery = []
}) => {
  const fileInputRef = useRef(null);
  const [mainImage, setMainImage] = useState(initialMainImage);
  const [galleryImages, setGalleryImages] = useState(initialGallery);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newGallery = [...galleryImages];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newGallery.push({ file, url: reader.result });
        setGalleryImages([...newGallery]);
        if (onGalleryImagesSelect) onGalleryImagesSelect([...newGallery]);
      };
      reader.readAsDataURL(file);
    });
  };

  const setAsMain = (index) => {
    const selected = galleryImages[index];
    setMainImage(selected.url);
    if (onMainImageSelect) onMainImageSelect(selected.file);
  };

  const removeFromGallery = (index) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    if (onGalleryImagesSelect) onGalleryImagesSelect(updated);
    // Si se elimina la portada, limpiarla
    if (mainImage === galleryImages[index]?.url) {
      setMainImage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Galería de Imágenes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Galería de Imágenes ({galleryImages.length})
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Añadir Imágenes
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          multiple
          className="hidden"
        />

        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => {
              const isMain = mainImage === img.url;
              return (
                <div key={index} className="relative group">
                  <div className="w-full h-200 aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={img.url}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {isMain && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Portada
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAsMain(index);
                      }}
                      className="flex flex-col items-center text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg px-3 py-1.5 transition-colors"
                      title="Usar como portada"
                    >
                      <Star className="w-4 h-4" />
                      <span className="text-xs mt-1">Portada</span>
                    </button>

                    {!isMain && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromGallery(index);
                        }}
                        className="flex flex-col items-center text-white bg-red-500 hover:bg-red-600 rounded-lg px-3 py-1.5 transition-colors"
                        title="Eliminar de la galería"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs mt-1">Eliminar</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-gray-500 text-sm">No hay imágenes en la galería</p>
            <p className="text-gray-400 text-xs mt-1">Sube imágenes para crear una galería</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageUploader;
