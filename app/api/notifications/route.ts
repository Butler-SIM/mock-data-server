import { NextRequest, NextResponse } from 'next/server';
import { withErrorSimulation } from '../_lib/errorSimulator';

async function handleGet(request: NextRequest) {
  const notifications = [
    {
      id: 1,
      type: 'comment',
      title: '새로운 댓글',
      message: '이영희님이 회원님의 게시물에 댓글을 남겼습니다.',
      read: false,
      userId: 1,
      relatedId: 1,
      relatedType: 'post',
      actionUrl: '/posts/1',
      icon: '💬',
      priority: 'normal',
      createdAt: '2024-11-07T10:30:00Z'
    },
    {
      id: 2,
      type: 'like',
      title: '좋아요',
      message: 'John Doe님이 회원님의 게시물을 좋아합니다.',
      read: false,
      userId: 1,
      relatedId: 3,
      relatedType: 'post',
      actionUrl: '/posts/3',
      icon: '❤️',
      priority: 'low',
      createdAt: '2024-11-07T09:15:00Z'
    },
    {
      id: 3,
      type: 'system',
      title: '시스템 업데이트',
      message: '시스템이 업데이트되었습니다. 새로운 기능을 확인하세요.',
      read: true,
      userId: 1,
      relatedId: null,
      relatedType: 'system',
      actionUrl: '/updates',
      icon: '🔔',
      priority: 'high',
      createdAt: '2024-11-06T08:00:00Z'
    },
    {
      id: 4,
      type: 'mention',
      title: '멘션',
      message: 'Jane Smith님이 댓글에서 회원님을 언급했습니다.',
      read: false,
      userId: 1,
      relatedId: 5,
      relatedType: 'comment',
      actionUrl: '/posts/3#comment-5',
      icon: '@',
      priority: 'normal',
      createdAt: '2024-11-06T16:45:00Z'
    },
    {
      id: 5,
      type: 'follow',
      title: '새로운 팔로워',
      message: '박민수님이 회원님을 팔로우하기 시작했습니다.',
      read: true,
      userId: 1,
      relatedId: 5,
      relatedType: 'user',
      actionUrl: '/users/5',
      icon: '👤',
      priority: 'low',
      createdAt: '2024-11-05T14:20:00Z'
    },
    {
      id: 6,
      type: 'achievement',
      title: '업적 달성',
      message: '축하합니다! "100개 게시물 작성" 업적을 달성했습니다.',
      read: true,
      userId: 1,
      relatedId: null,
      relatedType: 'achievement',
      actionUrl: '/achievements',
      icon: '🏆',
      priority: 'normal',
      createdAt: '2024-11-04T12:00:00Z'
    }
  ];

  return NextResponse.json({
    success: true,
    data: notifications,
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    timestamp: new Date().toISOString()
  });
}

export const GET = withErrorSimulation(handleGet);
