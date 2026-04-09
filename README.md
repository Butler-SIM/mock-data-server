# Mock Data Server

Next.js 기반의 테스트용 Mock Data API 서버입니다. 프론트엔드 개발 시 백엔드 API가 준비되지 않았을 때 사용할 수 있는 10가지 실용적인 JSON API 엔드포인트를 제공합니다.

## 주요 기능

- ✅ Next.js 14 App Router 사용
- ✅ TypeScript로 작성된 타입 안정성
- ✅ 10개의 실용적인 API 엔드포인트
- ✅ 실제 개발에 바로 사용 가능한 데이터 구조
- ✅ CORS 지원 (기본 설정)
- ✅ 깔끔한 UI로 엔드포인트 확인 가능

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 http://localhost:3000 에서 확인할 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## API 엔드포인트

모든 API는 `/api` 경로 아래에 위치하며, GET 메서드를 지원합니다.

### 1. 사용자 목록 (Users)

```
GET /api/users
```

**응답 예시:**
```json
{
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
  ],
  "total": 5,
  "timestamp": "2024-11-07T10:30:00Z"
}
```

**포함 데이터:** 사용자 ID, 이름, 이메일, 역할, 프로필 이미지, 생성일

### 2. 게시물 목록 (Posts)

```
GET /api/posts
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Next.js 14 새로운 기능 소개",
      "content": "Next.js 14에서 추가된 새로운 기능들을 알아봅니다.",
      "author": "김철수",
      "authorId": 1,
      "category": "tech",
      "tags": ["nextjs", "react", "web"],
      "likes": 42,
      "views": 1250,
      "published": true,
      "createdAt": "2024-10-01T08:00:00Z",
      "updatedAt": "2024-10-02T10:30:00Z"
    }
  ],
  "total": 5
}
```

**포함 데이터:** 게시물 ID, 제목, 내용, 작성자, 카테고리, 태그, 좋아요 수, 조회수, 발행 상태

### 3. 상품 목록 (Products)

```
GET /api/products
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "무선 블루투스 이어폰",
      "description": "고음질 ANC 기능이 탑재된 프리미엄 이어폰",
      "price": 129000,
      "originalPrice": 159000,
      "currency": "KRW",
      "category": "electronics",
      "brand": "TechSound",
      "rating": 4.5,
      "reviewCount": 234,
      "stock": 45,
      "inStock": true,
      "images": ["https://picsum.photos/400/400?random=1"],
      "tags": ["wireless", "audio", "bluetooth"]
    }
  ],
  "total": 5
}
```

**포함 데이터:** 상품 정보, 가격, 할인가, 재고, 평점, 리뷰 수, 이미지

### 4. 댓글 목록 (Comments)

```
GET /api/comments
```

**포함 데이터:** 댓글 ID, 게시물 ID, 사용자 정보, 댓글 내용, 좋아요 수, 답글 수

### 5. 할일 목록 (Todos)

```
GET /api/todos
```

**포함 데이터:** 할일 정보, 완료 상태, 우선순위, 마감일, 담당자, 태그

### 6. 카테고리 목록 (Categories)

```
GET /api/categories
```

**포함 데이터:** 카테고리 ID, 이름, 슬러그, 아이콘, 색상, 계층 구조, 게시물 수

### 7. 알림 목록 (Notifications)

```
GET /api/notifications
```

**포함 데이터:** 알림 타입, 제목, 메시지, 읽음 상태, 우선순위, 관련 링크

### 8. 분석 데이터 (Analytics)

```
GET /api/analytics
```

**포함 데이터:** 사용자 통계, 성장 데이터, 인기 게시물, 트래픽 소스, 디바이스 통계, 매출 정보

### 9. 설정 정보 (Settings)

```
GET /api/settings
```

**포함 데이터:** 일반 설정, 기능 토글, 보안 설정, 알림 설정, 테마 설정, API 설정, 스토리지 설정

### 10. 주문 목록 (Orders)

```
GET /api/orders
```

**포함 데이터:** 주문 ID, 주문 상태, 주문 상품, 가격 정보, 배송 주소, 결제 정보, 추적 번호

## 에러 시뮬레이션 API

### 전용 에러 엔드포인트

원하는 HTTP 에러 코드를 직접 반환하는 엔드포인트입니다.

```
GET /api/errors/{code}
POST /api/errors/{code}
PUT /api/errors/{code}
DELETE /api/errors/{code}
PATCH /api/errors/{code}
```

**지원 에러 코드:**

| 코드 | 메시지 | 설명 | 특이사항 |
|------|--------|------|----------|
| 400 | Bad Request | 잘못된 요청 | - |
| 401 | Unauthorized | 인증 필요 | `authType`, `realm` 포함 |
| 403 | Forbidden | 접근 권한 없음 | - |
| 404 | Not Found | 리소스 없음 | - |
| 405 | Method Not Allowed | 허용되지 않은 메서드 | - |
| 408 | Request Timeout | 요청 시간 초과 | - |
| 409 | Conflict | 리소스 충돌 | - |
| 413 | Payload Too Large | 요청 본문 초과 | - |
| 422 | Unprocessable Entity | 유효성 검사 실패 | `validationErrors` 배열 포함 |
| 429 | Too Many Requests | Rate Limit 초과 | `Retry-After` 헤더, `rateLimit` 정보 포함 |
| 500 | Internal Server Error | 서버 내부 오류 | - |
| 502 | Bad Gateway | 업스트림 서버 오류 | - |
| 503 | Service Unavailable | 서비스 일시 중단 | - |
| 504 | Gateway Timeout | 게이트웨이 타임아웃 | - |

**Query Parameters:**
- `delay`: 응답 지연 시간 ms (예: `?delay=3000`)
- `message`: 커스텀 에러 메시지 (예: `?message=Custom+Error`)

**예시:**
```bash
# 500 에러
GET /api/errors/500

# 3초 딜레이 후 503 에러
GET /api/errors/503?delay=3000

# 커스텀 메시지
GET /api/errors/400?message=잘못된+파라미터
```

### 기존 API 에러 시뮬레이션 (쿼리 파라미터)

모든 기존 API 엔드포인트에 아래 쿼리 파라미터를 추가하여 에러를 시뮬레이션할 수 있습니다.

| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `_error` | 지정된 HTTP 에러 코드 반환 | `?_error=500` |
| `_delay` | 응답 지연 시간 (밀리초) | `?_delay=3000` |
| `_timeout` | 타임아웃 시뮬레이션 (30초 대기 후 504) | `?_timeout=true` |
| `_random_error` | 랜덤 확률로 에러 발생 (0-100) | `?_random_error=30` |

**예시:**
```bash
# 기존 API에서 500 에러 시뮬레이션
GET /api/users?_error=500

# 3초 딜레이 후 정상 응답
GET /api/users?_delay=3000

# 2초 딜레이 후 503 에러
GET /api/users?_delay=2000&_error=503

# 30% 확률로 랜덤 에러
GET /api/orders?_random_error=30

# 타임아웃 시뮬레이션
GET /api/products?_timeout=true
```

**에러 응답 형식:**
```json
{
  "success": false,
  "error": {
    "code": 500,
    "message": "Internal Server Error",
    "description": "서버 내부 오류가 발생했습니다.",
    "timestamp": "2024-11-07T10:30:00Z"
  }
}
```

## 사용 예시

### JavaScript / TypeScript

```javascript
// 사용자 목록 가져오기
fetch('http://localhost:3000/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// async/await 사용
async function getUsers() {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  console.log(data);
}
```

### React

```jsx
import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data.data));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Axios

```javascript
import axios from 'axios';

const getProducts = async () => {
  const { data } = await axios.get('http://localhost:3000/api/products');
  console.log(data);
};
```

## 응답 구조

모든 API 엔드포인트는 일관된 응답 구조를 따릅니다:

```json
{
  "success": true,
  "data": [...],
  "total": 10,
  "timestamp": "2024-11-07T10:30:00Z"
}
```

- `success`: 요청 성공 여부
- `data`: 실제 데이터 배열 또는 객체
- `total`: 총 데이터 개수 (해당되는 경우)
- `timestamp`: 응답 생성 시간

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## 프로젝트 구조

```
mock-data-server/
├── app/
│   ├── api/
│   │   ├── users/route.ts
│   │   ├── posts/route.ts
│   │   ├── products/route.ts
│   │   ├── comments/route.ts
│   │   ├── todos/route.ts
│   │   ├── categories/route.ts
│   │   ├── notifications/route.ts
│   │   ├── analytics/route.ts
│   │   ├── settings/route.ts
│   │   └── orders/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 커스터마이징

각 API 엔드포인트는 `app/api/[endpoint]/route.ts` 파일에 정의되어 있습니다. 필요에 따라 데이터를 수정하거나 새로운 엔드포인트를 추가할 수 있습니다.

### 새 엔드포인트 추가하기

1. `app/api/` 디렉토리에 새 폴더 생성
2. `route.ts` 파일 생성
3. GET 핸들러 구현:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    // 여기에 mock 데이터 추가
  };

  return NextResponse.json({
    success: true,
    data: data,
    timestamp: new Date().toISOString()
  });
}
```

## CORS 설정

기본적으로 Next.js API Routes는 같은 도메인에서만 접근 가능합니다. 다른 도메인에서 접근하려면 CORS 헤더를 추가해야 합니다:

```typescript
export async function GET() {
  const data = { /* ... */ };

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

## 라이선스

MIT

## 기여하기

이슈와 PR은 언제나 환영합니다!

## 개발자

테스트와 개발을 위한 Mock Data Server
