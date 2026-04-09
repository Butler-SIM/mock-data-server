import { NextRequest, NextResponse } from 'next/server';
import { withErrorSimulation } from '../_lib/errorSimulator';

async function handleGet(request: NextRequest) {
  const posts = [
    {
      id: 1,
      title: 'Next.js 14 새로운 기능 소개',
      content: 'Next.js 14에서 추가된 새로운 기능들을 알아봅니다.',
      author: '김철수',
      authorId: 1,
      category: 'tech',
      tags: ['nextjs', 'react', 'web'],
      likes: 42,
      views: 1250,
      published: true,
      createdAt: '2024-10-01T08:00:00Z',
      updatedAt: '2024-10-02T10:30:00Z'
    },
    {
      id: 2,
      title: 'TypeScript 완벽 가이드',
      content: 'TypeScript를 사용하여 타입 안정성을 높이는 방법',
      author: '이영희',
      authorId: 2,
      category: 'programming',
      tags: ['typescript', 'javascript'],
      likes: 89,
      views: 2340,
      published: true,
      createdAt: '2024-10-05T14:20:00Z',
      updatedAt: '2024-10-05T14:20:00Z'
    },
    {
      id: 3,
      title: 'React Hooks 심화 학습',
      content: 'useEffect, useMemo, useCallback 등 고급 훅 활용법',
      author: 'John Doe',
      authorId: 3,
      category: 'tutorial',
      tags: ['react', 'hooks', 'frontend'],
      likes: 156,
      views: 3890,
      published: true,
      createdAt: '2024-10-10T09:45:00Z',
      updatedAt: '2024-10-11T12:00:00Z'
    },
    {
      id: 4,
      title: 'REST API 설계 모범 사례',
      content: 'RESTful API 설계 시 고려해야 할 사항들',
      author: 'Jane Smith',
      authorId: 4,
      category: 'backend',
      tags: ['api', 'rest', 'design'],
      likes: 73,
      views: 1680,
      published: true,
      createdAt: '2024-10-15T11:30:00Z',
      updatedAt: '2024-10-15T11:30:00Z'
    },
    {
      id: 5,
      title: 'Docker 컨테이너 완벽 가이드',
      content: 'Docker를 활용한 애플리케이션 배포 전략',
      author: '박민수',
      authorId: 5,
      category: 'devops',
      tags: ['docker', 'container', 'deployment'],
      likes: 201,
      views: 5420,
      published: false,
      createdAt: '2024-10-20T16:15:00Z',
      updatedAt: '2024-10-21T09:20:00Z'
    }
  ];

  return NextResponse.json({
    success: true,
    data: posts,
    total: posts.length,
    timestamp: new Date().toISOString()
  });
}

async function handlePost(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newPost = {
      id: Math.floor(Math.random() * 10000) + 100,
      title: body.title || '새 게시글',
      content: body.content || '게시글 내용',
      author: body.author || '익명',
      authorId: body.authorId || 1,
      category: body.category || 'general',
      tags: body.tags || [],
      likes: 0,
      views: 0,
      published: body.published !== undefined ? body.published : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: '게시글이 성공적으로 생성되었습니다.',
      data: newPost,
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
