import React, { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '@/redux/slices/userSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Loader2, Warehouse } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Clear any existing errors when unmounting
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // If user is already authenticated, redirect them
  useEffect(() => {
    if (isLoggedIn) {
      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect, { replace: true });
    }
  }, [isLoggedIn, navigate, searchParams]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      if (!resultAction) {
        form.setError("root", {
          message: "Login failed - please try again"
        });
      }
    } catch (err) {
      form.setError("root", {
        message: err.message || "Login failed - please try again"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden lg:block space-y-6 px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary rounded-xl">
              <Warehouse className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">DFI</h1>
              <p className="text-muted-foreground">Digital Factory Inventory</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-foreground">
              Streamline Your Factory Operations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manage inventory, track production, monitor quality, and optimize your factory 
              operations with our comprehensive management platform designed for 
              modern manufacturing businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Real-time Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor inventory levels and receive alerts for low stock items.</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Role-based Access</h3>
              <p className="text-sm text-muted-foreground">Secure access controls for different team members and partners.</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-border shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
                <div className="p-2 bg-primary rounded-lg">
                  <Warehouse className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">DFI</span>
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {(form.formState.errors.root || error) && (
                    <div className="p-3 text-sm text-white bg-destructive rounded-md animate-shake">
                      {form.formState.errors.root?.message || error}
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            type="email"
                            {...field} 
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            {...field} 
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login; 