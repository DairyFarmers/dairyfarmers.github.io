import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/layout/sidebar';
import TopNavbar from '@/components/layout/top-navbar';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Pencil, Trash2, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useOrder } from '@/hooks/useOrder';
import { toast } from 'sonner';
import { AddOrderForm } from '@/components/orders/AddOrderForm.jsx';

export default function Orders() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { 
    orders: { results: orders = [], count = 0 }, 
    isLoading, 
    error, 
    refetch,
    stats,
    addOrder,
    updateOrder,
    deleteOrder 
  } = useOrder({ page: currentPage, pageSize });

  const getStatusColor = (status) => {
    const colors = {
      draft: 'secondary',
      pending: 'warning',
      confirmed: 'primary',
      processing: 'info',
      shipped: 'info',
      delivered: 'success',
      cancelled: 'destructive',
      returned: 'destructive'
    };
    return colors[status] || 'default';
  };

  const totalPages = Math.ceil(count / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddOrder = async (formData) => {
    try {
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      
      const orderData = {
        ...formData,
        order_number: orderNumber,
        order_date: new Date().toISOString(),
        status: 'draft',
        payment_status: 'pending',
        // Calculate totals
        subtotal: formData.items.reduce((sum, item) => 
          sum + ((item.quantity * item.unit_price) - item.discount), 0
        ),
      };

      orderData.total_amount = orderData.subtotal + (orderData.shipping_cost || 0);
      await addOrder.mutateAsync(orderData);
      toast.success('Order created successfully');
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error(error?.response?.data?.message || 'Failed to create order');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavbar />
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavbar />
          <div className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error loading orders</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error.message}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refetch()}
                  className="ml-4"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage customer orders and track their status
                </p>
              </div>
              <PermissionGuard permissions="can_manage_orders">
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Order
                </Button>
              </PermissionGuard>

              <AddOrderForm 
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSubmit={handleAddOrder}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats?.pending || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.completed || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    ${(stats?.totalRevenue || 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Orders List</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, count)} of {count} orders
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.order_number}</TableCell>
                        <TableCell>{order.customer_name}</TableCell>
                        <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                        <TableCell>${(Number(order.total_amount) || 0).toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.payment_status === 'paid' ? 'success' : 'warning'}>
                            {order.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            order.priority === 'urgent' ? 'destructive' :
                            order.priority === 'high' ? 'warning' :
                            order.priority === 'medium' ? 'default' :
                            'secondary'
                          }>
                            {order.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <PermissionGuard permissions="can_manage_orders">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => updateOrder.mutate({ id: order.id, data: {} })}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="hover:bg-destructive/10"
                              onClick={() => deleteOrder.mutate(order.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </PermissionGuard>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {totalPages > 1 && (
                  <div className="mt-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        
                        {[...Array(totalPages)].map((_, index) => (
                          <PaginationItem key={index + 1}>
                            <Button
                              variant={currentPage === index + 1 ? "default" : "outline"}
                              size="icon"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </Button>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}