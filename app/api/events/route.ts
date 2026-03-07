import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, date, icon, color, password } = await request.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!title || !description || !date) {
      return NextResponse.json(
        { success: false, error: 'Please provide title, description, and date' },
        { status: 400 }
      );
    }

    await connectDB();
    const event = await Event.create({ title, description, date, icon, color });
    
    // Revalidate pages that display events
    revalidatePath('/');
    revalidatePath('/admin');
    
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
