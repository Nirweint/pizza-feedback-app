export type FeedbackType = {
  name: string;
  rating: number;
  phone: string;
  comment: string;
};

export type PartyGuestType = {
  name: string;
  eatsPizza: boolean;
};

export type GuestDietType = {
  name: string;
  isVegan: boolean;
};

export type ProgressBarType = {
  currentProgress: number;
  maxValue: number;
}