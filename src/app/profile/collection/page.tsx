import { Description, Title } from "@/components/profile/headers";
import { ProfileCommingSoon } from "@/components/shared/empty";

export default function CollectionPage() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 shadow-sm">
      <div className="mb-8 space-y-1">
        <Title title="My Collection" />
        <Description description="Track and manage your botanical collection." />
      </div>
      <ProfileCommingSoon text="Your collection list is coming soon." />
    </div>
  );
}
