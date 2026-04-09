import { NextRequest, NextResponse } from 'next/server';

/**
 * HTTP 에러 코드별 기본 메시지
 */
export const ERROR_MESSAGES: Record<number, { message: string; description: string }> = {
  400: {
    message: 'Bad Request',
    description: '요청이 잘못되었습니다. 요청 파라미터를 확인해주세요.',
  },
  401: {
    message: 'Unauthorized',
    description: '인증이 필요합니다. 유효한 인증 토큰을 제공해주세요.',
  },
  403: {
    message: 'Forbidden',
    description: '접근 권한이 없습니다. 관리자에게 문의해주세요.',
  },
  404: {
    message: 'Not Found',
    description: '요청하신 리소스를 찾을 수 없습니다.',
  },
  405: {
    message: 'Method Not Allowed',
    description: '허용되지 않은 HTTP 메서드입니다.',
  },
  408: {
    message: 'Request Timeout',
    description: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  },
  409: {
    message: 'Conflict',
    description: '리소스 충돌이 발생했습니다. 이미 존재하는 데이터입니다.',
  },
  413: {
    message: 'Payload Too Large',
    description: '요청 본문이 너무 큽니다. 크기를 줄여주세요.',
  },
  422: {
    message: 'Unprocessable Entity',
    description: '요청 데이터의 유효성 검사에 실패했습니다.',
  },
  429: {
    message: 'Too Many Requests',
    description: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  },
  500: {
    message: 'Internal Server Error',
    description: '서버 내부 오류가 발생했습니다.',
  },
  502: {
    message: 'Bad Gateway',
    description: '업스트림 서버에서 잘못된 응답을 받았습니다.',
  },
  503: {
    message: 'Service Unavailable',
    description: '서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.',
  },
  504: {
    message: 'Gateway Timeout',
    description: '업스트림 서버 응답 시간이 초과되었습니다.',
  },
};

/**
 * 422 에러에 포함될 상세 유효성 검사 에러
 */
const VALIDATION_ERRORS = [
  { field: 'email', message: '유효한 이메일 형식이 아닙니다.', code: 'INVALID_FORMAT' },
  { field: 'name', message: '이름은 2자 이상이어야 합니다.', code: 'MIN_LENGTH' },
  { field: 'password', message: '비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.', code: 'WEAK_PASSWORD' },
  { field: 'phone', message: '유효한 전화번호 형식이 아닙니다.', code: 'INVALID_FORMAT' },
  { field: 'age', message: '나이는 0보다 큰 정수여야 합니다.', code: 'INVALID_VALUE' },
];

/**
 * 에러 응답 생성
 */
export function createErrorResponse(statusCode: number, customMessage?: string) {
  const errorInfo = ERROR_MESSAGES[statusCode] || {
    message: 'Unknown Error',
    description: `HTTP ${statusCode} 에러가 발생했습니다.`,
  };

  const body: Record<string, any> = {
    success: false,
    error: {
      code: statusCode,
      message: customMessage || errorInfo.message,
      description: errorInfo.description,
      timestamp: new Date().toISOString(),
    },
  };

  // 422 에러 시 유효성 검사 상세 정보 추가
  if (statusCode === 422) {
    body.error.validationErrors = VALIDATION_ERRORS;
  }

  // 429 에러 시 Rate Limit 정보 추가
  if (statusCode === 429) {
    body.error.retryAfter = 60;
    body.error.rateLimit = {
      limit: 100,
      remaining: 0,
      resetAt: new Date(Date.now() + 60000).toISOString(),
    };
  }

  // 401 에러 시 인증 관련 정보 추가
  if (statusCode === 401) {
    body.error.authType = 'Bearer';
    body.error.realm = 'api';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 429 에러 시 Retry-After 헤더 추가
  if (statusCode === 429) {
    headers['Retry-After'] = '60';
    headers['X-RateLimit-Limit'] = '100';
    headers['X-RateLimit-Remaining'] = '0';
    headers['X-RateLimit-Reset'] = new Date(Date.now() + 60000).toISOString();
  }

  return NextResponse.json(body, { status: statusCode, headers });
}

/**
 * 기존 API 핸들러를 래핑하여 에러 시뮬레이션 기능을 추가하는 유틸리티
 * 
 * Query Parameters:
 * - _error: HTTP 에러 코드 (예: ?_error=500)
 * - _delay: 응답 지연 시간 ms (예: ?_delay=3000)
 * - _timeout: 응답 없이 타임아웃 시뮬레이션 (예: ?_timeout=true)
 * - _random_error: 랜덤 확률로 에러 발생 (0~100, 예: ?_random_error=30)
 * 
 * @example
 * // route.ts에서 사용
 * import { withErrorSimulation } from '../_lib/errorSimulator';
 * 
 * async function handler(request: NextRequest) {
 *   // 원래 로직
 *   return NextResponse.json({ success: true, data: [...] });
 * }
 * 
 * export const GET = withErrorSimulation(handler);
 */
export function withErrorSimulation(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url);

    // _delay: 응답 지연
    const delay = parseInt(searchParams.get('_delay') || '0', 10);
    if (delay > 0) {
      const clampedDelay = Math.min(delay, 30000); // 최대 30초
      await new Promise((resolve) => setTimeout(resolve, clampedDelay));
    }

    // _timeout: 타임아웃 시뮬레이션 (30초 대기 후 504)
    if (searchParams.get('_timeout') === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 30000));
      return createErrorResponse(504, 'Request timed out (simulated)');
    }

    // _error: 지정된 에러 코드 반환
    const errorCode = parseInt(searchParams.get('_error') || '0', 10);
    if (errorCode >= 400 && errorCode < 600) {
      return createErrorResponse(errorCode);
    }

    // _random_error: 랜덤 확률로 에러 발생
    const randomErrorChance = parseInt(searchParams.get('_random_error') || '0', 10);
    if (randomErrorChance > 0 && Math.random() * 100 < randomErrorChance) {
      const randomCodes = [400, 401, 403, 404, 500, 502, 503];
      const randomCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
      return createErrorResponse(randomCode, `Random error triggered (${randomErrorChance}% chance)`);
    }

    // 에러 조건이 없으면 원래 핸들러 실행
    return handler(request);
  };
}
