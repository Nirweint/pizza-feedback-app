import {RootStateType} from "../store";
import {FeedbackType} from "../../types";

export const selectFeedbacks = (state: RootStateType): FeedbackType[] => state.feedback.feedback;