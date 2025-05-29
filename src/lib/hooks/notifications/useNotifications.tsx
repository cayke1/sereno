import { NotificationPayload } from '@/@types/notification';
import { useState, useEffect, useCallback } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca notificações
  const fetchNotifications = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/notifications?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}` // Adiciona token de autenticação se necessário
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Garante que data é um array
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        console.warn('API retornou dados inválidos:', data);
        setNotifications([]);
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      setError('Erro ao carregar notificações');
      setNotifications([]); // Garante que seja array mesmo em caso de erro
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Busca contador de não lidas
  const fetchUnreadCount = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/notifications/unread-count?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}` // Adiciona token de autenticação se necessário
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUnreadCount(typeof data.count === 'number' ? data.count : 0);
    } catch (error) {
      console.error('Erro ao buscar contador:', error);
      setUnreadCount(0);
    }
  }, [userId]);

  // Marca como lida
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read?userId=${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}` // Adiciona token de autenticação se necessário
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Atualiza estado local
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  }, [userId]);

  // Server-Sent Events para notificações em tempo real
  useEffect(() => {
    if (!userId) return;

    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectSSE = () => {
      try {
        eventSource = new EventSourcePolyfill(`${API_BASE_URL}/sse/notifications?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}` // Adiciona token de autenticação se necessário
            }
        });
        
        eventSource.onopen = () => {
          console.log('SSE conectado');
        };
        
        eventSource.onmessage = (event) => {
          try {
            const newNotifications = JSON.parse(event.data);
            
            if (Array.isArray(newNotifications) && newNotifications.length > 0) {
              setNotifications(prev => [...newNotifications, ...prev]);
              setUnreadCount(prev => prev + newNotifications.length);
            }
          } catch (error) {
            console.error('Erro ao processar notificação SSE:', error);
          }
        };

        eventSource.onerror = (error) => {
          console.error('Erro SSE:', error);
          eventSource?.close();
          
          // Reconecta após 5 segundos, mas apenas se não for erro de CORS ou 404
          reconnectTimeout = setTimeout(() => {
            console.log('Tentando reconectar SSE...');
            connectSSE();
          }, 5000);
        };
      } catch (error) {
        console.error('Erro ao conectar SSE:', error);
      }
    };

    // Carrega dados iniciais
    fetchNotifications();
    fetchUnreadCount();
    
    // Conecta SSE apenas se a API estiver disponível
    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [userId, fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    refresh: fetchNotifications,
  };
};