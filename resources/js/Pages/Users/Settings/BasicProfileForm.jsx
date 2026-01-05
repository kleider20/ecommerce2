// // resources/js/Pages/User/Settings/BasicProfileForm.jsx
// import React, { useState, useEffect } from 'react';
// import { User, Mail } from 'lucide-react';

// const BasicProfileForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Cargar datos iniciales
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('/api/user/basic-profile');
//         const data = await response.json();
//         setFormData({
//           name: data.name || '',
//           email: data.email || ''
//         });
//       } catch (error) {
//         console.error('Error loading profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const response = await fetch('/api/user/basic-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         alert('¡Perfil actualizado correctamente!');
//       } else {
//         const error = await response.json();
//         alert('Error: ' + (error.message || 'No se pudo guardar'));
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error al guardar los datos');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-4">Cargando...</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Nombre de usuario *
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => handleChange('name', e.target.value)}
//               className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Correo electrónico *
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleChange('email', e.target.value)}
//               className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex justify-end">
//         <button
//           type="submit"
//           disabled={submitting}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
//         >
//           {submitting ? 'Guardando...' : 'Actualizar Perfil'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BasicProfileForm;


// import React, { useState, useEffect } from 'react';
// import { User, Mail } from 'lucide-react';
// import ImageUploader from '@/Components/Image/ImageUploader'; // Ajusta la ruta según tu proyecto

// const BasicProfileForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     avatar: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('/api/user/basic-profile');
//         const data = await response.json();
//         setFormData({
//           name: data.name || '',
//           email: data.email || '',
//           avatar: data.avatar || ''
//         });
//       } catch (error) {
//         console.error('Error loading profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleAvatarSuccess = (url, path) => {
//     // Actualizamos el estado con la nueva URL de la imagen
//     setFormData(prev => ({ ...prev, avatar: url }));
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const response = await fetch('/api/user/basic-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//         },
//         body: JSON.stringify({
//             name: formData.name,
//             email: formData.email
//         })
//       });

//       if (response.ok) {
//         alert('¡Perfil actualizado correctamente!');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div className="text-center py-4">Cargando...</div>;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* SECCIÓN DE AVATAR */}
//       <div className="flex flex-col items-center pb-6 border-b border-gray-100">
//         <label className="block text-sm font-medium text-gray-700 mb-4">
//           Foto de Perfil
//         </label>
//         <ImageUploader
//           initialImageUrl={formData.avatar}
//           onUploadSuccess={handleAvatarSuccess}
//           // Cambiamos el endpoint a uno específico de avatar si lo prefieres
//           // o ajustamos el ImageUploader para recibir la URL por prop
//         />
//       </div>

//       <div className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de usuario *</label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => handleChange('name', e.target.value)}
//               className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleChange('email', e.target.value)}
//               className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end pt-4">
//         <button
//           type="submit"
//           disabled={submitting}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
//         >
//           {submitting ? 'Guardando...' : 'Actualizar Perfil'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BasicProfileForm;


// // resources/js/Pages/User/Settings/BasicProfileForm.jsx
// import React, { useState, useEffect } from 'react';
// import { User, Mail } from 'lucide-react';
// import ImageUploader from '@/Components/Image/ImageUploader';

// const BasicProfileForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     avatar: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Cargar datos iniciales desde el backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('/api/user/basic-profile');
//         const data = await response.json();
//         setFormData({
//           name: data.name || '',
//           email: data.email || '',
//           avatar: data.avatar ? `/storage/${data.avatar}` : null // Asegurar URL correcta
//         });
//       } catch (error) {
//         console.error('Error loading profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleAvatarSuccess = (url, path) => {
//     // La imagen se guarda en el servidor inmediatamente mediante ImageUploader
//     setFormData(prev => ({ ...prev, avatar: url }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const response = await fetch('/api/user/basic-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email
//         })
//       });

//       if (response.ok) {
//         alert('¡Datos actualizados correctamente!');
//       } else {
//         const error = await response.json();
//         alert('Error: ' + (error.message || 'No se pudo guardar'));
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error al guardar los datos');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center py-10 text-gray-500">Cargando datos...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-8">

//         {/* Sección de Avatar */}
//         <div className="flex flex-col items-center justify-center p-6 border-b border-gray-100">
//           <ImageUploader
//             initialImageUrl={formData.avatar}
//             uploadUrl={route('upload.avatar')}
//             onUploadSuccess={handleAvatarSuccess}
//           />
//           <p className="text-xs text-gray-500 mt-2">JPG, PNG o WebP. Máx 2MB.</p>
//         </div>

//         {/* Campos de Texto */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Nombre Público *
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => handleChange('name', e.target.value)}
//                 className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 placeholder="Tu nombre o alias"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Correo Electrónico *
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange('email', e.target.value)}
//                 className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 placeholder="correo@ejemplo.com"
//                 required
//               />
//             </div>
//             <p className="text-[11px] text-gray-500 mt-1">Este correo se utiliza para iniciar sesión y recibir notificaciones.</p>
//           </div>
//         </div>

//         <div className="pt-4 flex justify-end">
//           <button
//             type="submit"
//             disabled={submitting}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-50"
//           >
//             {submitting ? 'Guardando...' : 'Guardar Cambios'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BasicProfileForm;


// resources/js/Pages/User/Settings/BasicProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { User, Mail } from 'lucide-react';
import ImageUploadAvatar from '@/Components/Image/ImageUploadAvatar';
import { router } from '@inertiajs/react';

const BasicProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: null // 👈 Inicializa como null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/basic-profile');
        const data = await response.json();

        // 👇 Establece avatar como null si no existe
        setFormData({
          name: data.name || '',
          email: data.email || '',
          avatar: data.profile?.avatar_url || null
        });
      } catch (error) {
        console.error('Error cargando perfil:', error);
        setFormData(prev => ({ ...prev, avatar: null })); // 👈 Asegura null en error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarSuccess = (url, path) => {
    setFormData(prev => ({ ...prev, avatar: url }));
    router.reload({ only: ['auth'] });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/basic-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ name: formData.name, email: formData.email })
      });

      if (response.ok) {
        alert('¡Perfil actualizado con éxito!');
        router.reload({ only: ['auth'] });
      } else {
        alert('Hubo un problema al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 text-gray-400 italic">
        Cargando...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar */}
        <ImageUploadAvatar
            initialImageUrl={formData.avatar}
            uploadUrl={route('upload.avatar')}
            onUploadSuccess={handleAvatarSuccess}
        />


        {/* Formulario */}
        <div className="space-y-5">
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Nombre de usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg"
          >
            Guardar cambios del perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicProfileForm;
