import { create } from "zustand";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  cityState: string;
  postalCode: string;
  taxId: string;
}

interface UserProfileState extends UserProfile {
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  firstName: "Musharof",
  lastName: "Chowdhury",
  email: "randomuser@pimjo.com",
  phone: "+09 363 398 46",
  country: "United States",
  cityState: "Phoenix, Arizona, United States.",
  postalCode: "ERT 2489",
  taxId: "AS4568384",
};

// Load from localStorage or use defaults
const loadProfile = (): UserProfile => {
  const stored = localStorage.getItem("userProfile");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultProfile;
    }
  }
  return defaultProfile;
};

export const useUserProfileStore = create<UserProfileState>((set) => ({
  ...loadProfile(),

  updateProfile: (profile: Partial<UserProfile>) => {
    set((state) => {
      const newProfile = { ...state, ...profile };
      // Save to localStorage
      localStorage.setItem("userProfile", JSON.stringify({
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        email: newProfile.email,
        phone: newProfile.phone,
        country: newProfile.country,
        cityState: newProfile.cityState,
        postalCode: newProfile.postalCode,
        taxId: newProfile.taxId,
      }));
      return newProfile;
    });
  },
}));