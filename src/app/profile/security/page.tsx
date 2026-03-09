import { Description, Title } from "@/components/profile/headers";
import { ProfileCommingSoon } from "@/components/shared/empty";

export default function SecurityPage() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 shadow-sm">
      <div className="mb-8 space-y-1">
        <Title title="Security & Privacy" />
        <Description description="Manage your account credentials and security settings." />
      </div>
      <ProfileCommingSoon text="Security settings implementation coming soon." />
    </div>
  );
}
