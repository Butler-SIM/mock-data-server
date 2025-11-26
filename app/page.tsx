export default function Home() {
  const endpoints = [
    {
      path: '/api/users',
      description: '사용자 목록 - 사용자 정보, 역할, 프로필 이미지 포함',
      method: 'GET'
    },
    {
      path: '/api/users',
      description: '사용자 생성 - 이름, 이메일, 역할 등으로 새 사용자 생성',
      method: 'POST'
    },
    {
      path: '/api/posts',
      description: '게시물 목록 - 제목, 내용, 작성자, 카테고리, 태그, 좋아요 수 등',
      method: 'GET'
    },
    {
      path: '/api/posts',
      description: '게시글 생성 - 제목, 내용, 작성자, 카테고리 등으로 새 게시글 생성',
      method: 'POST'
    },
    {
      path: '/api/products',
      description: '상품 목록 - 가격, 재고, 평점, 리뷰 수, 이미지 등',
      method: 'GET'
    },
    {
      path: '/api/products',
      description: '상품 생성 - 이름, 가격, 설명, 재고 등으로 새 상품 생성',
      method: 'POST'
    },
    {
      path: '/api/comments',
      description: '댓글 목록 - 게시물별 댓글, 작성자 정보 포함',
      method: 'GET'
    },
    {
      path: '/api/comments',
      description: '댓글 생성 - 게시물 ID, 사용자 정보, 댓글 내용으로 새 댓글 생성',
      method: 'POST'
    },
    {
      path: '/api/orders',
      description: '주문 목록 - 주문 상태, 상품 정보, 배송 추적, 결제 정보 등',
      method: 'GET'
    },
    {
      path: '/api/orders',
      description: '주문 생성 - 상품 목록, 배송지, 결제 정보로 새 주문 생성',
      method: 'POST'
    },
    {
      path: '/api/xml',
      description: 'XML 요청 처리 - XML 형식의 요청을 받아 XML로 응답 (application/xml, text/xml 지원)',
      method: 'POST'
    },
    {
      path: '/api/todos',
      description: '할일 목록 - 완료 상태, 우선순위, 담당자, 마감일 등',
      method: 'GET'
    },
    {
      path: '/api/categories',
      description: '카테고리 목록 - 계층 구조, 아이콘, 색상, 게시물 수 등',
      method: 'GET'
    },
    {
      path: '/api/notifications',
      description: '알림 목록 - 읽음 상태, 알림 타입, 우선순위 등',
      method: 'GET'
    },
    {
      path: '/api/analytics',
      description: '분석 데이터 - 사용자 성장, 트래픽 소스, 인기 게시물, 매출 등',
      method: 'GET'
    },
    {
      path: '/api/settings',
      description: '설정 정보 - 일반, 기능, 보안, 알림, 테마, API 설정 등',
      method: 'GET'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mock Data Server
          </h1>
          <p className="text-xl text-gray-600">
            Next.js 테스트용 Mock API 서버 (JSON & XML 지원)
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            사용 가능한 API 엔드포인트
          </h2>

          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                      endpoint.method === 'GET' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-blue-600">
                      {endpoint.path}
                    </code>
                  </div>
                  {endpoint.method === 'GET' ? (
                    <a
                      href={endpoint.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      테스트
                    </a>
                  ) : (
                    <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md text-sm cursor-not-allowed">
                      POST 요청 필요
                    </span>
                  )}
                </div>
                <p className="text-gray-600 ml-16">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            빠른 시작
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                1. 개발 서버 실행
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>npm run dev</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                2. GET 요청 예시
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`fetch('http://localhost:3000/api/users')
  .then(response => response.json())
  .then(data => console.log(data));`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                3. POST 요청 예시 (JSON)
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '홍길동',
    email: 'hong@example.com',
    role: 'user'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                4. POST 요청 예시 (XML)
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`fetch('http://localhost:3000/api/xml', {
  method: 'POST',
  headers: { 'Content-Type': 'application/xml' },
  body: \`<?xml version="1.0" encoding="UTF-8"?>
<request>
  <user>
    <name>홍길동</name>
    <email>hong@example.com</email>
  </user>
</request>\`
})
  .then(response => response.text())
  .then(xml => console.log(xml));`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                5. 응답 형식 (JSON)
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`{
  "success": true,
  "data": [...],
  "total": 5,
  "timestamp": "2024-11-07T10:30:00Z"
}`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                6. 응답 형식 (XML)
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<?xml version="1.0" encoding="UTF-8"?>
<response status="success" timestamp="2024-11-07T10:30:00Z">
  <message>XML 요청이 성공적으로 처리되었습니다.</message>
  <data>
    <id>1234</id>
    <processed>true</processed>
  </data>
</response>`}</code>
              </pre>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p>Made with Next.js 14 + TypeScript</p>
        </footer>
      </div>
    </main>
  );
}
