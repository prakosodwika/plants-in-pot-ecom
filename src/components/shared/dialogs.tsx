import { Address, Order } from "@/lib/store";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar, ChevronRight, CreditCard, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export interface AddressDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editingId: string | null;
  formData: Omit<Address, "id">;
  setFormData: (formData: Omit<Address, "id">) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function AddressDialog({
  isOpen,
  setIsOpen,
  editingId,
  formData,
  setFormData,
  handleSubmit,
}: AddressDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl space-y-4 p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {editingId ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <Label className="text-xs font-black uppercase text-primary">Full Name</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="border-2 border-primary/10 rounded-xl h-10 placeholder:text-slate-400"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs font-black uppercase text-primary">Street Address</Label>
              <Input
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="border-2 border-primary/10 rounded-xl h-10 placeholder:text-slate-400"
                placeholder="e.g. 123 Main Street, Apt 4B"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-primary">City</Label>
              <Input
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="border-2 border-primary/10 rounded-xl h-10 placeholder:text-slate-400"
                placeholder="e.g. New York"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-primary">State</Label>
              <Input
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="border-2 border-primary/10 rounded-xl h-10 placeholder:text-slate-400"
                placeholder="e.g. NY"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-primary">ZIP Code</Label>
              <Input
                required
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="border-2 border-primary/10 rounded-xl h-10 placeholder:text-slate-400"
                placeholder="e.g. 10001"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-primary">Phone</Label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-2 border-primary/10 rounded-xl h-10 placeholder:text-slate-400"
                placeholder="e.g. +1 (555) 000-0000"
              />
            </div>
          </div>
          <DialogFooter className="border-t-0">
            <Button type="submit" className="w-full bg-primary text-white rounded-xl font-bold h-12">
              {editingId ? "Update Address" : "Save Address"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export interface OrderDetailProps {
  setSelectedOrderId: (id: string | null) => void;
  selectedOrder: Order | null;
  order: Order;
  statusColors: string;
}

export function OrderDetailDialog({
  setSelectedOrderId,
  selectedOrder,
  order,
  statusColors
}: OrderDetailProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            onClick={() => setSelectedOrderId(order.id)}
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
          >
            View Details <ChevronRight className="w-4 h-4" />
          </button>
        }
      />
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-primary">Order Details</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {selectedOrder?.date}
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> ID: #{selectedOrder?.id}
              </span>
            </div>
            {selectedOrder && (
              <Badge className={cn("px-4 py-1.5 uppercase tracking-wider font-black", statusColors)}>
                {selectedOrder.status}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="my-4 space-y-8">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Order Items</h4>
            <div className="space-y-4">
              {selectedOrder?.items && selectedOrder.items.length > 0 ? (
                selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-slate-50 dark:bg-primary/5 p-4 rounded-xl border border-primary/5">
                    <div className="w-16 h-16 rounded-lg bg-white p-1 border border-primary/10 overflow-hidden flex-shrink-0 relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover rounded-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.name}</h5>
                      <p className="text-xs text-slate-500 font-bold mt-1">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-primary">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 bg-slate-50 dark:bg-primary/5 rounded-xl text-slate-400 font-medium text-sm border-2 border-dashed border-primary/10">
                  No items listed for this order.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Shipping To</h4>
              <div className="flex gap-3">
                <div className="p-2 h-fit rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-base text-primary dark:text-slate-100">{selectedOrder?.address?.fullName || "No name provided"}</p>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    {selectedOrder?.address?.street || "No street provided"}<br />
                    {selectedOrder?.address?.city || ""}{selectedOrder?.address?.state ? `, ${selectedOrder.address.state}` : ""} {selectedOrder?.address?.zipCode || ""}
                  </p>
                  <p className="text-primary mt-2 text-xs font-bold">{selectedOrder?.address?.phone || ""}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 text-center">Payment Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Subtotal</span>
                  <span>${selectedOrder?.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Shipping</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <Separator className="bg-primary/10 my-2" />
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-black text-primary dark:text-slate-100 uppercase tracking-wider">Total</span>
                  <span className="text-xl font-black text-primary">${selectedOrder?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t-0">
          <Button
            onClick={() => setSelectedOrderId(null)}
            className="w-full h-12 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Close Order Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}