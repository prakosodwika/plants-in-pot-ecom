"use client";

import { useStore, Address } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Home, MapPin, Trash2, Edit2, Check } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    isDefault: false,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      isDefault: false,
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
      isDefault: address.isDefault || false,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }
    setIsOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Shipping Addresses</h2>
          <p className="text-slate-500">Where should we deliver your green friends?</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger
            render={
              <Button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add New Address
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-primary">
                {editingId ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs font-black uppercase text-primary">Full Name</Label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="border-2 border-primary/10 rounded-xl"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs font-black uppercase text-primary">Street Address</Label>
                  <Input
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="border-2 border-primary/10 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-primary">City</Label>
                  <Input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border-2 border-primary/10 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-primary">State</Label>
                  <Input
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="border-2 border-primary/10 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-primary">ZIP Code</Label>
                  <Input
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="border-2 border-primary/10 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-primary">Phone</Label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-2 border-primary/10 rounded-xl"
                  />
                </div>
              </div>
              <DialogFooter className="pt-6">
                <Button type="submit" className="w-full bg-primary text-white rounded-xl font-bold h-12">
                  {editingId ? "Update Address" : "Save Address"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={cn(
              "border-2 rounded-2xl p-6 relative transition-all duration-200 group",
              addr.isDefault
                ? "border-primary bg-primary/5"
                : "border-primary/10 hover:border-primary/30"
            )}
          >
            {addr.isDefault && (
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] px-2 py-1 rounded font-bold uppercase flex items-center gap-1">
                <Check className="w-3 h-3" /> Default
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className={cn(
                "p-2 rounded-lg",
                addr.isDefault ? "bg-primary text-white" : "bg-primary/10 text-primary"
              )}>
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{addr.fullName}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {addr.street}<br />
                  {addr.city}, {addr.state} {addr.zipCode}<br />
                  {addr.phone}
                </p>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="ml-auto text-xs font-bold text-slate-400 hover:text-primary transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleOpenAdd}
          className="border-2 border-dashed border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/50 hover:bg-primary/5 transition-all group py-12"
        >
          <div className="p-3 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm">Add New Address</span>
        </button>
      </div>

      <div className="mt-12 rounded-xl bg-primary/5 p-6 border border-primary/10 flex gap-4">
        <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-primary">Quick Shipping Info</h4>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Changing your default address wont affect orders that have already been placed. For security reasons, address changes for active orders must be handled by contacting our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
