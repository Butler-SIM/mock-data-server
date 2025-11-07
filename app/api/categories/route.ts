import { NextResponse } from 'next/server';

export async function GET() {
  const categories = [
    {
      id: 1,
      name: 'Technology',
      slug: 'tech',
      description: '기술 관련 콘텐츠',
      icon: '💻',
      color: '#3B82F6',
      postCount: 45,
      isActive: true,
      parentId: null,
      order: 1
    },
    {
      id: 2,
      name: 'Programming',
      slug: 'programming',
      description: '프로그래밍 튜토리얼과 가이드',
      icon: '👨‍💻',
      color: '#8B5CF6',
      postCount: 78,
      isActive: true,
      parentId: 1,
      order: 2
    },
    {
      id: 3,
      name: 'Design',
      slug: 'design',
      description: 'UI/UX 디자인',
      icon: '🎨',
      color: '#EC4899',
      postCount: 32,
      isActive: true,
      parentId: null,
      order: 3
    },
    {
      id: 4,
      name: 'DevOps',
      slug: 'devops',
      description: '개발 운영 및 인프라',
      icon: '⚙️',
      color: '#10B981',
      postCount: 23,
      isActive: true,
      parentId: 1,
      order: 4
    },
    {
      id: 5,
      name: 'Mobile',
      slug: 'mobile',
      description: '모바일 앱 개발',
      icon: '📱',
      color: '#F59E0B',
      postCount: 56,
      isActive: true,
      parentId: 2,
      order: 5
    },
    {
      id: 6,
      name: 'Data Science',
      slug: 'data-science',
      description: '데이터 분석 및 머신러닝',
      icon: '📊',
      color: '#6366F1',
      postCount: 41,
      isActive: true,
      parentId: null,
      order: 6
    },
    {
      id: 7,
      name: 'Security',
      slug: 'security',
      description: '보안 및 개인정보 보호',
      icon: '🔒',
      color: '#EF4444',
      postCount: 19,
      isActive: false,
      parentId: 1,
      order: 7
    }
  ];

  return NextResponse.json({
    success: true,
    data: categories,
    total: categories.length,
    active: categories.filter(c => c.isActive).length,
    timestamp: new Date().toISOString()
  });
}
