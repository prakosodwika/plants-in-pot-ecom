"use client";

import { useStore, Address } from "@/lib/store";
import { useState } from "react";
import { AddressAction } from "@/components/profile/actions";
import { Description, Title } from "@/components/profile/headers";
import { AddressAddCard, AddressCard } from "@/components/shared/address";
import { MapPin } from "lucide-react";

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
      <div className="mb-8 space-y-1">
        <Title title="Shipping Addresses" />
        <div className="flex items-center justify-between ">
          <Description description="Where should we deliver your green friends?" />
          <AddressAction
            handleOpenAdd={handleOpenAdd}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            editingId={editingId}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address: Address) => (
          <AddressCard key={address.id}
            address={address}
            handleOpenEdit={handleOpenEdit}
            deleteAddress={deleteAddress}
            setDefaultAddress={setDefaultAddress}
          />
        ))}

        <AddressAddCard handleOpenAdd={handleOpenAdd} />
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
