import { NextResponse } from 'next/server';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseAttributeValue: true,
  trimValues: true
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true,
  indentBy: '  '
});

export async function POST(request: Request) {
  try {
    // Content-Type 확인
    const contentType = request.headers.get('content-type') || '';
    
    let xmlData: string;
    let parsedData: any;

    if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
      // XML 본문 읽기
      xmlData = await request.text();
      
      // XML 파싱
      parsedData = parser.parse(xmlData);
    } else if (contentType.includes('application/json')) {
      // JSON으로 받아서 XML로 변환하는 경우도 지원
      const jsonData = await request.json();
      parsedData = jsonData;
      xmlData = builder.build(jsonData);
    } else {
      // 기본적으로 텍스트로 받아서 XML로 파싱 시도
      xmlData = await request.text();
      parsedData = parser.parse(xmlData);
    }

    // Mock 응답 데이터 생성
    const responseData = {
      request: {
        received: new Date().toISOString(),
        contentType: contentType,
        parsed: parsedData
      },
      response: {
        status: 'success',
        message: 'XML 요청이 성공적으로 처리되었습니다.',
        data: {
          id: Math.floor(Math.random() * 10000) + 100,
          timestamp: new Date().toISOString(),
          processed: true,
          originalData: parsedData
        }
      }
    };

    // XML 응답 생성
    const xmlResponse = builder.build({
      response: {
        '@_status': 'success',
        '@_timestamp': new Date().toISOString(),
        message: 'XML 요청이 성공적으로 처리되었습니다.',
        data: {
          id: responseData.response.data.id,
          processed: true,
          originalRequest: parsedData
        }
      }
    });

    // XML 응답 반환
    return new NextResponse(xmlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error: any) {
    // 오류 발생 시 XML 형식으로 오류 응답
    const errorResponse = builder.build({
      response: {
        '@_status': 'error',
        '@_timestamp': new Date().toISOString(),
        message: 'XML 파싱 중 오류가 발생했습니다.',
        error: {
          type: error.name || 'ParseError',
          message: error.message || 'Unknown error'
        }
      }
    });

    return new NextResponse(errorResponse, {
      status: 400,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}


