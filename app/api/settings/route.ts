import { NextRequest, NextResponse } from 'next/server';
import { withErrorSimulation } from '../_lib/errorSimulator';

async function handleGet(request: NextRequest) {
  const settings = {
    general: {
      siteName: 'My Application',
      siteUrl: 'https://example.com',
      adminEmail: 'admin@example.com',
      timezone: 'Asia/Seoul',
      language: 'ko-KR',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h'
    },
    features: {
      enableComments: true,
      enableLikes: true,
      enableSharing: true,
      enableNotifications: true,
      enableSearch: true,
      enableDarkMode: true,
      enableMultiLanguage: false,
      enableAnalytics: true
    },
    security: {
      twoFactorAuth: true,
      passwordMinLength: 8,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      requireEmailVerification: true,
      allowSocialLogin: true,
      allowedDomains: ['example.com', 'test.com']
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      notifyOnComment: true,
      notifyOnLike: false,
      notifyOnMention: true,
      notifyOnFollow: true,
      digestFrequency: 'daily'
    },
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      accentColor: '#EC4899',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      fontSize: 'medium',
      fontFamily: 'Inter, sans-serif',
      borderRadius: 'medium'
    },
    api: {
      rateLimit: 100,
      rateLimitWindow: '15m',
      enableCors: true,
      allowedOrigins: ['*'],
      apiVersion: 'v1',
      enableCache: true,
      cacheTimeout: 300
    },
    storage: {
      maxFileSize: 10485760,
      allowedFileTypes: ['jpg', 'png', 'gif', 'pdf', 'doc', 'docx'],
      storageProvider: 's3',
      cdnEnabled: true,
      cdnUrl: 'https://cdn.example.com'
    }
  };

  return NextResponse.json({
    success: true,
    data: settings,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}

export const GET = withErrorSimulation(handleGet);
