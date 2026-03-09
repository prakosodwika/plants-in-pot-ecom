import { Check, Edit2, Home, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Address } from "@/lib/store"

interface AddressCardProps {
  address: Address
  handleOpenEdit: (address: Address) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

export function AddressCard({
  address,
  handleOpenEdit,
  deleteAddress,
  setDefaultAddress
}: AddressCardProps) {
  return (
    <div
      className={cn(
        "border-2 rounded-2xl p-6 relative transition-all duration-200 group space-y-2 flex ",
        address.isDefault
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-primary/10 bg-white hover:border-primary/30"
      )}
    >
      
      <div className="flex-1 space-y-4">
        <div className="flex gap-2">
          <Home className="w-6 h-6 text-primary flex-shrink-0" />
          <h4 className="text-base font-bold text-primary dark:text-slate-100">{address.fullName}</h4>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
          {address.street}<br />
          {address.city}, {address.state} {address.zipCode}<br />
          {address.phone}
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleOpenEdit(address)}
            className="flex items-center gap-1 text-sm font-bold text-primary hover:underline cursor-pointer"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => deleteAddress(address.id)}
            className="flex items-center gap-1 text-sm font-bold text-red-500 hover:underline cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
          {!address.isDefault && (
            <button
              onClick={() => setDefaultAddress(address.id)}
              className="ml-auto text-sm font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer"
            >
              Set as Default
            </button>
          )}
        </div>
      </div>
      <div>
        {address.isDefault && (
          <div className=" bg-primary text-white w-fit text-xs px-2 py-1 rounded-sm font-bold uppercase flex items-center gap-1">
            <Check className="w-4 h-4" /> Default
          </div>
        )}
      </div>
    </div>
  )
}

interface AddressAddCardProps {
  handleOpenAdd: () => void
}

export function AddressAddCard({
  handleOpenAdd,
}: AddressAddCardProps) {
  return (
    <Button
      onClick={handleOpenAdd}
      className="border-2 border-dashed border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all group py-12 h-full"
    >
      <div className="p-3 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
        <Plus className="w-6 h-6" />
      </div>
      <span className="font-bold text-sm">Add New Address</span>
    </Button>
  )
}