import { NextResponse } from 'next/server';
import { ERROR_MESSAGES } from '../_lib/errorSimulator';

/**
 * GET /api/errors - 사용 가능한 에러 코드 목록 반환
 */
export async function GET() {
  const availableErrors = Object.entries(ERROR_MESSAGES).map(([code, info]) => ({
    code: parseInt(code),
    message: info.message,
    description: info.description,
    endpoint: `/api/errors/${code}`,
  }));

  return NextResponse.json({
    success: true,
    message: 'Mock Error API - 사용 가능한 에러 코드 목록',
    usage: {
      direct: 'GET /api/errors/{code} - 해당 에러 코드로 응답',
      withDelay: 'GET /api/errors/{code}?delay=2000 - 딜레이 후 에러 응답',
      withMessage: 'GET /api/errors/{code}?message=Custom+Error - 커스텀 메시지',
      onExistingApi: 'GET /api/users?_error=500 - 기존 API에서 에러 시뮬레이션',
      withDelayOnApi: 'GET /api/users?_delay=3000 - 기존 API 응답 지연',
      randomError: 'GET /api/users?_random_error=30 - 30% 확률로 랜덤 에러',
      timeout: 'GET /api/users?_timeout=true - 타임아웃 시뮬레이션',
    },
    errors: availableErrors,
    timestamp: new Date().toISOString(),
  });
}
