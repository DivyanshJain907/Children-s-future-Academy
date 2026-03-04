export interface Notice {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface Gallery {
  _id: string;
  imageUrl: string;
  category: 'events' | 'infrastructure' | 'activities' | 'achievements' | 'other';
  uploadedAt: Date;
}

export interface Admission {
  _id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  classApplied: string;
  message?: string;
  createdAt: Date;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
