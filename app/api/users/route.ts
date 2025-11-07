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
