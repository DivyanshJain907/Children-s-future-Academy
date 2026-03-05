import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPageConfig extends Document {
  pageName: string;
  sections: Array<{
    id: string;
    type: string;
    visible: boolean;
    order: number;
    content: {
      title?: string;
      subtitle?: string;
      description?: string;
      imageUrl?: string;
      buttonText?: string;
      buttonLink?: string;
      stats?: Array<{
        label: string;
        value: string;
        icon?: string;
      }>;
      items?: Array<any>;
    };
  }>;
  updatedAt: Date;
}

const PageConfigSchema: Schema = new Schema({
  pageName: {
    type: String,
    required: true,
    unique: true,
  },
  sections: [{
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: true,
    },
    content: {
      type: Object,
      default: {},
    }
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const PageConfig: Model<IPageConfig> = mongoose.models.PageConfig || mongoose.model<IPageConfig>('PageConfig', PageConfigSchema);

export default PageConfig;
