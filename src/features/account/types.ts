export type TravelerProfile = {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string;
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

