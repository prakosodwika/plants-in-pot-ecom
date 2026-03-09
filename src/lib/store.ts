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
          id: "ORD-1234",
          date: "Oct 12, 2023",
          status: "Shipped",
          total: 85.0,
          items: [],
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
