export function Title({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-bold text-primary dark:text-slate-100">
      {title}
    </h2>
  )
}

export function Description({ description }: { description: string }) {
  return (
    <p className="text-muted-foreground">{description}</p>
  )
}

