import { Address } from "@/lib/store";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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