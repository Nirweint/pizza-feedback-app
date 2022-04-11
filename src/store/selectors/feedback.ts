import {RootStateType} from "../store";
import {FeedbackType, GuestDietType, PartyGuestType} from "../../types";

export const selectFeedbacks = (state: RootStateType): FeedbackType[] => state.feedback.feedback;
export const selectGuests = (state: RootStateType): PartyGuestType[] => state.feedback.guests;
export const selectDiet = (state: RootStateType): GuestDietType[] => state.feedback.diet;
export const selectIsFeedbackInitialized = (state: RootStateType): boolean => state.feedback.isFeedbackInitialized;
