// // resources/js/Pages/Users/Profile/ProfilePage.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   User,
//   Settings,
//   Shield,
//   Award,
//   Camera,
//   Edit3,
//   Calendar,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   CreditCard,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';
// import { router, usePage } from '@inertiajs/react';
// import PageWrapper from '@/Layouts/PageWrapper';

// const ProfilePage = () => {
//   const { auth } = usePage().props;
//   const user = auth?.user;

//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     first_name: '',
//     middle_name: '',
//     first_surname: '',
//     second_surname: '',
//     document_type: '',
//     document_number: '',
//     phone: '',
//     address: '',
//     city: '',
//     postal_code: '',
//     date_of_birth: '',
//     gender: 'not_specified',
//     country_name: '',
//     state_name: '',
//     avatar_url: ''
//   });
//   const [loading, setLoading] = useState(true);

//   // Cargar datos del perfil
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         if (user?.profile) {
//           setProfileData({
//             first_name: user.profile.first_name || '',
//             middle_name: user.profile.middle_name || '',
//             first_surname: user.profile.first_surname || '',
//             second_surname: user.profile.second_surname || '',
//             document_type: user.profile.document_type || '',
//             document_number: user.profile.document_number || '',
//             phone: user.profile.phone || '',
//             address: user.profile.address || '',
//             city: user.profile.city || '',
//             postal_code: user.profile.postal_code || '',
//             date_of_birth: user.profile.date_of_birth || '',
//             gender: user.profile.gender || 'not_specified',
//             country_name: user.profile.country_name || '',
//             state_name: user.profile.state_name || '',
//             avatar_url: user.profile.avatar_url || ''
//           });
//         }
//       } catch (error) {
//         console.error('Error loading profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [user]);

//   const handleProfileChange = (field, value) => {
//     setProfileData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSaveProfile = () => {
//     // Aquí implementarás la API para guardar los cambios
//     console.log('Guardar perfil:', profileData);
//     setIsEditing(false);
//     alert('Perfil actualizado exitosamente');
//   };

//   const getGenderText = (genderCode) => {
//     switch(genderCode) {
//       case 'male': return 'Masculino';
//       case 'female': return 'Femenino';
//       case 'other': return 'Otro';
//       case 'not_specified': return 'No especificado';
//       default: return 'No especificado';
//     }
//   };

//   const getDocumentTypeText = (docType) => {
//     const types = {
//       'dni': 'DNI',
//       'passport': 'Pasaporte',
//       'venezolano': 'V',
//       'extranjero': 'E',
//       'rif': 'RIF',
//       'gobierno': 'G'
//     };
//     return types[docType] || docType;
//   };

//   const fullName = () => {
//     return [
//       profileData.first_name,
//       profileData.middle_name,
//       profileData.first_surname,
//       profileData.second_surname
//     ].filter(Boolean).join(' ');
//   };

//   const location = () => {
//     const parts = [];
//     if (profileData.city) parts.push(profileData.city);
//     if (profileData.state_name) parts.push(profileData.state_name);
//     if (profileData.country_name) parts.push(profileData.country_name);
//     return parts.join(', ') || 'No especificado';
//   };

//   if (loading) {
//     return (
//       <PageWrapper>
//         <div className="max-w-4xl mx-auto py-8">
//           <div className="text-center py-12">
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
//             </div>
//           </div>
//         </div>
//       </PageWrapper>
//     );
//   }

//   return (
//     <PageWrapper>
//       <div className="max-w-4xl mx-auto py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
//             <p className="text-gray-600 mt-2">
//               Gestiona la información que otros pueden ver sobre ti
//             </p>
//           </div>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//           >
//             <Edit3 className="w-4 h-4" />
//             {isEditing ? 'Cancelar' : 'Editar perfil'}
//           </button>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
//           {/* Cover Photo */}
//           <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
//             {isEditing && (
//               <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
//                 <Camera className="w-5 h-5" />
//               </button>
//             )}
//           </div>

//           {/* Profile Info */}
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row md:items-start gap-6">
//               {/* Avatar */}
//               <div className="relative">
//                 {profileData.avatar_url ? (
//                   <img
//                     src={profileData.avatar_url}
//                     alt="Avatar"
//                     className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
//                   />
//                 ) : (
//                   <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                     <User className="w-12 h-12 text-gray-400" />
//                   </div>
//                 )}
//                 {isEditing && (
//                   <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
//                     <Camera className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Basic Info */}
//               <div className="flex-1">
//                 <div className="flex flex-col md:flex-row md:items-start md:justify-between">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <h2 className="text-2xl font-bold text-gray-900">
//                         {fullName() || 'Nombre no especificado'}
//                       </h2>
//                       <div className="flex items-center gap-1">
//                         <Award className="w-5 h-5 text-yellow-500" />
//                         <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
//                           {user?.roles?.join(', ') || 'Usuario'}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="text-gray-600">{user?.email || 'Correo no especificado'}</p>
//                   </div>
//                   {isEditing && (
//                     <button
//                       onClick={handleSaveProfile}
//                       className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-2 md:mt-0"
//                     >
//                       Guardar cambios
//                     </button>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
//                   <span>Ubicación: {location()}</span>
//                 </div>

//                 {/* Badges */}
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {profileData.document_type && profileData.document_number && (
//                     <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                       {getDocumentTypeText(profileData.document_type)}: {profileData.document_number}
//                     </span>
//                   )}
//                   {profileData.date_of_birth && (
//                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                       <Calendar className="w-3 h-3 inline mr-1" />
//                       {profileData.date_of_birth}
//                     </span>
//                   )}
//                   <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
//                     <User className="w-3 h-3 inline mr-1" />
//                     {getGenderText(profileData.gender)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Información Personal */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <User className="w-5 h-5" />
//               Información Personal
//             </h3>

//             {!isEditing ? (
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Nombres completos</span>
//                   <span className="font-medium max-w-xs text-right truncate">
//                     {fullName() || 'No especificado'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Correo electrónico</span>
//                   <span className="font-medium max-w-xs text-right truncate">
//                     {user?.email || 'No especificado'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Teléfono</span>
//                   <span className="font-medium">
//                     {profileData.phone || 'No especificado'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Dirección</span>
//                   <span className="font-medium max-w-xs text-right truncate">
//                     {profileData.address || 'No especificado'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Ciudad</span>
//                   <span className="font-medium">
//                     {profileData.city || 'No especificado'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Código postal</span>
//                   <span className="font-medium">
//                     {profileData.postal_code || 'No especificado'}
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Primer nombre</label>
//                     <input
//                       type="text"
//                       value={profileData.first_name}
//                       onChange={(e) => handleProfileChange('first_name', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Primer nombre"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Segundo nombre</label>
//                     <input
//                       type="text"
//                       value={profileData.middle_name}
//                       onChange={(e) => handleProfileChange('middle_name', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Segundo nombre"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Primer apellido</label>
//                     <input
//                       type="text"
//                       value={profileData.first_surname}
//                       onChange={(e) => handleProfileChange('first_surname', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Primer apellido"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Segundo apellido</label>
//                     <input
//                       type="text"
//                       value={profileData.second_surname}
//                       onChange={(e) => handleProfileChange('second_surname', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Segundo apellido"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de documento</label>
//                     <select
//                       value={profileData.document_type}
//                       onChange={(e) => handleProfileChange('document_type', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Seleccionar</option>
//                       <option value="venezolano">V - Venezolano</option>
//                       <option value="extranjero">E - Extranjero</option>
//                       <option value="passport">P - Pasaporte</option>
//                       <option value="rif">J - RIF</option>
//                       <option value="gobierno">G - Gobierno</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Número de documento</label>
//                     <input
//                       type="text"
//                       value={profileData.document_number}
//                       onChange={(e) => handleProfileChange('document_number', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Número de documento"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
//                   <input
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={(e) => handleProfileChange('phone', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="+51 999 999 999"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
//                   <textarea
//                     value={profileData.address}
//                     onChange={(e) => handleProfileChange('address', e.target.value)}
//                     rows="2"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Dirección completa"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
//                     <input
//                       type="text"
//                       value={profileData.city}
//                       onChange={(e) => handleProfileChange('city', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Ciudad"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Código postal</label>
//                     <input
//                       type="text"
//                       value={profileData.postal_code}
//                       onChange={(e) => handleProfileChange('postal_code', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Código postal"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
//                     <input
//                       type="date"
//                       value={profileData.date_of_birth}
//                       onChange={(e) => handleProfileChange('date_of_birth', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
//                     <select
//                       value={profileData.gender}
//                       onChange={(e) => handleProfileChange('gender', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="not_specified">No especificado</option>
//                       <option value="male">Masculino</option>
//                       <option value="female">Femenino</option>
//                       <option value="other">Otro</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Preferencias y Configuración (Placeholder) */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Settings className="w-5 h-5" />
//               Preferencias y Configuración
//             </h3>

//             <div className="space-y-4 text-gray-600">
//               <p className="text-sm">
//                 Esta sección estará disponible próximamente para configurar tus preferencias
//                 de idioma, moneda, zona horaria y más.
//               </p>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <InfoIcon />
//                   <div>
//                     <h4 className="font-medium text-blue-800">Próximamente</h4>
//                     <p className="text-sm text-blue-700 mt-1">
//                       Podrás personalizar tu experiencia en la plataforma según tus preferencias.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Privacidad (Placeholder) */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <Shield className="w-5 h-5" />
//             Privacidad
//           </h3>

//           <div className="space-y-4 text-gray-600">
//             <p className="text-sm">
//               Esta sección estará disponible próximamente para gestionar quién puede ver
//               tu información y cómo se utilizan tus datos.
//             </p>
//             <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//               <div className="flex items-start gap-3">
//                 <LockIcon />
//                 <div>
//                   <h4 className="font-medium text-purple-800">Protección de datos</h4>
//                   <p className="text-sm text-purple-700 mt-1">
//                     Controlarás qué información es visible para otros usuarios y roles en el sistema.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Visibility Notice */}
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
//           <div className="flex items-start gap-3">
//             <EyeIcon />
//             <div>
//               <h4 className="font-medium text-yellow-800">Visibilidad de tu perfil</h4>
//               <p className="text-sm text-yellow-700 mt-1">
//                 Esta información puede ser vista por proveedores, super administradores,
//                 repartidores y otros roles autorizados en el sistema, según las políticas
//                 de privacidad y permisos configurados.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// // Iconos personalizados
// const InfoIcon = () => (
//   <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const LockIcon = () => (
//   <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//   </svg>
// );

// const EyeIcon = () => (
//   <Eye className="w-5 h-5 text-yellow-600 mt-0.5" />
// );

// export default ProfilePage;


// resources/js/Pages/User/Profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  User,
  Settings,
  Shield,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  CreditCard,
  Eye
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

const ProfilePage = () => {
  const { auth } = usePage().props;
  const user = auth?.user;

  const [profileData, setProfileData] = useState({
    first_name: '',
    middle_name: '',
    first_surname: '',
    second_surname: '',
    document_type: '',
    document_number: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    date_of_birth: '',
    gender: 'not_specified',
    country_name: '',
    state_name: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (user?.profile) {
      setProfileData({
        first_name: user.profile.first_name || '',
        middle_name: user.profile.middle_name || '',
        first_surname: user.profile.first_surname || '',
        second_surname: user.profile.second_surname || '',
        document_type: user.profile.document_type || '',
        document_number: user.profile.document_number || '',
        phone: user.profile.phone || '',
        address: user.profile.address || '',
        city: user.profile.city || '',
        postal_code: user.profile.postal_code || '',
        date_of_birth: user.profile.date_of_birth || '',
        gender: user.profile.gender || 'not_specified',
        country_name: user.profile.country_name || '',
        state_name: user.profile.state_name || '',
        avatar_url: user.profile.avatar_url || ''
      });
    }
  }, [user]);

  const getGenderText = (genderCode) => {
    switch(genderCode) {
      case 'male': return 'Masculino';
      case 'female': return 'Femenino';
      case 'other': return 'Otro';
      case 'not_specified': return 'No especificado';
      default: return 'No especificado';
    }
  };

  const getDocumentTypeText = (docType) => {
    const types = {
      'dni': 'DNI',
      'passport': 'Pasaporte',
      'venezolano': 'V',
      'extranjero': 'E',
      'rif': 'RIF',
      'gobierno': 'G'
    };
    return types[docType] || docType;
  };

  const fullName = () => {
    return [
      profileData.first_name,
      profileData.middle_name,
      profileData.first_surname,
      profileData.second_surname
    ].filter(Boolean).join(' ');
  };

  const location = () => {
    const parts = [];
    if (profileData.city) parts.push(profileData.city);
    if (profileData.state_name) parts.push(profileData.state_name);
    if (profileData.country_name) parts.push(profileData.country_name);
    return parts.join(', ') || 'No especificado';
  };

  return (
    <AutoLayoutResolver>
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600 mt-2">
              Información visible para otros usuarios del sistema
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative" />

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                {profileData.avatar_url ? (
                  <img
                    src={profileData.avatar_url}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {fullName() || 'Nombre no especificado'}
                      </h2>
                      <div className="flex items-center gap-1">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {user?.roles?.join(', ') || 'Usuario'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600">{user?.email || 'Correo no especificado'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                  <span>Ubicación: {location()}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {profileData.document_type && profileData.document_number && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {getDocumentTypeText(profileData.document_type)}: {profileData.document_number}
                    </span>
                  )}
                  {profileData.date_of_birth && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {profileData.date_of_birth}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    <User className="w-3 h-3 inline mr-1" />
                    {getGenderText(profileData.gender)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información Personal */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Personal
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Nombres completos</span>
              <span className="font-medium max-w-xs text-right truncate">
                {fullName() || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Correo electrónico</span>
              <span className="font-medium max-w-xs text-right truncate">
                {user?.email || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teléfono</span>
              <span className="font-medium">
                {profileData.phone || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dirección</span>
              <span className="font-medium max-w-xs text-right truncate">
                {profileData.address || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ciudad</span>
              <span className="font-medium">
                {profileData.city || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Código postal</span>
              <span className="font-medium">
                {profileData.postal_code || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Documento de identidad</span>
              <span className="font-medium">
                {profileData.document_type && profileData.document_number
                  ? `${getDocumentTypeText(profileData.document_type)}: ${profileData.document_number}`
                  : 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha de nacimiento</span>
              <span className="font-medium">
                {profileData.date_of_birth || 'No especificado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Género</span>
              <span className="font-medium">
                {getGenderText(profileData.gender)}
              </span>
            </div>
          </div>
        </div>

        {/* Preferencias y Configuración */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Preferencias y Configuración
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Idioma</span>
              <span className="font-medium">No configurado</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Moneda</span>
              <span className="font-medium">No configurado</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Zona horaria</span>
              <span className="font-medium">No configurado</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sistema de medidas</span>
              <span className="font-medium">No configurado</span>
            </div>
          </div>
        </div>

        {/* Privacidad */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacidad
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <span className="text-gray-600">Perfil público</span>
              </div>
              <span className="font-medium text-red-600">Privado</span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-gray-600">Compartir datos de uso</span>
              </div>
              <span className="font-medium text-red-600">Deshabilitado</span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-gray-600">Correos de marketing</span>
              </div>
              <span className="font-medium text-red-600">Deshabilitado</span>
            </div>
          </div>
        </div>

        {/* Visibility Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Visibilidad de tu perfil</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Esta información puede ser vista por proveedores, super administradores,
                repartidores y otros roles autorizados en el sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AutoLayoutResolver>
  );
};

export default ProfilePage;
