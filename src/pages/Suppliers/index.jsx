import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/layout/sidebar';
import TopNavbar from '@/components/layout/top-navbar';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Pencil, Trash2, RefreshCcw, Star } from "lucide-react";
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
import { useSupplier } from '@/hooks/useSupplier';
import { AddSupplierForm } from '@/components/suppliers/AddSupplierForm.jsx';

export default function Suppliers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { 
    suppliers, 
    isLoading, 
    error, 
    refetch,
    stats,
    addSupplier,
    updateSupplier,
    deleteSupplier 
  } = useSupplier();

  const handleAddSupplier = async (formData) => {
    try {
      await addSupplier.mutateAsync(formData);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add supplier:', error);
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
              <AlertTitle>Error loading suppliers</AlertTitle>
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
                <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your suppliers and their information
                </p>
              </div>
              <PermissionGuard permissions="can_manage_suppliers">
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Supplier
                </Button>
              </PermissionGuard>

              <AddSupplierForm 
                  isOpen={isAddDialogOpen}
                  onClose={() => setIsAddDialogOpen(false)}
                  onSubmit={handleAddSupplier}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.averageRating} <Star className="h-4 w-4 inline" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Rated Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.topRated}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Suppliers List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.contact_person}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell>
                          <span className="flex items-center">
                            {supplier.rating || 'N/A'} 
                            {supplier.rating && <Star className="h-4 w-4 ml-1 text-yellow-500" />}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={supplier.is_active ? "default" : "secondary"}>
                            {supplier.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <PermissionGuard permissions="can_manage_suppliers">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => updateSupplier.mutate({ id: supplier.id, data: {} })}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteSupplier.mutate(supplier.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </PermissionGuard>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}