import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function usePayments(saleId) {
  // Fetch payments for a sale
  const {
    data: payments = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['payments', saleId],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/payments/', {
          params: { sale_id: saleId }
        });
        return response.data.results || [];
      } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch payments');
      }
    },
    enabled: !!saleId
  });

  // Add new payment
  const addPayment = useMutation({
    mutationFn: async (paymentData) => {
      const response = await api.post('/api/v1/payments/', {
        sale_id: saleId,
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        payment_date: paymentData.paymentDate || new Date().toISOString(),
        reference_number: paymentData.referenceNumber,
        notes: paymentData.notes
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate both payments and sales queries to update status
      queryClient.invalidateQueries(['payments', saleId]);
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Void payment
  const voidPayment = useMutation({
    mutationFn: async (paymentId) => {
      const response = await api.post(`/api/v1/payments/${paymentId}/void/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['payments', saleId]);
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Calculate payment stats
  const totalPaid = payments.reduce((sum, payment) => 
    sum + Number(payment.amount), 0
  );

  return {
    payments,
    isLoading,
    error,
    refetch,
    addPayment,
    voidPayment,
    stats: {
      totalPaid,
      paymentCount: payments.length,
      lastPaymentDate: payments[0]?.payment_date
    }
  };
}