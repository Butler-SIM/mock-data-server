import { NextResponse } from 'next/server';

export async function GET() {
  const orders = [
    {
      id: 'ORD-2024-001',
      userId: 1,
      userName: '김철수',
      status: 'delivered',
      items: [
        {
          productId: 1,
          productName: '무선 블루투스 이어폰',
          quantity: 1,
          price: 129000,
          thumbnail: 'https://picsum.photos/100/100?random=1'
        },
        {
          productId: 4,
          productName: '에르고노믹 마우스',
          quantity: 2,
          price: 45000,
          thumbnail: 'https://picsum.photos/100/100?random=5'
        }
      ],
      subtotal: 219000,
      shipping: 3000,
      tax: 21900,
      total: 243900,
      currency: 'KRW',
      shippingAddress: {
        name: '김철수',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123',
        zipCode: '06234'
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      trackingNumber: 'TRK123456789',
      createdAt: '2024-10-25T10:30:00Z',
      deliveredAt: '2024-10-28T14:20:00Z'
    },
    {
      id: 'ORD-2024-002',
      userId: 2,
      userName: '이영희',
      status: 'processing',
      items: [
        {
          productId: 2,
          productName: '기계식 키보드',
          quantity: 1,
          price: 89000,
          thumbnail: 'https://picsum.photos/100/100?random=3'
        }
      ],
      subtotal: 89000,
      shipping: 0,
      tax: 8900,
      total: 97900,
      currency: 'KRW',
      shippingAddress: {
        name: '이영희',
        phone: '010-2345-6789',
        address: '서울시 서초구 서초대로 456',
        zipCode: '06789'
      },
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      trackingNumber: null,
      createdAt: '2024-11-05T15:20:00Z',
      deliveredAt: null
    },
    {
      id: 'ORD-2024-003',
      userId: 3,
      userName: 'John Doe',
      status: 'shipped',
      items: [
        {
          productId: 5,
          productName: 'USB-C 멀티 허브',
          quantity: 3,
          price: 35000,
          thumbnail: 'https://picsum.photos/100/100?random=6'
        }
      ],
      subtotal: 105000,
      shipping: 2500,
      tax: 10500,
      total: 118000,
      currency: 'KRW',
      shippingAddress: {
        name: 'John Doe',
        phone: '010-3456-7890',
        address: '경기도 성남시 분당구 판교로 789',
        zipCode: '13487'
      },
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      trackingNumber: 'TRK987654321',
      createdAt: '2024-11-03T09:45:00Z',
      deliveredAt: null
    },
    {
      id: 'ORD-2024-004',
      userId: 4,
      userName: 'Jane Smith',
      status: 'cancelled',
      items: [
        {
          productId: 3,
          productName: '4K 웹캠',
          quantity: 1,
          price: 145000,
          thumbnail: 'https://picsum.photos/100/100?random=4'
        }
      ],
      subtotal: 145000,
      shipping: 3000,
      tax: 14500,
      total: 162500,
      currency: 'KRW',
      shippingAddress: {
        name: 'Jane Smith',
        phone: '010-4567-8901',
        address: '인천시 연수구 컨벤시아대로 101',
        zipCode: '22001'
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'refunded',
      trackingNumber: null,
      createdAt: '2024-10-30T11:10:00Z',
      deliveredAt: null
    }
  ];

  return NextResponse.json({
    success: true,
    data: orders,
    total: orders.length,
    stats: {
      delivered: orders.filter(o => o.status === 'delivered').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    },
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock 응답 - 실제로는 요청 데이터를 사용하여 새 주문 생성
    const orderId = `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    const items = body.items || [];
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const shipping = body.shipping || (subtotal > 100000 ? 0 : 3000);
    const tax = Math.floor(subtotal * 0.1);
    const total = subtotal + shipping + tax;

    const newOrder = {
      id: orderId,
      userId: body.userId || 1,
      userName: body.userName || '고객',
      status: 'processing',
      items: items,
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      currency: body.currency || 'KRW',
      shippingAddress: body.shippingAddress || {
        name: '고객',
        phone: '010-0000-0000',
        address: '주소를 입력해주세요',
        zipCode: '00000'
      },
      paymentMethod: body.paymentMethod || 'credit_card',
      paymentStatus: 'pending',
      trackingNumber: null,
      createdAt: new Date().toISOString(),
      deliveredAt: null
    };

    return NextResponse.json({
      success: true,
      message: '주문이 성공적으로 생성되었습니다.',
      data: newOrder,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '요청 처리 중 오류가 발생했습니다.',
      error: 'Invalid JSON'
    }, { status: 400 });
  }
}
