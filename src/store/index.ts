import { create } from "zustand";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    try {
      // Mock login - replace with real API call
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: email,
        role: "manager",
        connectedPlatforms: ["linkedin", "instagram"],
      };
      set({ user: mockUser, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: () => {
    set({ user: null });
  },
}));

interface NotificationStore {
  notifications: Array<{
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
  }>;
  addNotification: (type: string, message: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (type: string, message: string) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, type: type as any, message }],
    }));
    // Auto-remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 3000);
  },
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

interface UIStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useUI = create<UIStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
}));
