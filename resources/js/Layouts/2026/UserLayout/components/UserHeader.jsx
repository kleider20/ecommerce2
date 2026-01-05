// // resources/js/Layouts/2026/Users/components/UserHeader.jsx
// import React, { useState } from 'react';
// import { ShoppingBag, LogOut } from 'lucide-react';
// import { useForm, router } from '@inertiajs/react';
// import GlobalNotifications from '@/Components/Notifications/GlobalNotifications';

// const UserHeader = ({ user }) => {
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { post } = useForm();

//   const handleLogout = (e) => {
//     e.preventDefault();
//     post('/logout');
//   };

//   const toggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
//             <ShoppingBag className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-xl font-bold text-gray-900">Mi Cuenta</h1>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* ✅ Componente global de notificaciones */}
//           <GlobalNotifications />

//           {/* Avatar con menú desplegable */}
//           <div className="relative">
//             <button
//               onClick={toggleUserMenu}
//               className="flex items-center gap-3 focus:outline-none"
//             >
//               <img
//                 src={user.avatar || 'https://placehold.co/80x80/3b82f6/ffffff?text=U'}
//                 alt={user.name}
//                 className="w-8 h-8 rounded-full border-2 border-gray-300"
//               />
//               <span className="hidden sm:block text-sm font-medium text-gray-900">
//                 {user.name}
//               </span>
//             </button>

//             {isUserMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                   <p className="text-xs text-gray-600">{user.email}</p>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Cerrar sesión
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default UserHeader;


// // resources/js/Layouts/2026/Users/components/UserHeader.jsx
// import React, { useState } from 'react';
// import { ShoppingBag, LogOut } from 'lucide-react';
// import { useForm } from '@inertiajs/react';
// import GlobalNotifications from '@/Components/Notifications/GlobalNotifications';

// const UserHeader = ({ user }) => {
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { post } = useForm();

//   const handleLogout = (e) => {
//     e.preventDefault();
//     post('/logout');
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
//             <ShoppingBag className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-xl font-bold text-gray-900">Mi Cuenta</h1>
//         </div>

//         <div className="flex items-center gap-4">
//           <GlobalNotifications />

//           <div className="relative">
//             <button
//               onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//               className="flex items-center gap-3 focus:outline-none"
//             >
//               <img
//                 src={user.avatar || 'https://placehold.co/80x80/3b82f6/ffffff?text=U'}
//                 alt={user.name}
//                 className="w-8 h-8 rounded-full border-2 border-gray-300"
//               />
//               <span className="hidden sm:block text-sm font-medium text-gray-900">
//                 {user.name}
//               </span>
//             </button>

//             {isUserMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                   <p className="text-xs text-gray-600">{user.email}</p>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Cerrar sesión
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // export default UserHeader;

// import React, { useState } from 'react';
// import { ShoppingBag, LogOut } from 'lucide-react';
// import { useForm } from '@inertiajs/react';
// import GlobalNotifications from '@/Components/Notifications/GlobalNotifications';

// const UserHeader = ({ user }) => {
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { post } = useForm();

//   const handleLogout = (e) => {
//     e.preventDefault();
//     post('/logout');
//   };

//   // ✅ LÓGICA PARA LA URL DEL AVATAR
//   // Si el avatar existe y no es una URL externa, le ponemos el prefijo /storage/
//   const avatarUrl = user.profile?.avatar_url || `ui-avatars.com{encodeURIComponent(user.name)}&background=3b82f6&color=fff`;

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
//             <ShoppingBag className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-xl font-bold text-gray-900">Mi Cuenta</h1>
//         </div>

//         <div className="flex items-center gap-4">
//           <GlobalNotifications />

//           <div className="relative">
//             <button
//               onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//               className="flex items-center gap-3 focus:outline-none"
//             >
//               {/* ✅ IMAGEN ACTUALIZADA */}
//               <img
//                     src={avatarUrl}
//                     alt={user.name}
//                     className="w-9 h-9 rounded-full border-2 border-indigo-100 object-cover"
//                     onError={(e) => {
//                     e.target.src = `ui-avatars.com{encodeURIComponent(user.name)}&background=3b82f6&color=fff`;
//                     }}
//                 />
//               <span className="hidden sm:block text-sm font-medium text-gray-900">
//                 {user.name}
//               </span>
//             </button>

//             {isUserMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
//                 <div className="px-4 py-3 border-b border-gray-100">
//                   <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
//                   <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Cerrar sesión
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default UserHeader;


// resources/js/Components/UserHeader.jsx
import React, { useState } from 'react';
import { ShoppingBag, LogOut } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import GlobalNotifications from '@/Components/Notifications/GlobalNotifications';
import UserAvatar from '@/Components/Profiles/UserAvatar'; // 👈 Componente nuevo

const UserHeader = ({ user }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { post } = useForm();

  const handleLogout = (e) => {
    e.preventDefault();
    post('/logout');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Mi Cuenta</h1>
        </div>

        <div className="flex items-center gap-4">
          <GlobalNotifications />

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 focus:outline-none"
            >
              <UserAvatar user={user} size="w-12 h-12"shape="rounded-full"/> {/* 👈 Componente autónomo */}
              <span className="hidden sm:block text-sm font-medium text-gray-900">
                {user.name}
              </span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
