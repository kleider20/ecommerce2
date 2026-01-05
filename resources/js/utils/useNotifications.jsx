import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { usePage } from '@inertiajs/react';

const useNotifications = () => {
  const { props } = usePage();
  const initialNotifications = props.notifications || [];

  const markAsRead = async (id, actionUrl = null) => {
    try {
      await axios.post(`/notifications/${id}/read`);

      // Redirigir si se proporciona URL
      if (actionUrl) {
        window.location.href = actionUrl;
      }
    } catch (error) {
      console.error('Error al marcar notificación como leída', error);
    }
  };

  // Mostrar toasts al cargar la página
  useEffect(() => {
    const unread = initialNotifications.filter(n => !n.read);
    unread.forEach(notification => {
      toast.info(
        <div>
          <div className="font-medium">{notification.message}</div>
          <div className="text-xs opacity-80">{notification.time}</div>
        </div>,
        {
          autoClose: 6000,
          onClick: () => {
            if (notification.action_url) {
              window.location.href = notification.action_url;
            }
          },
          style: { cursor: 'pointer' }
        }
      );
    });
  }, []);

  const unreadCount = initialNotifications.filter(n => !n.read).length;

  return {
    notifications: initialNotifications,
    unreadCount,
    markAsRead
  };
};

export default useNotifications;
