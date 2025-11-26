import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=1',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee@example.com',
      role: 'user',
      avatar: 'https://i.pravatar.cc/150?img=2',
      createdAt: '2024-02-20T14:25:00Z'
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'moderator',
      avatar: 'https://i.pravatar.cc/150?img=3',
      createdAt: '2024-03-10T09:15:00Z'
    },
    {
      id: 4,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      avatar: 'https://i.pravatar.cc/150?img=4',
      createdAt: '2024-04-05T16:40:00Z'
    },
    {
      id: 5,
      name: '박민수',
      email: 'park@example.com',
      role: 'user',
      avatar: 'https://i.pravatar.cc/150?img=5',
      createdAt: '2024-05-12T11:20:00Z'
    }
  ];

  return NextResponse.json({
    success: true,
    data: users,
    total: users.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock 응답 - 실제로는 요청 데이터를 사용하여 새 사용자 생성
    const newUser = {
      id: Math.floor(Math.random() * 10000) + 100,
      name: body.name || '새 사용자',
      email: body.email || 'user@example.com',
      role: body.role || 'user',
      avatar: body.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: '사용자가 성공적으로 생성되었습니다.',
      data: newUser,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '요청 처리 중 오류가 발생했습니다.',
      error: 'Invalid JSON'
    }, { status: 400 });
  }
}
