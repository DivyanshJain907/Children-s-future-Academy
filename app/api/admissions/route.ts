import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admission from '@/models/Admission';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, parentName, phone, email, classApplied, message } = body;

    if (!studentName || !parentName || !phone || !email || !classApplied) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    const admission = await Admission.create({
      studentName,
      parentName,
      phone,
      email,
      classApplied,
      message: message || '',
    });
    
    return NextResponse.json(
      { success: true, data: admission, message: 'Application submitted successfully!' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const admissions = await Admission.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: admissions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
