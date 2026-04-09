import { NextRequest, NextResponse } from 'next/server';
import { withErrorSimulation } from '../_lib/errorSimulator';

async function handleGet(request: NextRequest) {
  const comments = [
    {
      id: 1,
      postId: 1,
      userId: 2,
      userName: '이영희',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: '정말 유익한 정보네요! 감사합니다.',
      likes: 5,
      replies: 2,
      createdAt: '2024-10-02T09:15:00Z',
      updatedAt: '2024-10-02T09:15:00Z'
    },
    {
      id: 2,
      postId: 1,
      userId: 3,
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Next.js 14 정말 기대됩니다.',
      likes: 3,
      replies: 0,
      createdAt: '2024-10-02T10:30:00Z',
      updatedAt: '2024-10-02T10:30:00Z'
    },
    {
      id: 3,
      postId: 2,
      userId: 1,
      userName: '김철수',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      content: 'TypeScript는 정말 필수가 된 것 같아요.',
      likes: 8,
      replies: 1,
      createdAt: '2024-10-06T11:20:00Z',
      updatedAt: '2024-10-06T11:20:00Z'
    },
    {
      id: 4,
      postId: 3,
      userId: 4,
      userName: 'Jane Smith',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      content: 'useCallback 사용법이 헷갈렸는데 도움이 많이 됐습니다!',
      likes: 12,
      replies: 3,
      createdAt: '2024-10-11T14:45:00Z',
      updatedAt: '2024-10-11T14:45:00Z'
    },
    {
      id: 5,
      postId: 3,
      userId: 5,
      userName: '박민수',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      content: 'React 공식 문서와 함께 보면 더 좋을 것 같네요.',
      likes: 6,
      replies: 0,
      createdAt: '2024-10-12T08:30:00Z',
      updatedAt: '2024-10-12T08:30:00Z'
    },
    {
      id: 6,
      postId: 4,
      userId: 2,
      userName: '이영희',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: 'REST API 설계할 때 항상 참고하고 있습니다.',
      likes: 9,
      replies: 1,
      createdAt: '2024-10-16T13:10:00Z',
      updatedAt: '2024-10-16T13:10:00Z'
    }
  ];

  return NextResponse.json({
    success: true,
    data: comments,
    total: comments.length,
    timestamp: new Date().toISOString()
  });
}

async function handlePost(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newComment = {
      id: Math.floor(Math.random() * 10000) + 100,
      postId: body.postId || 1,
      userId: body.userId || 1,
      userName: body.userName || '익명',
      userAvatar: body.userAvatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      content: body.content || '댓글 내용',
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: '댓글이 성공적으로 생성되었습니다.',
      data: newComment,
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

export const GET = withErrorSimulation(handleGet);
export const POST = withErrorSimulation(handlePost);
