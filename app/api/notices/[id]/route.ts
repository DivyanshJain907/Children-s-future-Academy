import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Notice from '@/models/Notice';

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
    const notice = await Notice.findByIdAndDelete(params.id);

    if (!notice) {
      return NextResponse.json(
        { success: false, error: 'Notice not found' },
        { status: 404 }
      );
    }
    
    // Revalidate pages that display notices
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
