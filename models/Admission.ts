import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmission extends Document {
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  classApplied: string;
  message: string;
  createdAt: Date;
}

const AdmissionSchema: Schema = new Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
  },
  parentName: {
    type: String,
    required: [true, 'Please provide parent name'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
  },
  classApplied: {
    type: String,
    required: [true, 'Please provide class'],
  },
  message: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admission: Model<IAdmission> = mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);

export default Admission;
