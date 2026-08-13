export type TravelerProfile = {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  full_name: string;
  interests: string[];
  traveler_type: string;
  onboarding_complete: boolean;
};

export type OnboardingInput = {
  full_name: string;
  interests: string[];
  traveler_type: string;
};

export type AuthUserResponse = {
  user: TravelerProfile;
};
