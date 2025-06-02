import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useInventory } from '@/hooks/useInventory';

const createFormSchema = (suppliers = []) => {
  return z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    dairy_type: z.enum(['milk', 'cheese', 'butter', 'yogurt', 'cream', 'other']).optional(),
    batch_number: z.string().optional(),
    quantity: z.coerce.number().optional(),
    unit: z.enum(['kg', 'l', 'pcs']).optional(),
    price: z.coerce.number().optional(),
    storage_condition: z.enum(['refrigerated', 'frozen', 'room_temp']).default('refrigerated'),
    optimal_temperature_min: z.coerce.number().min(-30).max(30).optional(),
    optimal_temperature_max: z.coerce.number().min(-30).max(30).optional(),
    manufacturing_date: z.string().optional(),
    expiry_date: z.string().optional(),
    supplier: z.coerce.number().optional()
      .refine(val => !val || suppliers.some(s => s.id === val), {
        message: "Please select a valid supplier"
      }),
    reorder_point: z.coerce.number().optional(),
    minimum_order_quantity: z.coerce.number().optional(),
  }).refine(data => {
    if (data.manufacturing_date && data.expiry_date) {
      return new Date(data.manufacturing_date) <= new Date(data.expiry_date);
    }
    return true;
  }, {
    message: "Manufacturing date must be before expiry date",
    path: ["manufacturing_date"],
  });
};

export function EditItemForm({ isOpen, onClose, onSubmit, defaultValues }) {
  const { suppliers } = useInventory();
  const formSchema = createFormSchema(suppliers || []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      dairy_type: '',
      batch_number: '',
      quantity: '',
      unit: '',
      price: '',
      storage_condition: '',
      optimal_temperature_min: '',
      optimal_temperature_max: '',
      manufacturing_date: '',
      expiry_date: '',
      supplier: '',
      reorder_point: '',
      minimum_order_quantity: '',
    },
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (defaultValues) {
        const supplierId = defaultValues.supplier_details
          ? String(defaultValues.supplier_details.id)
          : String(defaultValues.supplier || defaultValues.supplier_id || '');

        const formData = {
          name: defaultValues.name || '',
          description: defaultValues.description || '',
          dairy_type: defaultValues.dairy_type || '',
          batch_number: defaultValues.batch_number || '',
          quantity: defaultValues.quantity !== undefined ? String(defaultValues.quantity) : '',
          unit: defaultValues.unit || '',
          price: defaultValues.price !== undefined ? String(defaultValues.price) : '',
          storage_condition: defaultValues.storage_condition || 'refrigerated',
          optimal_temperature_min: defaultValues.optimal_temperature_min !== undefined
            ? String(defaultValues.optimal_temperature_min)
            : '',
          optimal_temperature_max: defaultValues.optimal_temperature_max !== undefined
            ? String(defaultValues.optimal_temperature_max)
            : '',
          manufacturing_date: formatDateForInput(defaultValues.manufacturing_date),
          expiry_date: formatDateForInput(defaultValues.expiry_date),
          supplier: supplierId,
          reorder_point: defaultValues.reorder_point !== undefined
            ? String(defaultValues.reorder_point)
            : '',
          minimum_order_quantity: defaultValues.minimum_order_quantity !== undefined
            ? String(defaultValues.minimum_order_quantity)
            : '',
        };
        form.reset(formData);
      } else {
        form.reset({
          name: '',
          description: '',
          dairy_type: '',
          batch_number: '',
          quantity: '',
          unit: '',
          price: '',
          storage_condition: 'refrigerated',
          optimal_temperature_min: '',
          optimal_temperature_max: '',
          manufacturing_date: '',
          expiry_date: '',
          supplier: '',
          reorder_point: '',
          minimum_order_quantity: '',
        });
      }
    }
  }, [isOpen, defaultValues, form]);

  const handleSubmit = async (data) => {
    try {
      const processedData = {
        ...data,
        quantity: data.quantity ? Number(data.quantity) : undefined,
        price: data.price ? Number(data.price) : undefined,
        supplier: data.supplier ? Number(data.supplier) : undefined,
        reorder_point: data.reorder_point ? Number(data.reorder_point) : undefined,
        minimum_order_quantity: data.minimum_order_quantity ? Number(data.minimum_order_quantity) : undefined,
        optimal_temperature_min: data.optimal_temperature_min ? Number(data.optimal_temperature_min) : undefined,
        optimal_temperature_max: data.optimal_temperature_max ? Number(data.optimal_temperature_max) : undefined,
        ...(defaultValues?.id && { id: defaultValues.id })
      };

      await onSubmit(processedData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </DialogTitle>
          <DialogDescription>
            Update the inventory item details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Item name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dairy_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="milk">Milk</SelectItem>
                        <SelectItem value="cheese">Cheese</SelectItem>
                        <SelectItem value="butter">Butter</SelectItem>
                        <SelectItem value="yogurt">Yogurt</SelectItem>
                        <SelectItem value="cream">Cream</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Item description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="l">Liters</SelectItem>
                        <SelectItem value="pcs">Pieces</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (LKR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="batch_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Batch number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storage_condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Condition</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue="refrigerated"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Storage Condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="refrigerated">Refrigerated</SelectItem>
                        <SelectItem value="frozen">Frozen</SelectItem>
                        <SelectItem value="room_temp">Room Temperature</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="optimal_temperature_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="-30"
                        max="30"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="optimal_temperature_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="-30"
                        max="30"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacturing_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturing Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {suppliers && suppliers.length > 0 ? (
                          suppliers.map((supplier) => (
                            <SelectItem
                              key={supplier.id}
                              value={String(supplier.id)}
                            >
                              {supplier.name} {supplier.contact_person && `(${supplier.contact_person})`}
                            </SelectItem>
                          ))
                        ) : (
                          // Optionally display a message outside the SelectContent or disable the whole Select
                          <p className="px-2 text-sm text-muted-foreground">No suppliers available</p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reorder_point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reorder Point</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minimum_order_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {defaultValues ? 'Update Item' : 'Add Item'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}