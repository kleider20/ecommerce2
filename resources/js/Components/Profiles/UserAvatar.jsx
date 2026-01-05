// // resources/js/Components/User/UserAvatar.jsx
// import React, { useState, useEffect } from 'react';

// const UserAvatar = ({ user, size = 'w-9 h-9' }) => {
//   const [imgSrc, setImgSrc] = useState('');

//   // Generar URL de avatar
//   const getAvatarUrl = () => {
//     // Si hay avatar en el perfil y es una URL válida, usarlo
//     if (user.profile?.avatar_url) {
//       return user.profile.avatar_url;
//     }

//     // Si no, usar iniciales del nombre
//     return getInitialsAvatar(user.name || 'U');
//   };

//   // Generar avatar con iniciales (método local, sin UI Avatars)
//   const getInitialsAvatar = (name) => {
//     const initials = name
//       .split(' ')
//       .map(part => part[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);

//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff`;
//   };

//   // Inicializar avatar
//   useEffect(() => {
//     setImgSrc(getAvatarUrl());
//   }, [user.profile?.avatar_url, user.name]);

//   // Manejar error de carga (usar iniciales si falla)
//   const handleImageError = () => {
//     setImgSrc(getInitialsAvatar(user.name || 'U'));
//   };

//   return (
//     <img
//       src={imgSrc}
//       alt={user.name}
//       className={`${size} rounded-full border-2 border-indigo-100 object-cover shadow-sm`}
//       onError={handleImageError}
//     />
//   );
// };

// export default UserAvatar;


// resources/js/Components/User/ResponsiveAvatar.jsx
import React, { useState, useEffect } from 'react';

const ResponsiveAvatar = ({
  user,
  size = 'w-10 h-10',
  shape = 'rounded-full', // 'rounded-full' | 'rounded-lg' | 'rounded-md'
  className = '',
  showBorder = true
}) => {
  const [imgSrc, setImgSrc] = useState('');

  const getAvatarUrl = () => {
    if (user.profile?.avatar_url) {
      return user.profile.avatar_url;
    }

    // Iniciales como respaldo
    const name = user.name || 'U';
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff`;
  };

  useEffect(() => {
    setImgSrc(getAvatarUrl());
  }, [user.profile?.avatar_url, user.name]);

  const handleImageError = () => {
    const name = user.name || 'U';
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
    setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff`);
  };

  return (
    <img
      src={imgSrc}
      alt={user.name}
      className={`
        ${size}
        ${shape}
        object-cover
        ${showBorder ? 'border-2 border-indigo-100' : ''}
        shadow-sm
        ${className}
      `}
      onError={handleImageError}
    />
  );
};

export default ResponsiveAvatar;
