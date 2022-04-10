import {RootStateType} from "../store";
import {FeedbackType, PartyGuestType} from "../../types";

export const selectFeedbacks = (state: RootStateType): FeedbackType[] => state.feedback.feedback;
export const selectGuests = (state: RootStateType): PartyGuestType[] => state.feedback.guests;
