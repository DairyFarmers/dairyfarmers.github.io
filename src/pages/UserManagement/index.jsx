import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/layout/sidebar';
import TopNavbar from '@/components/layout/top-navbar';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Pencil, Trash2, RefreshCcw, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { useUsers } from '@/hooks/useUsers';
import { AddUserForm } from '@/components/users/AddUserForm';

export default function Users() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { 
    users: {
      results: users = [],
      count = 0,
      num_pages = 1,
      next,
      previous
    }, 
    roles: {
      results: roles = [],
      count: rolesCount = 0
    },
    isLoading, 
    error, 
    refetch,
    stats,
    addUser,
    updateUser,
    deleteUser 
  } = useUsers({ currentPage, pageSize });

  const handleNextPage = () => {
    if (next) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previous) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= num_pages) {
      setCurrentPage(page);
    }
  };

  const handleAddUser = async (formData) => {
    try {
      await addUser.mutateAsync(formData);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete "${user.first_name}"?`)) {
      deleteUser.mutate(user.id, {
        onSuccess: () => {
          toast.error(`"${user.first_name}" deleted successfully`);
        },
        onError: (error) => {
          console.error(error);
          toast.error(`Failed to delete "${user.first_name}"`);
        }
      });
    }
  };

  console.log('User:', deleteUser);
  const toggleUserStatus = (userId, isActive) => {
    updateUser.mutate({
      userId,
      data: { is_active: !isActive }
    });
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
                <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage user accounts and permissions
                </p>
              </div>
              <PermissionGuard permissions="can_manage_users">
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </PermissionGuard>

              <AddUserForm 
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSubmit={handleAddUser}
                roles={roles}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.inactive}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Users List</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, count)} of {count} orders
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            <Shield className="h-3 w-3 mr-1" />
                            {roles.find(
                              role => role.id === user.role
                            )?.name.split(' ').map(
                              word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                              || 'Unknown'
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.is_active ? "success" : "warning"}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.last_login).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <PermissionGuard permissions="can_manage_users">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="mr-2"
                              onClick={() => toggleUserStatus(user.id, user.is_active)}
                            >
                              <Badge variant={user.is_active ? "destructive" : "default"}>
                                {user.is_active ? 'Disable' : 'Enable'}
                              </Badge>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="hover:bg-destructive/10"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </PermissionGuard>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {num_pages > 1 && (
                  <div className="mt-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={handlePreviousPage}
                            disabled={!previous}
                          />
                        </PaginationItem>

                        {[...Array(num_pages)].map((_, index) => {
                          const pageNumber = index + 1;
                          if (
                            pageNumber === 1 ||
                            pageNumber === num_pages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={pageNumber}>
                                <Button
                                  variant={currentPage === pageNumber ? "default" : "outline"}
                                  size="icon"
                                  onClick={() => handlePageChange(pageNumber)}
                                >
                                  {pageNumber}
                                </Button>
                              </PaginationItem>
                            );
                          } else if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={pageNumber}>
                                <Button variant="outline" size="icon" disabled>
                                  ...
                                </Button>
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext 
                            onClick={handleNextPage}
                            disabled={!next}
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