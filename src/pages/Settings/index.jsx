import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Circle } from 'lucide-react';
import Sidebar from '@/components/layout/sidebar';
import TopNavbar from '@/components/layout/top-navbar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUsers } from '@/hooks/useUsers';

const profileSchema = z.object({
  email: z.string().email('Invalid email address'),
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  role: z.enum(['admin', 'manager', 'staff']),
  is_active: z.boolean(),
});

const USER_ROLES = [
  { value: 'admin', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'staff', label: 'Staff' },
];

export default function ProfileSettings() {
  const { user } = useAuth();
 const { updateUser } = useUsers();
  const [isEditMode, setIsEditMode] = useState(false);


  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      role: 'staff',
      is_active: true,
    },
  });

  useEffect(() => {
    if (user) {
      const nameParts = user.full_name?.trim().split(' ') ?? [];
      const first_name = nameParts[0] || '';
      const last_name = nameParts.slice(1).join(' ') || '';

      form.reset({
        email: user.email || '',
        first_name,
        last_name,
        role: user.role || 'staff',
        is_active: user.is_active ?? true,
      });
    }
  }, [user, form]);

const handleSubmit = async (data) => {
  try {
    await updateUser.mutateAsync({
      userId: user.user_id,
      data,
    });
    // success logic
  } catch (error) {
    console.error('Profile update failed:', error);

    if (error.response?.data) {
      console.error('Backend error details:', error.response.data);
    }
  }
};

console.log('User data:', updateUser);
console.log('Form data:', form.getValues());
  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Profile Settings</h2>
                <p className="text-gray-600 mt-2">
                  Update your personal information and account status.
                </p>
              </div>
              {!isEditMode && (
                <Button size="sm" onClick={() => setIsEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        {isEditMode ? (
                          <FormControl><Input {...field} /></FormControl>
                        ) : (
                          <p className="mt-1">{field.value}</p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        {isEditMode ? (
                          <FormControl><Input {...field} /></FormControl>
                        ) : (
                          <p className="mt-1">{field.value}</p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      {isEditMode ? (
                        <FormControl><Input type="email" {...field} /></FormControl>
                      ) : (
                        <p className="mt-1">{field.value}</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                          <p className="mt-1">
                            {USER_ROLES.find(r => r.value === field.value)?.label}
                          </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 mt-5">                       
                          <div className="flex items-center space-x-2">
                            {field.value ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                            <span>{field.value ? 'Active' : 'Inactive'}</span>
                          </div>
                      </FormItem>
                    )}
                  />
                </div>

                {isEditMode && (
                  <div className="flex gap-4">
                    <Button type="submit" disabled={updateUser.isLoading}>
                      {updateUser.isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        setIsEditMode(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
