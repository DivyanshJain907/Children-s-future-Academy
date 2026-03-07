import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  createdAt: Date;
}

const EventSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  date: {
    type: String,
    required: [true, 'Please provide an event date'],
  },
  icon: {
    type: String,
    default: '📅',
  },
  color: {
    type: String,
    enum: ['primary', 'accent', 'blue'],
    default: 'primary',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
