import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ createdAt: -1 }).limit(10);
    
    return NextResponse.json({ success: true, data: notices }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, password } = await request.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Please provide title and description' },
        { status: 400 }
      );
    }

    await connectDB();
    const notice = await Notice.create({ title, description });
    
    // Revalidate pages that display notices
    revalidatePath('/');
    revalidatePath('/admin');
    
    return NextResponse.json({ success: true, data: notice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
