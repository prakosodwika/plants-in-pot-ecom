import { Edit2 } from "lucide-react"
import { Button } from "../ui/button"

interface ProfileActionProps {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  handleSave: () => void
}

export function ProfileAction({
  isEditing,
  setIsEditing,
  handleSave
}: ProfileActionProps) {
  return !isEditing ? (
    <Button
      onClick={() => setIsEditing(true)}
      variant="outline"
      className="flex items-center gap-2 text-primary hover:text-primary border-primary/20 hover:bg-primary/5 rounded-lg font-bold px-4 py-2 cursor-pointer"
    >
      <Edit2 className="w-5 h-5" />
      Edit Profile
    </Button>
  ) : (
    <div className="flex gap-2">
      <Button
        onClick={() => setIsEditing(false)}
        variant="ghost"
        className="rounded-lg font-bold text-primary hover:text-primary cursor-pointer"
      >
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        className="bg-primary text-white hover:opacity-90 rounded-lg font-bold px-4 py-2 cursor-pointer"
      >
        Save Changes
      </Button>
    </div>
  )
}