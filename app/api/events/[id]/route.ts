import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, date, icon, color, password } = await request.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const event = await Event.findByIdAndUpdate(
      params.id,
      { title, description, date, icon, color },
      { new: true, runValidators: true }
    );

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Revalidate pages that display events
    revalidatePath('/');
    revalidatePath('/admin');
    
    return NextResponse.json({ success: true, data: event }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { password } = await request.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const event = await Event.findByIdAndDelete(params.id);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Revalidate pages that display events
    revalidatePath('/');
    revalidatePath('/admin');
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
