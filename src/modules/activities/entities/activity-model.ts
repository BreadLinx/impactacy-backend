import { Schema, model, Types, ObjectId } from "mongoose";

export interface ActivityDoc {
  title: string;
  text: string;
  owner: ObjectId;
  likes: ObjectId[];
  dislikes: ObjectId[];
  promotions: ObjectId[];
  createdAt: Date;
}

const activitySchema = new Schema<ActivityDoc>({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  text: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10000,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [Types.ObjectId],
    default: [],
    ref: "user",
  },
  dislikes: {
    type: [Types.ObjectId],
    default: [],
    ref: "user",
  },
  promotions: {
    type: [Types.ObjectId],
    default: [],
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Activity = model<ActivityDoc>("activity", activitySchema);
export default Activity;
