import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useDashboard(timeRange = 'week') {
  return useQuery({
    queryKey: ['dashboard', 'summary', timeRange],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/dashboard/summary', {
          params: { time_range: timeRange },
          withCredentials: true
        });

        if (!response?.status){
          throw new Error('Invalid response from server');
        }

        
        const data = {
        "last_login": "2025-03-29T20:31:51.470685Z",
        "notifications": [
            {
                "id": "1",
                "message": "New user registered",
                "created_at": "2025-05-29T19:04:16.306741Z"
            },
            {
                "id": "2",
                "message": "System maintenance scheduled for 2025-06-01",
                "created_at": "2025-05-29T19:04:16.102019Z"
            },
            {
                "id": "3",
                "message": "New feature released: Dashboard Analytics",
                "created_at": "2025-05-29T19:04:04.636192Z"
            }
        ],
        "recent_activities": [
            {
                "id": "330bc53b-bf95-428e-b91b-18d5825eba16",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T19:04:16.306741Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "8422c74b-c0f8-47ee-930e-6668f920bb2a",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T19:04:16.102019Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "ceac4fbd-c1fa-434a-b4b4-49944823d6d9",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/dashboard/summary",
                "timestamp": "2025-05-29T19:04:04.636192Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "57116906-c4f0-413c-9770-d59249c465bd",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T19:04:04.517705Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "a2ffe680-339f-4ad4-a63b-f9cf374bb232",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T19:04:04.405915Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "0fdc2647-7ae3-4599-ab1d-bb65c2a2b3b9",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/dashboard/summary",
                "timestamp": "2025-05-29T19:02:42.654990Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "df57cfe5-8235-4426-9e5e-6788e7d2592c",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T19:02:42.501761Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "794fb1ea-d3c0-47b6-baf5-ef81317fea90",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T19:02:42.378946Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "d280645e-2267-4afb-8901-7d30e9bce2c5",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/dashboard/summary",
                "timestamp": "2025-05-29T17:29:41.422579Z",
                "ip_address": "127.0.0.1"
            },
            {
                "id": "3b75b343-83e0-4bb0-9da7-e670ca26751a",
                "user": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                "user_details": {
                    "id": "eef8ca6b-fee5-4141-a1b9-5fd24fd33e04",
                    "email": "admin@dfi.com",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "role": "edb749f6-fc7b-4861-a8a2-8f473ad39b24"
                },
                "action": "Visited /api/v1/users/token/verification",
                "timestamp": "2025-05-29T17:29:41.354842Z",
                "ip_address": "127.0.0.1"
            }
        ],
        "system_metrics": {
            "total_users": 3,
            "active_users": 0,
            "system_health": {
                "system_status": "healthy",
                "database_status": "connected",
                "cache_status": "operational"
            }
        },
        "financial_metrics": {
            "total_revenue": 300,
            "revenue_trends": [
                {
                    "date": "2025-05-29",
                    "value": 100
                },
                {
                    "date": "2025-05-28",
                    "value": 50
                },
                {
                    "date": "2025-05-27",
                    "value": 150
                }
            ]
        },
        "inventory_metrics": {
            "total_items": {
                "count": 1,
                "total_quantity": 0.0
            },
            "low_stock_items": [],
            "stock_value": 0.0
        },
        "order_metrics": {
            "total_orders": 5,
            "pending_orders": 2,
            "order_status_distribution": [
                {
                    "status": "draft",
                    "count": 4
                },
                {
                    "status": "completed",
                    "count": 1
                }
            ]
        }
    }
        return data || {};
      } catch (error) {
        console.error('Dashboard Error:', {
          message: error?.response?.data?.message || error.message,
          status: error?.response?.status,
          data: error?.response?.data
        });

        throw new Error(
          error?.response?.data?.message || 
          'Failed to fetch dashboard data'
        );
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000
  });
}