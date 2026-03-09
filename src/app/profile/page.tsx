"use client";

import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, User, Mail, Phone, Leaf, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Description, Title } from "@/components/profile/headers";
import { ProfileAction } from "@/components/profile/actions";

export default function ProfilePage() {
  const { user, updateUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 shadow-sm">
      <div className="mb-8 space-y-1">
        <Title title="Personal Information" />
        <div className="flex justify-between">
          <Description description="Update your basic profile details here." />
          <ProfileAction isEditing={isEditing} setIsEditing={setIsEditing} handleSave={handleSave} /> 
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-widest text-primary">Full Name</Label>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
              />
            ) : (
              <div className="flex items-center gap-2 py-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-widest text-primary">Email Address</Label>
            {isEditing ? (
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
              />
            ) : (
              <div className="flex items-center gap-2 py-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{user.email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-widest text-primary">Phone Number</Label>
            {isEditing ? (
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
              />
            ) : (
              <div className="flex items-center gap-2 py-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{user.phone}</p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-widest text-primary">Membership Level</Label>
            <div className="flex items-center gap-2 py-2">
              <Leaf className="w-5 h-5 text-muted-foreground" />
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{user.membership}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-6 p-6 bg-primary/5 rounded-2xl border-l-4 border-primary">
        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <ShieldCheck className="w-8 h-8 " />
        </div>
        <div>
          <h4 className="font-bold text-primary dark:text-slate-100 text-lg">Account Verified</h4>
          <p className="text-sm text-muted-foreground dark:text-slate-400">Your profile is fully verified. You are eligible for the Verdant Plus rewards program.</p>
        </div>
      </div>
    </div>
  );
}
