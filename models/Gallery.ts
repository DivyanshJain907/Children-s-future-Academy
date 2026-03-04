import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGallery extends Document {
  imageUrl: string;
  category: string;
  uploadedAt: Date;
}

const GallerySchema: Schema = new Schema({
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['events', 'infrastructure', 'activities', 'achievements', 'other'],
    default: 'other',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
