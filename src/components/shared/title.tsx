export function TitleSection({ title }: { title: string }) {
  return (
    <h1 className="text-4xl font-black tracking-tighter text-primary uppercase">
      {title}
    </h1>
  )
}