import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 1,
      name: '무선 블루투스 이어폰',
      description: '고음질 ANC 기능이 탑재된 프리미엄 이어폰',
      price: 129000,
      originalPrice: 159000,
      currency: 'KRW',
      category: 'electronics',
      brand: 'TechSound',
      rating: 4.5,
      reviewCount: 234,
      stock: 45,
      inStock: true,
      images: [
        'https://picsum.photos/400/400?random=1',
        'https://picsum.photos/400/400?random=2'
      ],
      tags: ['wireless', 'audio', 'bluetooth']
    },
    {
      id: 2,
      name: '기계식 키보드',
      description: 'RGB 백라이트가 있는 게이밍 키보드',
      price: 89000,
      originalPrice: 89000,
      currency: 'KRW',
      category: 'peripherals',
      brand: 'KeyMaster',
      rating: 4.8,
      reviewCount: 512,
      stock: 23,
      inStock: true,
      images: [
        'https://picsum.photos/400/400?random=3'
      ],
      tags: ['keyboard', 'gaming', 'rgb']
    },
    {
      id: 3,
      name: '4K 웹캠',
      description: '화상 회의와 스트리밍을 위한 고화질 웹캠',
      price: 145000,
      originalPrice: 180000,
      currency: 'KRW',
      category: 'electronics',
      brand: 'VisionPro',
      rating: 4.3,
      reviewCount: 89,
      stock: 0,
      inStock: false,
      images: [
        'https://picsum.photos/400/400?random=4'
      ],
      tags: ['webcam', '4k', 'streaming']
    },
    {
      id: 4,
      name: '에르고노믹 마우스',
      description: '손목 부담을 줄여주는 수직 마우스',
      price: 45000,
      originalPrice: 55000,
      currency: 'KRW',
      category: 'peripherals',
      brand: 'ErgoTech',
      rating: 4.6,
      reviewCount: 167,
      stock: 78,
      inStock: true,
      images: [
        'https://picsum.photos/400/400?random=5'
      ],
      tags: ['mouse', 'ergonomic', 'vertical']
    },
    {
      id: 5,
      name: 'USB-C 멀티 허브',
      description: '7-in-1 다기능 USB-C 허브',
      price: 35000,
      originalPrice: 35000,
      currency: 'KRW',
      category: 'accessories',
      brand: 'ConnectAll',
      rating: 4.4,
      reviewCount: 421,
      stock: 156,
      inStock: true,
      images: [
        'https://picsum.photos/400/400?random=6'
      ],
      tags: ['usb-c', 'hub', 'adapter']
    }
  ];

  return NextResponse.json({
    success: true,
    data: products,
    total: products.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock 응답 - 실제로는 요청 데이터를 사용하여 새 상품 생성
    const newProduct = {
      id: Math.floor(Math.random() * 10000) + 100,
      name: body.name || '새 상품',
      description: body.description || '상품 설명',
      price: body.price || 0,
      originalPrice: body.originalPrice || body.price || 0,
      currency: body.currency || 'KRW',
      category: body.category || 'general',
      brand: body.brand || 'Unknown',
      rating: 0,
      reviewCount: 0,
      stock: body.stock || 0,
      inStock: (body.stock || 0) > 0,
      images: body.images || ['https://picsum.photos/400/400?random=' + Math.floor(Math.random() * 100)],
      tags: body.tags || []
    };

    return NextResponse.json({
      success: true,
      message: '상품이 성공적으로 생성되었습니다.',
      data: newProduct,
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
