import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'sonner';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchItems = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await api.get('/api/v1/search/', {
          params: { query: debouncedQuery }
        });
        
        if (response?.status) {
          const filteredResults = (response?.data || []).filter(
            group => ['Inventory', 'Orders', 'Sales'].includes(group.type)
          );
          setResults(filteredResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchItems();
  }, [debouncedQuery]);

  const handleNavigate = (item) => {
    switch (item.type) {
      case 'inventory':
        navigate(`/inventory`);
        break;
      case 'order':
        navigate(`/orders`);
        break;
      case 'sale':
        navigate(`/sales`);
        break;
      default:
        console.warn('Unknown item type:', item.type);
        break;
    }
    setQuery('');
    setResults([]);
  };

  const formatResults = (results) => {
    return results.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        subtitle: formatSubtitle(item)
      }))
    }));
  };

  const formatSubtitle = (item) => {
    switch (item.type) {
      case 'inventory':
        return `Stock: ${item.subtitle}`;
      case 'order':
        return `Status: ${item.status} - Amount: LKR ${item.total_amount}`;
      case 'sale':
        return `${item.seller || 'Unknown'} - ${item.status}`;
      default:
        return item.subtitle;
    }
  };

  return {
    query,
    setQuery,
    results: formatResults(results),
    isLoading,
    handleNavigate
  };
}