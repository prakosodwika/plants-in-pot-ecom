import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./data";

interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  membership: string;
  avatar: string;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
  address: Address;
}

interface Courier {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

interface StoreState {
  user: User;
  cart: CartItem[];
  wishlist: Product[];
  addresses: Address[];
  address: Address | null;
  courier: Courier | null;
  orders: Order[];
  updateUser: (user: Partial<User>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  setAddress: (address: Address) => void;
  setCourier: (courier: Courier) => void;
  addOrder: (order: Omit<Order, "id" | "date">) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: {
        name: "Alex Gardener",
        email: "alex.gardener@botany.com",
        phone: "+1 (555) 234-5678",
        membership: "Seedling Explorer",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdQOxHsbHjZqGHbejlgbtpvoHM_hFVXvnduHsXEV7399pyxY29dZWSnmcsYjAzBQVkVUH52RM3uAkIxh7ZOE-mXqEu9P59B5mbFHmbqjz-s3nIgakOXqAVCdrnigURGqFOtt5kCVFz8YUBIG3EBIIucAfKq860mpR9RjyHIekJzGx9cLW5IEVDJFTlqDclEUAC6fzmQvV2bMGhiWfyelcGLdFpGrrk8pcsuHJPz-GI6MoEYv-xMFgdXT7I3voTh8UwicGdsGNA85U",
      },
      cart: [],
      wishlist: [],
      addresses: [
        {
          id: "1",
          fullName: "Alex Gardener",
          street: "123 Fern Avenue, Greenhouse District",
          city: "Portland",
          state: "OR",
          zipCode: "97201",
          phone: "+1 (555) 234-5678",
          isDefault: true,
        },
      ],
      address: null,
      courier: null,
      orders: [
        {
          id: "ORD-8821",
          date: "Mar 05, 2024",
          status: "Delivered",
          total: 128.0,
          items: [
            {
              id: "1",
              name: "Monstera Adansonii",
              price: 45.0,
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0hkG6p94-0BdkHQjrX61DiCq_hGlClgotOjbLnmj3caqLH4-MbL5qEvky3pRjFo0_ppA4Qp7lTUxZ8rty3PUjBf1BAXlM0EX4U3dH1ENKIskDFNFl8WJU2wNWMFNBq6hRCt2uPxRoy1ywe-n6EUJQIH1TB33gVoAN9TP4OoG8suWMk0K0qtABVzbdzupaYfqvHWipUZ6nfIj4EIn6Xz0wSdT4EOvkrZUOPu_87yQIigABp8j76LRftSeKYaq3kA5QhfZm9SmeiBU",
              category: "Indoor Plants",
              description: "The Adansonii is a unique, trailing Monstera with beautiful, oval-shaped leaves.",
              quantity: 1,
            },
            {
              id: "3",
              name: "Bird of Paradise",
              price: 85.0,
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRDOL0sb2T_g6rf264GQogQWWDOPhzozv_gi5zuWYTPIuAnouhJngZkzy8fpzgsce-z3MkxIeCScQMeqh9cjUFc3wBrq3xDdL9uPjVQFnnIlIkD--dy2ML42TruDhDCA0OePte5r6g6gvnuZ9FWAp4-IZGrpn-55YaaFoflujNVK9E0tfHjq1fCDLP88TyIP1dTcmE21mmcvK05wl1qdmqHor4bFhLKbnHXx3Jh_6RdoiNsnmNg6ADHHjvqMqSa_w3aiIZ7BvHs2g",
              category: "Indoor Plants",
              description: "The Bird of Paradise is a dramatic, large-leafed plant that brings a tropical vibe.",
              quantity: 1,
            }
          ],
          address: {
            id: "1",
            fullName: "Alex Gardener",
            street: "123 Fern Avenue, Greenhouse District",
            city: "Portland",
            state: "OR",
            zipCode: "97201",
            phone: "+1 (555) 234-5678",
          },
        },
        {
          id: "ORD-9932",
          date: "Mar 08, 2024",
          status: "Processing",
          total: 150.0,
          items: [
            {
              id: "5",
              name: "Fiddle Leaf Fig",
              price: 150.0,
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvThJENSVIRjgc9Cq5tn0vY5eW_k-vX51upwPpN2Z2PeKiPZgKdrin8ug_8m9RKuGhTqwXfzFCS9S-HAX-a5BbX5vV0leqIo5cefA0pnaKFpoDLOutNKWJRnUn_Kyd5PVr4D1WzkU-eGy7r5jJDru15nldq1u5DbZf15t9L8vOa3nuv0ntfQr7sm1bOTS4leIXovwvL3v98Chm2Ovr85u_MbL30hQNrg-7m5qotQAh1EPePIT4UgG9HrvEsWReswOMlSINaEhLkr4",
              category: "Indoor Trees",
              description: "The Fiddle Leaf Fig is the ultimate statement piece for any bright room.",
              quantity: 1,
            }
          ],
          address: {
            id: "1",
            fullName: "Alex Gardener",
            street: "123 Fern Avenue, Greenhouse District",
            city: "Portland",
            state: "OR",
            zipCode: "97201",
            phone: "+1 (555) 234-5678",
          },
        },
      ],
      updateUser: (userUpdates) =>
        set((state) => ({ user: { ...state.user, ...userUpdates } })),
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.find((item) => item.id === product.id)) return state;
          return { wishlist: [...state.wishlist, product] };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),
      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...address, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      updateAddress: (id, addressUpdates) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...addressUpdates } : a
          ),
        })),
      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),
      setAddress: (address) => set({ address }),
      setCourier: (courier) => set({ courier }),
      addOrder: (order) =>
        set((state) => ({
          orders: [
            {
              ...order,
              id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
              date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
            },
            ...state.orders,
          ],
        })),
      clearCart: () => set({ cart: [], address: null, courier: null }),
    }),
    {
      name: "plant-ecom-store",
    }
  )
);
