import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received inquiry payload:', body);
    
    return NextResponse.json({ success: true, message: 'Enquiry received successfully.' });
  } catch (error) {
    console.error('Inquiry process error:', error);
    return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
  }
}
