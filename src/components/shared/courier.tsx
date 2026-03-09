import { Courier } from "@/lib/data"
import { courierIcons } from "@/lib/data-icon";
import { useStore } from "@/lib/store";

interface CourierCardProps {
  courier: Courier
}

export function CourierListItem({ 
  courier: c,
}: CourierCardProps) {
  const { courier, setCourier } = useStore();
  return (
    <div onClick={() => setCourier(c)}
      className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-6 ${courier?.id === c.id
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-primary/10 bg-white hover:border-primary/30"
        }`}
    >
      <div className={`p-4 rounded-xl ${courier?.id === c.id ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
        {courierIcons[c.id]}
      </div>
      <div className="flex-grow">
        <h3 className="font-black uppercase tracking-tight text-lg leading-none mb-1">{c.name}</h3>
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{c.deliveryTime}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-black text-primary">${c.price.toFixed(2)}</p>
      </div>
    </div>
  )
}