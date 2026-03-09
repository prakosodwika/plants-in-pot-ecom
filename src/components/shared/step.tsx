import { CheckoutStep, steps } from "@/lib/data"

export function StepSection({ name }: { name: CheckoutStep }) {
  const total = steps.length
  const currentStep = steps.indexOf(name) + 1

  return (
    <section className="mb-8 grid gap-4">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-primary">Checkout</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground mt-1 font-medium uppercase text-sm tracking-widest">
          {`Step ${currentStep}: ${name}`}
        </p>
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full ${index < currentStep ? "bg-primary" : "bg-primary/10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}