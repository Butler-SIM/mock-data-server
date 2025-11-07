import { NextResponse } from 'next/server';

export async function GET() {
  const analytics = {
    overview: {
      totalUsers: 15234,
      activeUsers: 8567,
      newUsersToday: 234,
      totalPosts: 4521,
      totalComments: 12890,
      totalViews: 456789
    },
    userGrowth: [
      { date: '2024-11-01', users: 14850, newUsers: 125 },
      { date: '2024-11-02', users: 14920, newUsers: 70 },
      { date: '2024-11-03', users: 15000, newUsers: 80 },
      { date: '2024-11-04', users: 15080, newUsers: 80 },
      { date: '2024-11-05', users: 15150, newUsers: 70 },
      { date: '2024-11-06', users: 15200, newUsers: 50 },
      { date: '2024-11-07', users: 15234, newUsers: 34 }
    ],
    topPosts: [
      { postId: 3, title: 'React Hooks 심화 학습', views: 3890, likes: 156 },
      { postId: 5, title: 'Docker 컨테이너 완벽 가이드', views: 5420, likes: 201 },
      { postId: 2, title: 'TypeScript 완벽 가이드', views: 2340, likes: 89 }
    ],
    trafficSources: [
      { source: 'direct', visits: 12450, percentage: 45.2 },
      { source: 'search', visits: 8920, percentage: 32.4 },
      { source: 'social', visits: 4230, percentage: 15.3 },
      { source: 'referral', visits: 1950, percentage: 7.1 }
    ],
    deviceStats: {
      desktop: 15678,
      mobile: 8934,
      tablet: 2456
    },
    engagement: {
      averageSessionDuration: '5m 32s',
      bounceRate: 42.3,
      pagesPerSession: 3.8,
      averageTimeOnPage: '2m 15s'
    },
    revenueData: {
      today: 125000,
      thisWeek: 890000,
      thisMonth: 3450000,
      currency: 'KRW'
    }
  };

  return NextResponse.json({
    success: true,
    data: analytics,
    generatedAt: new Date().toISOString(),
    period: 'last_7_days'
  });
}
