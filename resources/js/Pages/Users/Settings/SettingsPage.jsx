// // resources/js/Pages/User/Settings/SettingsPage.jsx
// import React, { useState } from 'react';
// import { Head } from '@inertiajs/react';
// import {
//   User,
//   Bell,
//   Shield,
//   Globe,
//   Lock,
//   Settings as SettingsIcon
// } from 'lucide-react';

// // Formularios
// import PersonalInfoForm from './PersonalInfoForm';
// import NotificationsForm from './NotificationsForm';
// import PrivacyForm from './PrivacyForm';
// import LanguageRegionForm from './LanguageRegionForm';
// import SecurityForm from './SecurityForm';
// import PreferencesForm from './PreferencesForm';

// import PageWrapper from '@/Layouts/PageWrapper';

// const SettingsPage = ({ config, languages, timezones, currencies }) => {
//   const [activeTab, setActiveTab] = useState('personal');

//   const handleSave = (section, data) => {
//     console.log(`Guardando ${section}:`, data);
//     alert(`¡${section} actualizado correctamente!`);
//   };

//   const renderActiveTab = () => {
//     switch (activeTab) {
//       case 'personal':
//         return <PersonalInfoForm config={config} onSave={(data) => handleSave('Información Personal', data)} />;
//       case 'notifications':
//         return <NotificationsForm config={config} onSave={(data) => handleSave('Notificaciones', data)} />;
//       case 'privacy':
//         return <PrivacyForm config={config} onSave={(data) => handleSave('Privacidad', data)} />;
//       case 'language':
//         return <LanguageRegionForm
//           config={config}
//           languages={languages}
//           timezones={timezones}
//           currencies={currencies}
//           onSave={(data) => handleSave('Idioma y Región', data)}
//         />;
//       case 'security':
//         return <SecurityForm config={config} onSave={(data) => handleSave('Seguridad', data)} />;
//       case 'preferences':
//         return <PreferencesForm config={config} onSave={(data) => handleSave('Preferencias', data)} />;
//       default:
//         return <PersonalInfoForm config={config} onSave={(data) => handleSave('Información Personal', data)} />;
//     }
//   };

//   const tabItems = [
//     {
//       id: 'personal',
//       label: 'Información Personal',
//       description: 'Actualiza tu nombre, correo y detalles de contacto',
//       icon: User
//     },
//     {
//       id: 'notifications',
//       label: 'Notificaciones',
//       description: 'Controla cómo y cuándo recibes notificaciones',
//       icon: Bell
//     },
//     {
//       id: 'privacy',
//       label: 'Privacidad',
//       description: 'Gestiona quién puede ver tu información',
//       icon: Shield
//     },
//     {
//       id: 'language',
//       label: 'Idioma y Región',
//       description: 'Personaliza tu experiencia según tu ubicación',
//       icon: Globe
//     },
//     {
//       id: 'security',
//       label: 'Seguridad',
//       description: 'Protege tu cuenta con autenticación avanzada',
//       icon: Lock
//     },
//     {
//       id: 'preferences',
//       label: 'Preferencias',
//       description: 'Ajusta el comportamiento de la plataforma',
//       icon: SettingsIcon
//     }
//   ];

//   return (
//     <PageWrapper>
//       <Head title="Configuración" />

//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuenta</h1>
//           <p className="text-gray-600 mt-2">
//             Personaliza tu experiencia y mantén tu cuenta segura
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar de pestañas compactas */}
//           <div className="lg:w-64 flex-shrink-0">
//             <nav className="space-y-1">
//               {tabItems.map(tab => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
//                       activeTab === tab.id
//                         ? 'bg-blue-50 text-blue-700 border border-blue-200'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <IconComponent className={`w-4 h-4 ${
//                       activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
//                     }`} />
//                     <div className="text-left">
//                       <div className="text-sm font-medium">{tab.label}</div>
//                       <div className={`text-xs mt-0.5 ${
//                         activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
//                       }`}>
//                         {tab.description}
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Área de contenido principal */}
//           <div className="flex-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="px-6 py-5 border-b border-gray-100">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {tabItems.find(t => t.id === activeTab)?.label}
//                 </h2>
//               </div>
//               <div className="p-6">
//                 {renderActiveTab()}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// export default SettingsPage;

// // resources/js/Pages/User/Settings/SettingsPage.jsx
// import React, { useState } from 'react';
// import { Head } from '@inertiajs/react';
// import {
//   User,
//   Bell,
//   Shield,
//   Globe,
//   Lock,
//   Settings as SettingsIcon
// } from 'lucide-react';

// // Formularios
// import PersonalInfoForm from './PersonalInfoForm';
// import NotificationsForm from './NotificationsForm';
// import PrivacyForm from './PrivacyForm';
// import LanguageRegionForm from './LanguageRegionForm';
// import SecurityForm from './SecurityForm';
// import PreferencesForm from './PreferencesForm';

// import PageWrapper from '@/Layouts/PageWrapper';

// const SettingsPage = ({ config, languages, timezones, currencies }) => {
//   const [activeTab, setActiveTab] = useState('personal');

//   const handleSave = (section, data) => {
//     console.log(`Guardando ${section}:`, data);
//     alert(`¡${section} actualizado correctamente!`);
//   };

//   const renderActiveTab = () => {
//     switch (activeTab) {
//       case 'personal':
//         return <PersonalInfoForm config={config} onSave={(data) => handleSave('Información Personal', data)} />;
//       case 'notifications':
//         return <NotificationsForm config={config} onSave={(data) => handleSave('Notificaciones', data)} />;
//       case 'privacy':
//         return <PrivacyForm config={config} onSave={(data) => handleSave('Privacidad', data)} />;
//       case 'language':
//         return <LanguageRegionForm
//           config={config}
//           languages={languages}
//           timezones={timezones}
//           currencies={currencies}
//           onSave={(data) => handleSave('Idioma y Región', data)}
//         />;
//       case 'security':
//         return <SecurityForm config={config} onSave={(data) => handleSave('Seguridad', data)} />;
//       case 'preferences':
//         return <PreferencesForm config={config} onSave={(data) => handleSave('Preferencias', data)} />;
//       default:
//         return <PersonalInfoForm config={config} onSave={(data) => handleSave('Información Personal', data)} />;
//     }
//   };

//   const tabItems = [
//     {
//       id: 'personal',
//       label: 'Información Personal',
//       description: 'Actualiza tu nombre, correo y detalles de contacto',
//       icon: User,
//       color: 'bg-blue-500 hover:bg-blue-600 text-white',
//       activeColor: 'bg-blue-600 text-white shadow-sm'
//     },
//     {
//       id: 'notifications',
//       label: 'Notificaciones',
//       description: 'Controla cómo y cuándo recibes notificaciones',
//       icon: Bell,
//       color: 'bg-purple-500 hover:bg-purple-600 text-white',
//       activeColor: 'bg-purple-600 text-white shadow-sm'
//     },
//     {
//       id: 'privacy',
//       label: 'Privacidad',
//       description: 'Gestiona quién puede ver tu información',
//       icon: Shield,
//       color: 'bg-green-500 hover:bg-green-600 text-white',
//       activeColor: 'bg-green-600 text-white shadow-sm'
//     },
//     {
//       id: 'language',
//       label: 'Idioma y Región',
//       description: 'Personaliza tu experiencia según tu ubicación',
//       icon: Globe,
//       color: 'bg-amber-500 hover:bg-amber-600 text-white',
//       activeColor: 'bg-amber-600 text-white shadow-sm'
//     },
//     {
//       id: 'security',
//       label: 'Seguridad',
//       description: 'Protege tu cuenta con autenticación avanzada',
//       icon: Lock,
//       color: 'bg-red-500 hover:bg-red-600 text-white',
//       activeColor: 'bg-red-600 text-white shadow-sm'
//     },
//     {
//       id: 'preferences',
//       label: 'Preferencias',
//       description: 'Ajusta el comportamiento de la plataforma',
//       icon: SettingsIcon,
//       color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
//       activeColor: 'bg-indigo-600 text-white shadow-sm'
//     }
//   ];

//   return (
//     <PageWrapper>
//       <Head title="Configuración" />

//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuenta</h1>
//           <p className="text-gray-600 mt-2">
//             Personaliza tu experiencia y mantén tu cuenta segura
//           </p>
//         </div>

//         {/* Pestañas superiores con colores llamativos */}
//         <div className="flex flex-wrap gap-3">
//           {tabItems.map(tab => {
//             const IconComponent = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex flex-col items-start p-4 rounded-xl transition-all duration-200 min-w-[160px] ${
//                   isActive ? tab.activeColor : tab.color
//                 }`}
//               >
//                 <div className="flex items-center gap-2 mb-1">
//                   <IconComponent className="w-4 h-4" />
//                   <span className="font-medium text-sm">{tab.label}</span>
//                 </div>
//                 <p className="text-xs opacity-90 mt-1 text-left">
//                   {tab.description}
//                 </p>
//               </button>
//             );
//           })}
//         </div>

//         {/* Área de formulario debajo */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="px-6 py-5">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {tabItems.find(t => t.id === activeTab)?.label}
//             </h2>
//           </div>
//           <div className="px-6 pb-6">
//             {renderActiveTab()}
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// export default SettingsPage;


// // resources/js/Pages/User/Settings/SettingsPage.jsx
// import React, { useState } from 'react';
// import { Head } from '@inertiajs/react';
// import {
//   User,
//   Bell,
//   Shield,
//   Globe,
//   Lock,
//   Settings as SettingsIcon
// } from 'lucide-react';

// // Formularios
// import PersonalInfoForm from './PersonalInfoForm';
// import NotificationsForm from './NotificationsForm';
// import PrivacyForm from './PrivacyForm';
// import LanguageRegionForm from './LanguageRegionForm';
// import SecurityForm from './SecurityForm';
// import PreferencesForm from './PreferencesForm';

// import PageWrapper from '@/Layouts/PageWrapper';

// const SettingsPage = ({ config, languages, timezones, currencies }) => {
//   const [activeTab, setActiveTab] = useState('personal');

//   const handleSave = (section, data) => {
//     console.log(`Guardando ${section}:`, data);
//     alert(`¡${section} actualizado correctamente!`);
//   };

//   const renderActiveTab = () => {
//     switch (activeTab) {
//       case 'personal':
//         return <PersonalInfoForm config={config} onSave={(data) => handleSave('Información Personal', data)} />;
//       case 'notifications':
//         return <NotificationsForm config={config} onSave={(data) => handleSave('Notificaciones', data)} />;
//       case 'privacy':
//         return <PrivacyForm config={config} onSave={(data) => handleSave('Privacidad', data)} />;
//       case 'language':
//         return <LanguageRegionForm
//           config={config}
//           languages={languages}
//           timezones={timezones}
//           currencies={currencies}
//           onSave={(data) => handleSave('Idioma y Región', data)}
//         />;
//       case 'security':
//         return <SecurityForm config={config} onSave={(data) => handleSave('Seguridad', data)} />;
//       case 'preferences':
//         return <PreferencesForm config={config} onSave={(data) => handleSave('Preferencias', data)} />;
//       default:
//         return <PersonalInfoForm config={config} onSave={(data) => handleSave('Información Personal', data)} />;
//     }
//   };

//   const tabItems = [
//     {
//       id: 'personal',
//       label: 'Información Personal',
//       description: 'Actualiza tu nombre, correo y detalles de contacto',
//       icon: User,
//       color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
//       activeColor: 'bg-blue-200 text-blue-800 border border-blue-300'
//     },
//     {
//       id: 'notifications',
//       label: 'Notificaciones',
//       description: 'Controla cómo y cuándo recibes notificaciones',
//       icon: Bell,
//       color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
//       activeColor: 'bg-purple-200 text-purple-800 border border-purple-300'
//     },
//     {
//       id: 'privacy',
//       label: 'Privacidad',
//       description: 'Gestiona quién puede ver tu información',
//       icon: Shield,
//       color: 'bg-green-100 text-green-700 hover:bg-green-200',
//       activeColor: 'bg-green-200 text-green-800 border border-green-300'
//     },
//     {
//       id: 'language',
//       label: 'Idioma y Región',
//       description: 'Personaliza tu experiencia según tu ubicación',
//       icon: Globe,
//       color: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
//       activeColor: 'bg-amber-200 text-amber-800 border border-amber-300'
//     },
//     {
//       id: 'security',
//       label: 'Seguridad',
//       description: 'Protege tu cuenta con autenticación avanzada',
//       icon: Lock,
//       color: 'bg-red-100 text-red-700 hover:bg-red-200',
//       activeColor: 'bg-red-200 text-red-800 border border-red-300'
//     },
//     {
//       id: 'preferences',
//       label: 'Preferencias',
//       description: 'Ajusta el comportamiento de la plataforma',
//       icon: SettingsIcon,
//       color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
//       activeColor: 'bg-indigo-200 text-indigo-800 border border-indigo-300'
//     }
//   ];

//   return (
//     <PageWrapper>
//       <Head title="Configuración" />

//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuenta</h1>
//           <p className="text-gray-600 mt-2">
//             Personaliza tu experiencia y mantén tu cuenta segura
//           </p>
//         </div>

//         {/* Pestañas superiores con colores suaves y tamaño consistente */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {tabItems.map(tab => {
//             const IconComponent = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 h-full min-h-[100px] ${
//                   isActive ? tab.activeColor : tab.color
//                 }`}
//               >
//                 <IconComponent className="w-5 h-5 mb-2" />
//                 <span className="text-xs font-medium text-center">{tab.label}</span>
//                 <p className="text-[10px] opacity-80 mt-1 text-center hidden md:block">
//                   {tab.description}
//                 </p>
//               </button>
//             );
//           })}
//         </div>

//         {/* Área de formulario debajo */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="px-6 py-5">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {tabItems.find(t => t.id === activeTab)?.label}
//             </h2>
//           </div>
//           <div className="px-6 pb-6">
//             {renderActiveTab()}
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// export default SettingsPage;


// // // resources/js/Pages/User/Settings/SettingsPage.jsx
// // import React, { useState } from 'react';
// // import { Head } from '@inertiajs/react';
// // import {
// //   User,
// //   Bell,
// //   Shield,
// //   Globe,
// //   Lock,
// //   Settings as SettingsIcon
// // } from 'lucide-react';

// // // Formularios (ahora autónomos)
// // import PersonalInfoForm from './PersonalInfoForm';
// // import NotificationsForm from './NotificationsForm';
// // import PrivacyForm from './PrivacyForm';
// // import LanguageRegionForm from './LanguageRegionForm';
// // import SecurityForm from './SecurityForm';
// // import PreferencesForm from './PreferencesForm';

// // import PageWrapper from '@/Layouts/PageWrapper';

// // const SettingsPage = () => { // 👈 Eliminado: config, languages, timezones, currencies
// //   const [activeTab, setActiveTab] = useState('personal');

// //   // ❌ Eliminado: handleSave y renderActiveTab (los formularios se auto-gestionan)

// //   const tabItems = [
//         {
//       id: 'basic',
//       label: 'Perfil Básico',
//       description: 'Edita tu nombre y correo electrónico',
//       icon: User,
//       color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
//       activeColor: 'bg-blue-200 text-blue-800 border border-blue-300'
//     },
// //     {
// //       id: 'personal',
// //       label: 'Información Personal',
// //       description: 'Actualiza tu nombre, documento y detalles de contacto',
// //       icon: User,
// //       color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
// //       activeColor: 'bg-blue-200 text-blue-800 border border-blue-300'
// //     },
// //     {
// //       id: 'notifications',
// //       label: 'Notificaciones',
// //       description: 'Controla cómo y cuándo recibes notificaciones',
// //       icon: Bell,
// //       color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
// //       activeColor: 'bg-purple-200 text-purple-800 border border-purple-300'
// //     },
// //     {
// //       id: 'privacy',
// //       label: 'Privacidad',
// //       description: 'Gestiona quién puede ver tu información',
// //       icon: Shield,
// //       color: 'bg-green-100 text-green-700 hover:bg-green-200',
// //       activeColor: 'bg-green-200 text-green-800 border border-green-300'
// //     },
// //     {
// //       id: 'language',
// //       label: 'Idioma y Región',
// //       description: 'Personaliza tu experiencia según tu ubicación',
// //       icon: Globe,
// //       color: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
// //       activeColor: 'bg-amber-200 text-amber-800 border border-amber-300'
// //     },
// //     {
// //       id: 'security',
// //       label: 'Seguridad',
// //       description: 'Protege tu cuenta con autenticación avanzada',
// //       icon: Lock,
// //       color: 'bg-red-100 text-red-700 hover:bg-red-200',
// //       activeColor: 'bg-red-200 text-red-800 border border-red-300'
// //     },
// //     {
// //       id: 'preferences',
// //       label: 'Preferencias',
// //       description: 'Ajusta el comportamiento de la plataforma',
// //       icon: SettingsIcon,
// //       color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
// //       activeColor: 'bg-indigo-200 text-indigo-800 border border-indigo-300'
// //     }
// //   ];

// //   return (
// //     <PageWrapper>
// //       <Head title="Configuración" />

// //       <div className="max-w-6xl mx-auto space-y-8">
// //         {/* Header */}
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuenta</h1>
// //           <p className="text-gray-600 mt-2">
// //             Personaliza tu experiencia y mantén tu cuenta segura
// //           </p>
// //         </div>

// //         {/* Pestañas superiores */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// //           {tabItems.map(tab => {
// //             const IconComponent = tab.icon;
// //             const isActive = activeTab === tab.id;

// //             return (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => setActiveTab(tab.id)}
// //                 className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 h-full min-h-[100px] ${
// //                   isActive ? tab.activeColor : tab.color
// //                 }`}
// //               >
// //                 <IconComponent className="w-5 h-5 mb-2" />
// //                 <span className="text-xs font-medium text-center">{tab.label}</span>
// //                 <p className="text-[10px] opacity-80 mt-1 text-center hidden md:block">
// //                   {tab.description}
// //                 </p>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {/* Área de formulario */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
// //           <div className="px-6 py-5">
// //             <h2 className="text-xl font-semibold text-gray-900">
// //               {tabItems.find(t => t.id === activeTab)?.label}
// //             </h2>
// //           </div>
// //           <div className="px-6 pb-6">
// //             {/* ✅ Los formularios ahora se auto-gestionan */}
//                 {activeTab === 'basic' && <BasicProfileForm />}
// //             {activeTab === 'personal' && <PersonalInfoForm />}
// //             {activeTab === 'notifications' && <NotificationsForm />}
// //             {activeTab === 'privacy' && <PrivacyForm />}
// //             {activeTab === 'language' && <LanguageRegionForm />}
// //             {activeTab === 'security' && <SecurityForm />}
// //             {activeTab === 'preferences' && <PreferencesForm />}
// //           </div>
// //         </div>
// //       </div>
// //     </PageWrapper>
// //   );
// // };

// // export default SettingsPage;


// resources/js/Pages/User/Settings/SettingsPage.jsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
  User,
  Mail,
  Bell,
  Shield,
  Globe,
  Lock,
  Settings as SettingsIcon
} from 'lucide-react';

// Formularios
import BasicProfileForm from './BasicProfileForm'; // 👈 NUEVO
import PersonalInfoForm from './PersonalInfoForm';
import NotificationsForm from './NotificationsForm';
import PrivacyForm from './PrivacyForm';
import LanguageRegionForm from './LanguageRegionForm';
import SecurityForm from './SecurityForm';
import PreferencesForm from './PreferencesForm';

import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('basic'); // 👈 Cambiado a 'basic'

  const tabItems = [
    {
      id: 'basic',
      label: 'Perfil Básico',
      description: 'Edita tu nombre y correo electrónico',
      icon: User,
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      activeColor: 'bg-blue-200 text-blue-800 border border-blue-300'
    },
    {
      id: 'personal',
      label: 'Información Personal',
      description: 'Actualiza tu documento y detalles de contacto',
      icon: Mail,
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      activeColor: 'bg-purple-200 text-purple-800 border border-purple-300'
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      description: 'Controla cómo y cuándo recibes notificaciones',
      icon: Bell,
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
      activeColor: 'bg-green-200 text-green-800 border border-green-300'
    },
    {
      id: 'privacy',
      label: 'Privacidad',
      description: 'Gestiona quién puede ver tu información',
      icon: Shield,
      color: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
      activeColor: 'bg-amber-200 text-amber-800 border border-amber-300'
    },
    {
      id: 'language',
      label: 'Idioma y Región',
      description: 'Personaliza tu experiencia según tu ubicación',
      icon: Globe,
      color: 'bg-red-100 text-red-700 hover:bg-red-200',
      activeColor: 'bg-red-200 text-red-800 border border-red-300'
    },
    {
      id: 'security',
      label: 'Seguridad',
      description: 'Protege tu cuenta con autenticación avanzada',
      icon: Lock,
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      activeColor: 'bg-indigo-200 text-indigo-800 border border-indigo-300'
    }
  ];

  return (
    <AutoLayoutResolver>
      <Head title="Configuración" />

      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuenta</h1>
          <p className="text-gray-600 mt-2">
            Personaliza tu experiencia y mantén tu cuenta segura
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tabItems.map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 h-full min-h-[100px] ${
                  isActive ? tab.activeColor : tab.color
                }`}
              >
                <IconComponent className="w-5 h-5 mb-2" />
                <span className="text-xs font-medium text-center">{tab.label}</span>
                <p className="text-[10px] opacity-80 mt-1 text-center hidden md:block">
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-900">
              {tabItems.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="px-6 pb-6">
            {activeTab === 'basic' && <BasicProfileForm />} {/* 👈 NUEVA SECCIÓN */}
            {activeTab === 'personal' && <PersonalInfoForm />}
            {activeTab === 'notifications' && <NotificationsForm />}
            {activeTab === 'privacy' && <PrivacyForm />}
            {activeTab === 'language' && <LanguageRegionForm />}
            {activeTab === 'security' && <SecurityForm />}
          </div>
        </div>
      </div>
    </AutoLayoutResolver>
  );
};

export default SettingsPage;
