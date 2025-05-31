import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePayments } from '@/hooks/usePayments';
import { AddPaymentForm } from './AddPaymentForm';

export function PaymentSection({ saleId, totalAmount }) {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const { 
    payments, 
    isLoading, 
    addPayment,
    voidPayment,
    stats 
  } = usePayments(saleId);

  const remainingAmount = totalAmount - stats.totalPaid;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Payment Summary</span>
            <Badge variant={remainingAmount <= 0 ? "success" : "warning"}>
              {remainingAmount <= 0 ? "Paid" : "Pending"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">${totalAmount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ${stats.totalPaid?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-yellow-600">
                ${remainingAmount?.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Payment History</span>
            {remainingAmount > 0 && (
              <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
                <DialogTrigger asChild>
                  <Button>Add Payment</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Payment</DialogTitle>
                  </DialogHeader>
                  <AddPaymentForm
                    saleId={saleId}
                    remainingAmount={remainingAmount}
                    onSuccess={() => setShowAddPayment(false)}
                    onSubmit={addPayment.mutate}
                  />
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.payment_method}</TableCell>
                  <TableCell>{payment.reference_number || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={payment.is_active ? "success" : "destructive"}>
                      {payment.is_active ? "Active" : "Voided"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {payment.is_active && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => voidPayment.mutate(payment.id)}
                      >
                        Void
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}