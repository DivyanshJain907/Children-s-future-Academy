import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import PageConfig from '@/models/PageConfig';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageName = searchParams.get('page') || 'home';

    await connectDB();
    let config = await PageConfig.findOne({ pageName });

    // If no config exists, return default structure
    if (!config) {
      return NextResponse.json({ 
        success: true, 
        data: {
          pageName,
          sections: getDefaultSections(),
        }
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, data: config }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { pageName, sections, password } = await request.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const config = await PageConfig.findOneAndUpdate(
      { pageName },
      { pageName, sections, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // Revalidate the page
    revalidatePath('/');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, data: config }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function getDefaultSections() {
  return [
    {
      id: 'hero',
      type: 'hero',
      visible: true,
      order: 1,
      content: {
        title: "Welcome to Children's Future Academy",
        subtitle: "Nurturing young minds with quality education since 2000 - From Pre-Primary to Class VIII",
        imageUrl: '/hero.png',
      }
    },
    {
      id: 'about',
      type: 'about',
      visible: true,
      order: 2,
      content: {
        title: 'Quality Education in Moradabad',
        subtitle: '1679 Students | 44 Teachers | Classes Pre-Primary to VIII',
        description: 'Private Unaided Co-educational School located in Saraswati Vihar, Govind Nagar. Providing comprehensive education with modern facilities and dedicated faculty.',
        images: [
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=800&fit=crop'
        ],
        stats: [
          { icon: '👨‍🎓', label: 'Students', value: '1679' },
          { icon: '👨‍🏫', label: 'Teachers', value: '44' },
          { icon: '📚', label: 'Classes', value: 'Pre-Primary to VIII' },
        ]
      }
    },
    {
      id: 'features',
      type: 'features',
      visible: true,
      order: 3,
      content: {
        title: 'Features & Facilities',
        imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=600&fit=crop',
        items: [
          { icon: '🎓', title: 'Quality Education', description: 'Comprehensive curriculum from Pre-Primary to Class VIII' },
          { icon: '👨‍🏫', title: 'Experienced Faculty', description: '44 dedicated teachers committed to student success' },
          { icon: '🏫', title: 'Modern Infrastructure', description: 'Well-equipped classrooms and learning spaces' },
          { icon: '🎨', title: 'Co-curricular Activities', description: 'Sports, arts, and extracurricular programs' },
        ]
      }
    },
    {
      id: 'notices',
      type: 'notices',
      visible: true,
      order: 4,
      content: {
        title: 'Latest Notices',
      }
    },
    {
      id: 'gallery',
      type: 'gallery',
      visible: true,
      order: 5,
      content: {
        title: 'Gallery',
        description: 'Glimpses from our school life',
      }
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      visible: true,
      order: 6,
      content: {
        title: 'What Parents Say',
      }
    }
  ];
}
