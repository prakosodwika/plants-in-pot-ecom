export function ProfileCommingSoon(
  { text }: { text: string }
) {
  return (
    <div className="p-12 text-center border-2 border-dashed border-primary/10 rounded-xl text-slate-400 font-medium">
      {text}
    </div>
  )
}