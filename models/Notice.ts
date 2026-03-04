import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INotice extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const NoticeSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);

export default Notice;
