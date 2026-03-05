import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET() {
  try {
    await connectDB();
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    
    return NextResponse.json({ success: true, data: images }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, category, password } = await request.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Please provide image URL' },
        { status: 400 }
      );
    }

    await connectDB();
    const galleryItem = await Gallery.create({ imageUrl, category: category || 'other' });
    
    // Revalidate pages that display gallery
    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath('/admin');
    
    return NextResponse.json({ success: true, data: galleryItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
