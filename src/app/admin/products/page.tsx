"use client";

import { useState } from "react";
import { products as initialProducts, Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  MoreVertical, 
  ExternalLink,
  Image as ImageIcon
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    isNew: false,
    isBestSeller: false,
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
      isNew: true,
      isBestSeller: false,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      toast.error("Product deleted successfully");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p));
      toast.success("Product updated successfully");
    } else {
      // Create
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Product;
      setProducts([newProduct, ...products]);
      toast.success("Product created successfully");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-8 space-y-8 text-left">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Inventory</h2>
            <p className="text-slate-500 font-medium">Manage your botanical collection and pricing.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAdd} className="bg-primary text-white font-bold flex items-center gap-2 px-6 shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" strokeWidth={3} />
                Add New Plant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-primary">
                    {editingProduct ? "Edit Plant" : "Add New Plant"}
                  </DialogTitle>
                  <DialogDescription className="font-medium">
                    Enter the details of the plant below. All fields are required.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-primary">Plant Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Monstera Deliciosa" 
                      required 
                      className="rounded-xl border-primary/10 h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-xs font-black uppercase tracking-wider text-primary">Category</Label>
                    <Input 
                      id="category" 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="e.g. Indoor Plants" 
                      required 
                      className="rounded-xl border-primary/10 h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-xs font-black uppercase tracking-wider text-primary">Price ($)</Label>
                    <Input 
                      id="price" 
                      type="number"
                      step="0.01"
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      placeholder="45.00" 
                      required 
                      className="rounded-xl border-primary/10 h-12"
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="image" className="text-xs font-black uppercase tracking-wider text-primary">Image URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="image" 
                        value={formData.image} 
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://images.unsplash.com/..." 
                        required 
                        className="rounded-xl border-primary/10 h-12 flex-1"
                      />
                      {formData.image && (
                        <div className="h-12 w-12 rounded-xl border border-primary/10 overflow-hidden relative shrink-0">
                          <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description" className="text-xs font-black uppercase tracking-wider text-primary">Description</Label>
                    <textarea 
                      id="description" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the plant's unique features..." 
                      required 
                      className="w-full min-h-[100px] p-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isNew" 
                        checked={formData.isNew}
                        onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                        className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="isNew" className="text-xs font-bold text-slate-600">New Arrival</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isBestSeller" 
                        checked={formData.isBestSeller}
                        onChange={(e) => setFormData({...formData, isBestSeller: e.target.checked})}
                        className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="isBestSeller" className="text-xs font-bold text-slate-600">Best Seller</Label>
                    </div>
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-xl h-12 px-8 font-black bg-primary text-white shadow-lg shadow-primary/20 flex-1">
                    {editingProduct ? "Update Plant Details" : "Create New Plant"}
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
              placeholder="Search by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 border-none bg-transparent text-lg placeholder:text-slate-300 focus-visible:ring-0"
            />
          </div>
          <div className="h-8 w-[1px] bg-slate-100" />
          <div className="px-4 text-sm font-bold text-slate-400">
            {filteredProducts.length} Plants
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 rounded-3xl">
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                    onClick={() => handleOpenEdit(product)}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full w-12 h-12 bg-white text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <Link href={`/product/${product.id}`} target="_blank">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full w-12 h-12 bg-white text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                {(product.isNew || product.isBestSeller) && (
                   <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">New</span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Best</span>
                      )}
                   </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{product.category}</span>
                  <p className="font-black text-primary">${product.price.toFixed(2)}</p>
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors truncate">{product.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
              <div className="p-6 bg-slate-50 rounded-full border-2 border-dashed border-slate-200">
                <ImageIcon className="w-12 h-12 opacity-20" />
              </div>
              <p className="font-bold">No plants found matching your search.</p>
              <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary font-bold">
                Clear search filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
