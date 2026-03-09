import React from "react"
import { Truck, Zap, ShieldCheck } from "lucide-react"
import { CourierType } from "./data"

export const courierIcons: Record<CourierType, React.ReactNode> = {
  [CourierType.Standard]: <Truck className="w-6 h-6" />,
  [CourierType.Express]: <Zap className="w-6 h-6" />,
  [CourierType.Premium]: <ShieldCheck className="w-6 h-6" />,
}