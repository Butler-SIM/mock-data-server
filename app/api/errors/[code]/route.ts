import { NextRequest } from 'next/server';
import { createErrorResponse, ERROR_MESSAGES } from '../../_lib/errorSimulator';

/**
 * 에러 시뮬레이션 전용 엔드포인트
 * 
 * GET /api/errors/[code] - 해당 HTTP 에러 코드로 응답
 * POST /api/errors/[code] - 해당 HTTP 에러 코드로 응답 (POST도 지원)
 * 
 * Query Parameters:
 * - message: 커스텀 에러 메시지 (예: ?message=Custom+Error)
 * - delay: 응답 지연 시간 ms (예: ?delay=2000)
 * 
 * Examples:
 *   GET /api/errors/400           → 400 Bad Request
 *   GET /api/errors/401           → 401 Unauthorized
 *   GET /api/errors/403           → 403 Forbidden
 *   GET /api/errors/404           → 404 Not Found
 *   GET /api/errors/422           → 422 Unprocessable Entity (유효성 검사 에러 포함)
 *   GET /api/errors/429           → 429 Too Many Requests (Rate Limit 정보 포함)
 *   GET /api/errors/500           → 500 Internal Server Error
 *   GET /api/errors/503?delay=3000 → 3초 딜레이 후 503 Service Unavailable
 */

async function handleError(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const statusCode = parseInt(params.code, 10);

  // 유효한 HTTP 에러 코드인지 확인
  if (isNaN(statusCode) || statusCode < 400 || statusCode > 599) {
    return createErrorResponse(400, `Invalid error code: ${params.code}. Must be between 400 and 599.`);
  }

  const { searchParams } = new URL(request.url);

  // delay 파라미터 처리
  const delay = parseInt(searchParams.get('delay') || '0', 10);
  if (delay > 0) {
    const clampedDelay = Math.min(delay, 30000);
    await new Promise((resolve) => setTimeout(resolve, clampedDelay));
  }

  // 커스텀 메시지
  const customMessage = searchParams.get('message') || undefined;

  return createErrorResponse(statusCode, customMessage);
}

export async function GET(
  request: NextRequest,
  context: { params: { code: string } }
) {
  return handleError(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: { code: string } }
) {
  return handleError(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: { code: string } }
) {
  return handleError(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { code: string } }
) {
  return handleError(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: { code: string } }
) {
  return handleError(request, context);
}
