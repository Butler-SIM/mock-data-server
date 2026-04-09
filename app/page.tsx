'use client';

import { useState } from 'react';

interface Endpoint {
  path: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  category: 'data' | 'error';
  examples: {
    normal: string;
    withError?: string;
    response: string;
    errorResponse?: string;
  };
  notes?: string[];
}

interface ErrorCode {
  code: number;
  message: string;
  description: string;
  extra?: string;
}

const BASE_URL = '';  // relative

const endpoints: Endpoint[] = [
  {
    path: '/api/users',
    description: '사용자 목록 - 사용자 정보, 역할, 프로필 이미지 포함',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/users');
const data = await res.json();
console.log(data);
// { success: true, data: [...], total: 5 }`,
      withError: `// 500 에러 시뮬레이션
const res = await fetch('/api/users?_error=500');
console.log(res.status); // 500

// 3초 딜레이
const res2 = await fetch('/api/users?_delay=3000');

// 30% 확률로 랜덤 에러
const res3 = await fetch('/api/users?_random_error=30');`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "김철수",
      "email": "kim@example.com",
      "role": "admin",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "createdAt": "2024-01-15T10:30:00Z"
    }
    // ... 총 5명
  ],
  "total": 5,
  "timestamp": "..."
}`,
    },
  },
  {
    path: '/api/users',
    description: '사용자 생성 - 이름, 이메일, 역할 등으로 새 사용자 생성',
    method: 'POST',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '홍길동',
    email: 'hong@example.com',
    role: 'user'
  })
});
const data = await res.json();`,
      withError: `// POST 요청에도 에러 시뮬레이션 가능
const res = await fetch('/api/users?_error=422', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '홍길동' })
});
// → 422 유효성 검사 에러 (validationErrors 포함)`,
      response: `{
  "success": true,
  "message": "사용자가 성공적으로 생성되었습니다.",
  "data": {
    "id": 1234,
    "name": "홍길동",
    "email": "hong@example.com",
    "role": "user",
    "createdAt": "..."
  }
}`,
    },
  },
  {
    path: '/api/posts',
    description: '게시물 목록 - 제목, 내용, 작성자, 카테고리, 태그, 좋아요 수',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/posts');
const data = await res.json();`,
      withError: `const res = await fetch('/api/posts?_error=401');
// → 401 Unauthorized (인증 필요)`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Next.js 14 새로운 기능 소개",
      "content": "...",
      "author": "김철수",
      "category": "tech",
      "tags": ["nextjs", "react"],
      "likes": 42,
      "views": 1250
    }
    // ... 총 5개
  ],
  "total": 5
}`,
    },
  },
  {
    path: '/api/posts',
    description: '게시글 생성 - 제목, 내용, 작성자, 카테고리 등으로 새 게시글 생성',
    method: 'POST',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '새 게시글',
    content: '게시글 내용',
    author: '홍길동',
    category: 'tech'
  })
});`,
      withError: `const res = await fetch('/api/posts?_error=413', {
  method: 'POST',
  // ...
});
// → 413 Payload Too Large`,
      response: `{
  "success": true,
  "message": "게시글이 성공적으로 생성되었습니다.",
  "data": { "id": 1234, "title": "새 게시글", ... }
}`,
    },
  },
  {
    path: '/api/products',
    description: '상품 목록 - 가격, 재고, 평점, 리뷰 수, 이미지 등',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/products');
const data = await res.json();`,
      withError: `// 2초 딜레이 후 503 에러
const res = await fetch('/api/products?_delay=2000&_error=503');`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "무선 블루투스 이어폰",
      "price": 129000,
      "originalPrice": 159000,
      "rating": 4.5,
      "stock": 45,
      "inStock": true
    }
    // ... 총 5개
  ],
  "total": 5
}`,
    },
  },
  {
    path: '/api/products',
    description: '상품 생성 - 이름, 가격, 설명, 재고 등으로 새 상품 생성',
    method: 'POST',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '새 상품',
    price: 50000,
    stock: 100
  })
});`,
      response: `{
  "success": true,
  "message": "상품이 성공적으로 생성되었습니다.",
  "data": { "id": 1234, "name": "새 상품", "price": 50000, ... }
}`,
    },
  },
  {
    path: '/api/comments',
    description: '댓글 목록 - 게시물별 댓글, 작성자 정보 포함',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/comments');
const data = await res.json();`,
      withError: `const res = await fetch('/api/comments?_error=403');
// → 403 Forbidden (접근 권한 없음)`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "postId": 1,
      "userName": "이영희",
      "content": "정말 유익한 정보네요!",
      "likes": 5,
      "replies": 2
    }
  ],
  "total": 6
}`,
    },
  },
  {
    path: '/api/comments',
    description: '댓글 생성 - 게시물 ID, 사용자 정보, 댓글 내용으로 새 댓글 생성',
    method: 'POST',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    postId: 1,
    userName: '홍길동',
    content: '좋은 글이네요!'
  })
});`,
      response: `{
  "success": true,
  "message": "댓글이 성공적으로 생성되었습니다.",
  "data": { "id": 1234, "postId": 1, "content": "좋은 글이네요!", ... }
}`,
    },
  },
  {
    path: '/api/orders',
    description: '주문 목록 - 주문 상태, 상품 정보, 배송 추적, 결제 정보',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/orders');
const data = await res.json();`,
      withError: `// 타임아웃 시뮬레이션
const res = await fetch('/api/orders?_timeout=true');
// → 30초 대기 후 504 Gateway Timeout`,
      response: `{
  "success": true,
  "data": [
    {
      "id": "ORD-2024-001",
      "userName": "김철수",
      "status": "delivered",
      "total": 243900,
      "trackingNumber": "TRK123456789"
    }
  ],
  "total": 4,
  "stats": { "delivered": 1, "processing": 1, "shipped": 1, "cancelled": 1 }
}`,
    },
  },
  {
    path: '/api/orders',
    description: '주문 생성 - 상품 목록, 배송지, 결제 정보로 새 주문 생성',
    method: 'POST',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [{ productId: 1, price: 129000, quantity: 1 }],
    shippingAddress: { name: '홍길동', address: '서울시 ...' },
    paymentMethod: 'credit_card'
  })
});`,
      response: `{
  "success": true,
  "message": "주문이 성공적으로 생성되었습니다.",
  "data": { "id": "ORD-2024-XXX", "status": "processing", ... }
}`,
    },
  },
  {
    path: '/api/todos',
    description: '할일 목록 - 완료 상태, 우선순위, 담당자, 마감일',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/todos');
const data = await res.json();`,
      withError: `const res = await fetch('/api/todos?_error=429');
// → 429 Too Many Requests (Rate Limit 정보 포함)`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Next.js 프로젝트 설정",
      "completed": true,
      "priority": "high",
      "dueDate": "2024-10-25",
      "assignedTo": "김철수"
    }
  ],
  "total": 5,
  "completed": 2,
  "pending": 3
}`,
    },
  },
  {
    path: '/api/categories',
    description: '카테고리 목록 - 계층 구조, 아이콘, 색상, 게시물 수',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/categories');
const data = await res.json();`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Technology",
      "slug": "tech",
      "icon": "💻",
      "color": "#3B82F6",
      "postCount": 45,
      "parentId": null
    }
  ],
  "total": 7
}`,
    },
  },
  {
    path: '/api/notifications',
    description: '알림 목록 - 읽음 상태, 알림 타입, 우선순위',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/notifications');
const data = await res.json();`,
      response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "comment",
      "title": "새로운 댓글",
      "message": "이영희님이 댓글을 남겼습니다.",
      "read": false,
      "priority": "normal"
    }
  ],
  "total": 6,
  "unread": 3
}`,
    },
  },
  {
    path: '/api/analytics',
    description: '분석 데이터 - 사용자 성장, 트래픽 소스, 인기 게시물, 매출',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/analytics');
const data = await res.json();`,
      response: `{
  "success": true,
  "data": {
    "overview": { "totalUsers": 15234, "activeUsers": 8567 },
    "topPosts": [...],
    "trafficSources": [...],
    "revenueData": { "thisMonth": 3450000, "currency": "KRW" }
  },
  "period": "last_7_days"
}`,
    },
  },
  {
    path: '/api/settings',
    description: '설정 정보 - 일반, 기능, 보안, 알림, 테마, API 설정',
    method: 'GET',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/settings');
const data = await res.json();`,
      response: `{
  "success": true,
  "data": {
    "general": { "siteName": "My Application", "language": "ko-KR" },
    "features": { "enableComments": true, "enableDarkMode": true },
    "security": { "twoFactorAuth": true, "passwordMinLength": 8 },
    "theme": { "primaryColor": "#3B82F6" }
  }
}`,
    },
  },
  {
    path: '/api/xml',
    description: 'XML 요청 처리 - XML 형식의 요청을 받아 XML로 응답',
    method: 'POST',
    category: 'data',
    examples: {
      normal: `const res = await fetch('/api/xml', {
  method: 'POST',
  headers: { 'Content-Type': 'application/xml' },
  body: \`<?xml version="1.0" encoding="UTF-8"?>
<request>
  <user>
    <name>홍길동</name>
    <email>hong@example.com</email>
  </user>
</request>\`
});
const xml = await res.text();`,
      response: `<?xml version="1.0" encoding="UTF-8"?>
<response status="success" timestamp="...">
  <message>XML 요청이 성공적으로 처리되었습니다.</message>
  <data>
    <id>1234</id>
    <processed>true</processed>
  </data>
</response>`,
    },
    notes: ['Content-Type: application/xml 또는 text/xml 지원'],
  },
];

const errorCodes: ErrorCode[] = [
  { code: 400, message: 'Bad Request', description: '잘못된 요청' },
  { code: 401, message: 'Unauthorized', description: '인증 필요', extra: 'authType, realm 정보 포함' },
  { code: 403, message: 'Forbidden', description: '접근 권한 없음' },
  { code: 404, message: 'Not Found', description: '리소스 없음' },
  { code: 405, message: 'Method Not Allowed', description: '허용되지 않은 메서드' },
  { code: 408, message: 'Request Timeout', description: '요청 시간 초과' },
  { code: 409, message: 'Conflict', description: '리소스 충돌 (중복 데이터)' },
  { code: 413, message: 'Payload Too Large', description: '요청 본문 크기 초과' },
  { code: 422, message: 'Unprocessable Entity', description: '유효성 검사 실패', extra: 'validationErrors 배열 포함' },
  { code: 429, message: 'Too Many Requests', description: 'Rate Limit 초과', extra: 'Retry-After 헤더 + rateLimit 정보' },
  { code: 500, message: 'Internal Server Error', description: '서버 내부 오류' },
  { code: 502, message: 'Bad Gateway', description: '업스트림 서버 오류' },
  { code: 503, message: 'Service Unavailable', description: '서비스 일시 중단' },
  { code: 504, message: 'Gateway Timeout', description: '게이트웨이 타임아웃' },
];

const methodColors: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  POST: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  PUT: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  DELETE: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  PATCH: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

function MethodBadge({ method }: { method: string }) {
  const colors = methodColors[method] || methodColors.GET;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
      {method}
    </span>
  );
}

function CodeBlock({ code, lang = 'javascript' }: { code: string; lang?: string }) {
  return (
    <pre className="bg-[#1e1e2e] text-[#cdd6f4] p-4 rounded-lg overflow-x-auto text-[13px] leading-relaxed font-mono border border-[#313244]">
      <code>{code}</code>
    </pre>
  );
}

function EndpointCard({ endpoint, index }: { endpoint: Endpoint; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'normal' | 'error' | 'response'>('normal');

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'border-blue-300 shadow-lg shadow-blue-100/50 bg-white'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <MethodBadge method={endpoint.method} />
          <code className="text-sm md:text-base font-mono text-gray-800 font-semibold truncate">
            {endpoint.path}
          </code>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-gray-400 text-sm hidden md:block max-w-[300px] truncate">
            {endpoint.description}
          </span>
          {endpoint.method === 'GET' && (
            <a
              href={endpoint.path}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors shadow-sm"
            >
              열기
            </a>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 모바일 description */}
      <p className="text-gray-500 text-sm px-5 pb-2 md:hidden -mt-2">
        {endpoint.description}
      </p>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 animate-fadeIn">
          {/* 탭 */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('normal')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'normal'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ✅ 정상 요청
            </button>
            {endpoint.examples.withError && (
              <button
                onClick={() => setActiveTab('error')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'error'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🚨 에러 주입
              </button>
            )}
            <button
              onClick={() => setActiveTab('response')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'response'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📦 응답 예시
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          {activeTab === 'normal' && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">요청 예시</p>
              <CodeBlock code={endpoint.examples.normal} />
            </div>
          )}
          {activeTab === 'error' && endpoint.examples.withError && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">에러 시뮬레이션 예시</p>
              <CodeBlock code={endpoint.examples.withError} />
              <div className="mt-3 flex flex-wrap gap-2">
                {[500, 401, 404, 429].map((code) => (
                  <a
                    key={code}
                    href={`${endpoint.path}?_error=${code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    테스트 {code}
                  </a>
                ))}
                <a
                  href={`${endpoint.path}?_delay=3000`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors"
                >
                  🕐 3초 딜레이
                </a>
              </div>
            </div>
          )}
          {activeTab === 'response' && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">정상 응답</p>
              <CodeBlock code={endpoint.examples.response} lang="json" />
            </div>
          )}

          {endpoint.notes && (
            <div className="mt-3 flex flex-wrap gap-2">
              {endpoint.notes.map((note, i) => (
                <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  💡 {note}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ErrorCodeCard({ error }: { error: ErrorCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isServer = error.code >= 500;

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? `${isServer ? 'border-red-300 shadow-red-100/50' : 'border-yellow-300 shadow-yellow-100/50'} shadow-lg bg-white`
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`inline-flex items-center justify-center w-12 h-7 rounded-md text-xs font-bold ${
            isServer ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
          }`}>
            {error.code}
          </span>
          <div className="min-w-0">
            <span className="text-sm font-medium text-gray-800 block truncate">{error.message}</span>
            <span className="text-xs text-gray-400 block truncate">{error.description}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`/api/errors/${error.code}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-sm transition-colors ${
              isServer ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            테스트
          </a>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 animate-fadeIn">
          {error.extra && (
            <div className={`text-xs px-2.5 py-1.5 rounded-md mb-3 ${
              isServer ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
            }`}>
              ⚡ {error.extra}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">사용 예시</p>
            <CodeBlock code={`// 전용 에러 엔드포인트
fetch('/api/errors/${error.code}')
  .then(res => res.json())
  .then(data => console.log(data));

// 기존 API에 에러 주입
fetch('/api/users?_error=${error.code}')
  .then(res => {
    console.log(res.status); // ${error.code}
    return res.json();
  });${error.code === 429 ? `

// 응답 헤더에 Rate Limit 정보 포함
// Retry-After: 60
// X-RateLimit-Limit: 100
// X-RateLimit-Remaining: 0` : ''}${error.code === 422 ? `

// 응답에 validationErrors 배열 포함
// { field: "email", message: "유효한 이메일 형식이 아닙니다.", code: "INVALID_FORMAT" }` : ''}`} />
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-500 font-medium mb-2">응답 형식</p>
            <CodeBlock code={`{
  "success": false,
  "error": {
    "code": ${error.code},
    "message": "${error.message}",
    "description": "${error.description}",
    "timestamp": "..."${error.code === 422 ? `,
    "validationErrors": [
      { "field": "email", "message": "유효한 이메일 형식이 아닙니다.", "code": "INVALID_FORMAT" },
      { "field": "name", "message": "이름은 2자 이상이어야 합니다.", "code": "MIN_LENGTH" }
    ]` : ''}${error.code === 429 ? `,
    "retryAfter": 60,
    "rateLimit": { "limit": 100, "remaining": 0, "resetAt": "..." }` : ''}${error.code === 401 ? `,
    "authType": "Bearer",
    "realm": "api"` : ''}
  }
}`} lang="json" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/80 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Vercel에 배포하여 사용하는 Mock API 서버
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Mock Data Server
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            JSON · XML · 에러 시뮬레이션을 지원하는 테스트용 API 서버
            <br />
            <span className="text-sm text-gray-400">엔드포인트를 클릭하면 사용법과 예시가 펼쳐집니다</span>
          </p>

          {/* 빠른 테스트 파라미터 가이드 */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { param: '?_error=500', label: '에러 주입', color: 'red' },
              { param: '?_delay=3000', label: '딜레이', color: 'orange' },
              { param: '?_random_error=30', label: '랜덤 에러', color: 'purple' },
              { param: '?_timeout=true', label: '타임아웃', color: 'gray' },
            ].map(({ param, label, color }) => (
              <div key={param} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-${color}-50 border border-${color}-200 text-xs`}>
                <code className={`font-mono font-semibold text-${color}-700`}>{param}</code>
                <span className={`text-${color}-500`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* API 엔드포인트 섹션 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
              <span className="text-sm">📡</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">API 엔드포인트</h2>
              <p className="text-sm text-gray-400">클릭하여 사용법 · 에러 주입 · 응답 예시 확인</p>
            </div>
          </div>
          <div className="space-y-3">
            {endpoints.map((ep, i) => (
              <EndpointCard key={`${ep.path}-${ep.method}-${i}`} endpoint={ep} index={i} />
            ))}
          </div>
        </section>

        {/* 에러 시뮬레이션 섹션 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100">
              <span className="text-sm">🚨</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">에러 시뮬레이션</h2>
              <p className="text-sm text-gray-400">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">/api/errors/{'{'} code {'}'}</code> 또는 기존 API에 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">?_error=코드</code> 추가
              </p>
            </div>
          </div>

          {/* Client / Server 분류 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-yellow-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              4xx Client Errors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {errorCodes.filter(e => e.code < 500).map(error => (
                <ErrorCodeCard key={error.code} error={error} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              5xx Server Errors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {errorCodes.filter(e => e.code >= 500).map(error => (
                <ErrorCodeCard key={error.code} error={error} />
              ))}
            </div>
          </div>
        </section>

        {/* 쿼리 파라미터 가이드 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100">
              <span className="text-sm">⚡</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">쿼리 파라미터 가이드</h2>
              <p className="text-sm text-gray-400">모든 기존 API에 추가하여 동작을 조작할 수 있습니다</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                param: '_error',
                type: 'number',
                desc: 'HTTP 에러 코드를 지정하여 에러 응답을 반환합니다.',
                example: '/api/users?_error=500',
                color: 'red',
              },
              {
                param: '_delay',
                type: 'number (ms)',
                desc: '응답을 지정된 밀리초만큼 지연시킵니다. 최대 30초.',
                example: '/api/users?_delay=3000',
                color: 'orange',
              },
              {
                param: '_random_error',
                type: 'number (0-100)',
                desc: '지정된 확률(%)로 랜덤 에러를 발생시킵니다.',
                example: '/api/users?_random_error=30',
                color: 'purple',
              },
              {
                param: '_timeout',
                type: 'boolean',
                desc: '30초 대기 후 504 Gateway Timeout을 반환합니다.',
                example: '/api/users?_timeout=true',
                color: 'gray',
              },
            ].map(({ param, type, desc, example, color }) => (
              <div key={param} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <code className={`px-2 py-1 rounded-md text-sm font-mono font-bold bg-${color}-50 text-${color}-700 border border-${color}-200`}>
                    {param}
                  </code>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{desc}</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-mono flex-1 truncate">{example}</code>
                  <a
                    href={example}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-sm bg-${color}-500 hover:bg-${color}-600 transition-colors shrink-0`}
                  >
                    실행
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 조합 예시 */}
          <div className="mt-4 bg-white rounded-xl border border-purple-200 p-5">
            <h4 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
              🔗 파라미터 조합 사용
            </h4>
            <div className="space-y-2">
              {[
                { url: '/api/users?_delay=2000&_error=503', desc: '2초 딜레이 후 503 에러' },
                { url: '/api/products?_delay=1000&_random_error=50', desc: '1초 딜레이 + 50% 확률 에러' },
                { url: '/api/orders?_error=422', desc: '유효성 검사 에러 (필드별 에러 정보 포함)' },
              ].map(({ url, desc }) => (
                <div key={url} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors">
                  <code className="text-xs font-mono text-purple-700 flex-1 truncate">{url}</code>
                  <span className="text-xs text-gray-500 hidden md:block">{desc}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors shrink-0"
                  >
                    실행
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 에러 응답 형식 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100">
              <span className="text-sm">📋</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">응답 형식</h2>
              <p className="text-sm text-gray-400">모든 API는 일관된 JSON 구조를 따릅니다</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-green-200 p-5">
              <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Success 응답
              </h4>
              <CodeBlock code={`{
  "success": true,
  "data": [...],
  "total": 5,
  "timestamp": "2024-11-07T10:30:00Z"
}`} lang="json" />
            </div>
            <div className="bg-white rounded-xl border border-red-200 p-5">
              <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Error 응답
              </h4>
              <CodeBlock code={`{
  "success": false,
  "error": {
    "code": 500,
    "message": "Internal Server Error",
    "description": "서버 내부 오류가 발생했습니다.",
    "timestamp": "2024-11-07T10:30:00Z"
  }
}`} lang="json" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Made with Next.js 14 + TypeScript · Deployed on Vercel
          </p>
        </footer>
      </div>
    </main>
  );
}
