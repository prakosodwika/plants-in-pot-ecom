"use client";

import { useState } from "react";
import { customers as initialCustomers, Customer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  User as UserIcon,
  Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "Active",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
      toast.error("Customer removed from database");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...formData } as Customer : c));
      toast.success("Customer profile updated");
    } else {
      const newCustomer: Customer = {
        ...formData,
        id: `CUS-${Math.floor(100 + Math.random() * 900)}`,
        totalOrders: 0,
        totalSpent: 0,
        joinedDate: new Date().toISOString().split('T')[0],
      } as Customer;
      setCustomers([newCustomer, ...customers]);
      toast.success("New customer added");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-8 space-y-8 text-left">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Customers</h2>
            <p className="text-slate-500 font-medium">Manage your community of plant parents.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAdd} className="bg-primary text-white font-bold flex items-center gap-2 px-6 shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" strokeWidth={3} />
                Add New Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-primary">
                    {editingCustomer ? "Edit Customer" : "Add New Customer"}
                  </DialogTitle>
                  <DialogDescription className="font-medium">
                    {editingCustomer ? "Update the customer's personal information." : "Create a new customer profile for your database."}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-primary">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Jane Smith" 
                      required 
                      className="rounded-xl border-primary/10 h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-primary">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="jane@example.com" 
                      required 
                      className="rounded-xl border-primary/10 h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-wider text-primary">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000" 
                      required 
                      className="rounded-xl border-primary/10 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-primary">Status</Label>
                    <div className="flex gap-4">
                      {["Active", "Inactive"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s as any})}
                          className={cn(
                            "px-6 py-2 rounded-full text-xs font-bold border-2 transition-all",
                            formData.status === s 
                              ? "bg-primary text-white border-primary" 
                              : "border-primary/10 text-slate-400 hover:border-primary/30"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter className="pt-4 gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-xl h-12 px-8 font-black bg-primary text-white shadow-lg shadow-primary/20 flex-1">
                    {editingCustomer ? "Save Changes" : "Create Profile"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-primary/5 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <Input 
              placeholder="Search customers by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 border-none bg-transparent text-lg placeholder:text-slate-300 focus-visible:ring-0"
            />
          </div>
          <div className="h-8 w-[1px] bg-slate-100" />
          <Button variant="ghost" className="flex items-center gap-2 text-slate-400 font-bold px-6">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Info</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Orders</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Spent</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <UserIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none mb-1">{customer.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Joined {new Date(customer.joinedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-primary/40" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-primary/40" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-900">
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-black text-primary">${customer.totalSpent.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-5">
                      <Badge className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                        customer.status === "Active" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-slate-100 text-slate-500"
                      )}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                          onClick={() => handleOpenEdit(customer)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-10 w-10 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-colors"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCustomers.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
              <div className="p-6 bg-slate-50 rounded-full border-2 border-dashed border-slate-200">
                <UserIcon className="w-12 h-12 opacity-20" />
              </div>
              <p className="font-bold">No customers found matching your search.</p>
              <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary font-bold">
                Clear search filter
              </Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
