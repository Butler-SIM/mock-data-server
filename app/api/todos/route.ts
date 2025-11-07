import { NextResponse } from 'next/server';

export async function GET() {
  const todos = [
    {
      id: 1,
      title: 'Next.js 프로젝트 설정',
      description: '새로운 프로젝트를 위한 Next.js 초기 설정',
      completed: true,
      priority: 'high',
      dueDate: '2024-10-25',
      assignedTo: '김철수',
      assignedToId: 1,
      tags: ['development', 'setup'],
      createdAt: '2024-10-20T09:00:00Z',
      completedAt: '2024-10-22T15:30:00Z'
    },
    {
      id: 2,
      title: 'API 문서 작성',
      description: 'REST API 엔드포인트 문서화',
      completed: false,
      priority: 'medium',
      dueDate: '2024-11-05',
      assignedTo: '이영희',
      assignedToId: 2,
      tags: ['documentation', 'api'],
      createdAt: '2024-10-21T10:30:00Z',
      completedAt: null
    },
    {
      id: 3,
      title: '데이터베이스 마이그레이션',
      description: '새로운 스키마로 데이터베이스 업데이트',
      completed: false,
      priority: 'high',
      dueDate: '2024-10-30',
      assignedTo: 'John Doe',
      assignedToId: 3,
      tags: ['database', 'migration'],
      createdAt: '2024-10-22T14:15:00Z',
      completedAt: null
    },
    {
      id: 4,
      title: '유닛 테스트 작성',
      description: '핵심 기능에 대한 테스트 코드 작성',
      completed: true,
      priority: 'medium',
      dueDate: '2024-10-28',
      assignedTo: 'Jane Smith',
      assignedToId: 4,
      tags: ['testing', 'quality'],
      createdAt: '2024-10-23T11:20:00Z',
      completedAt: '2024-10-27T16:45:00Z'
    },
    {
      id: 5,
      title: 'UI 디자인 검토',
      description: '사용자 인터페이스 개선사항 검토',
      completed: false,
      priority: 'low',
      dueDate: '2024-11-10',
      assignedTo: '박민수',
      assignedToId: 5,
      tags: ['design', 'ui'],
      createdAt: '2024-10-24T08:45:00Z',
      completedAt: null
    }
  ];

  return NextResponse.json({
    success: true,
    data: todos,
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    timestamp: new Date().toISOString()
  });
}
