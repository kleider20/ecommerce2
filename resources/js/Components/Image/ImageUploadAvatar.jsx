// // resources/js/Components/Image/ImageUploader.jsx
// import { useRef, useState } from 'react';

// const ImageUploader = ({
//   onUploadSuccess,
//   onPreviewChange, // 👈 Nueva función para vista previa local
//   initialImageUrl = null
// }) => {
//   const fileInputRef = useRef(null);
//   const [preview, setPreview] = useState(initialImageUrl);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // 👇 Vista previa local inmediata
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const previewUrl = e.target.result;
//       setPreview(previewUrl);
//       if (onPreviewChange) onPreviewChange(previewUrl);
//     };
//     reader.readAsDataURL(file);

//     // 👇 Subida al servidor (opcional)
//     if (onUploadSuccess) {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('folder', 'products');

//       fetch(route('upload.image'), {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//         }
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.success) {
//             onUploadSuccess(data.url, data.path);
//           }
//         })
//         .finally(() => setUploading(false));
//     }

//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {preview ? (
//         <img
//           src={preview}
//           alt="Vista previa"
//           className="w-32 h-32 object-cover rounded-lg mb-2 border"
//         />
//       ) : (
//         <div className="w-32 h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center border-2 border-dashed border-gray-300">
//           <span className="text-gray-400 text-sm">Sin imagen</span>
//         </div>
//       )}

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept="image/*"
//         className="hidden"
//       />

//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         disabled={uploading}
//         className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
//       >
//         {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
//       </button>
//     </div>
//   );
// };

// export default ImageUploader;


// // resources/js/Components/Image/ImageUploader.jsx
// import { useRef, useState } from 'react';

// const ImageUploader = ({
//   onUploadSuccess,
//   onPreviewChange,
//   initialImageUrl = null,
//   uploadUrl = null // 👈 Se pasa la ruta desde el padre
// }) => {
//   const fileInputRef = useRef(null);
//   const [preview, setPreview] = useState(initialImageUrl);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Vista previa local inmediata
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const previewUrl = e.target.result;
//       setPreview(previewUrl);
//       if (onPreviewChange) onPreviewChange(previewUrl);
//     };
//     reader.readAsDataURL(file);

//     // Subida al servidor si hay una URL definida
//     if (uploadUrl) {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append('image', file);

//       fetch(uploadUrl, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//         }
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.success) {
//             onUploadSuccess(data.url, data.path);
//           } else {
//             alert('Error al subir: ' + (data.message || 'Intente de nuevo'));
//           }
//         })
//         .catch(err => {
//           console.error('Upload error:', err);
//           alert('Error de conexión al subir imagen');
//         })
//         .finally(() => setUploading(false));
//     }

//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {preview ? (
//         <img
//           src={preview}
//           alt="Avatar"
//           className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-white shadow-sm"
//         />
//       ) : (
//         <div className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
//           <span className="text-gray-400 text-xs text-center px-2">Sin foto de perfil</span>
//         </div>
//       )}

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept="image/*"
//         className="hidden"
//       />

//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         disabled={uploading}
//         className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
//       >
//         {uploading ? 'Subiendo...' : 'Cambiar Imagen'}
//       </button>
//     </div>
//   );
// };

// export default ImageUploader;


// import { useRef, useState } from 'react';

// const ImageUploader = ({
//   onUploadSuccess,
//   onPreviewChange,
//   initialImageUrl = null,
//   uploadUrl = null
// }) => {
//   const fileInputRef = useRef(null);
//   const [preview, setPreview] = useState(initialImageUrl);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]; // ✅ Corregido: seleccionamos el primer archivo
//     if (!file) return;

//     // Vista previa local inmediata
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const previewUrl = e.target.result;
//       setPreview(previewUrl);
//       if (onPreviewChange) onPreviewChange(previewUrl);
//     };
//     reader.readAsDataURL(file);

//     // Proceso de subida
//     if (uploadUrl) {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append('image', file);

//       fetch(uploadUrl, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//           'Accept': 'application/json', // ✅ Importante para recibir JSON
//         }
//       })
//         .then(async (res) => {
//           const data = await res.json();
//           if (res.ok && data.success) {
//             onUploadSuccess(data.url, data.path);
//           } else {
//             alert('Error: ' + (data.message || 'No se pudo subir la imagen'));
//           }
//         })
//         .catch(err => {
//           console.error('Error de red:', err);
//           alert('Error de conexión al servidor. Verifique Laragon.');
//         })
//         .finally(() => setUploading(false));
//     }

//     // Limpiar el input para permitir subir la misma imagen si se desea
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="relative group">
//         {preview ? (
//           <img
//             src={preview}
//             alt="Vista previa"
//             className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-white shadow-md transition-opacity group-hover:opacity-75"
//           />
//         ) : (
//           <div className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
//             <span className="text-gray-400 text-xs text-center px-2">Sin foto</span>
//           </div>
//         )}
//         {uploading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full mb-4">
//              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )}
//       </div>

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept="image/*"
//         className="hidden"
//       />

//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         disabled={uploading}
//         className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-full hover:bg-gray-700 transition-all disabled:opacity-50 uppercase tracking-wider"
//       >
//         {uploading ? 'Cargando...' : 'Cambiar Imagen'}
//       </button>
//     </div>
//   );
// };

// export default ImageUploader;


// resources/js/Components/Image/ImageUploadAvatar.jsx
import { useRef, useState, useEffect } from 'react';

const ImageUploadAvatar = ({
  onUploadSuccess,
  initialImageUrl = null,
  uploadUrl = null
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(initialImageUrl);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreview(initialImageUrl);
  }, [initialImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    if (uploadUrl) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          'Accept': 'application/json',
        }
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok && data.success) {
            onUploadSuccess(data.url, data.path);
            setPreview(data.url);
          } else {
            alert('Error: ' + (data.message || 'No se pudo subir la imagen'));
            setPreview(initialImageUrl);
          }
        })
        .catch(err => {
          console.error('Error:', err);
          alert('Error de conexión');
          setPreview(initialImageUrl);
        })
        .finally(() => setUploading(false));
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center border border-gray-100 shadow-sm">
      <div className="relative group">
        {preview ? (
          <img
            src={preview}
            alt="Foto de perfil"
            className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-400 text-sm text-center px-2">Sin foto</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

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
        className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-full hover:bg-gray-700 transition-all disabled:opacity-50 uppercase tracking-wider"
      >
        {uploading ? 'Cargando...' : 'Cambiar Imagen'}
      </button>

      <h3 className="mt-3 text-sm font-semibold text-gray-900">Foto de perfil</h3>
      <p className="text-[11px] text-gray-500 mt-1 text-center">
        Esta foto será visible para otros usuarios.
      </p>
    </div>
  );
};

export default ImageUploadAvatar;
