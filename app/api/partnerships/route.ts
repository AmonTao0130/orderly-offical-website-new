import { NextRequest, NextResponse } from 'next/server';

interface PartnershipRequest {
  firstName: string;
  lastName: string;
  email: string;
  telegramId: string;
  companyProject: string;
  role: string;
  buildDex: string;
  message: string;
}

function validateRequiredFields(body: Partial<PartnershipRequest>): string[] {
  const errors: string[] = [];
  
  if (!body.firstName?.trim()) {
    errors.push('First Name is required');
  }
  if (!body.lastName?.trim()) {
    errors.push('Last Name is required');
  }
  if (!body.email?.trim()) {
    errors.push('Email is required');
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      errors.push('Please provide a valid email address');
    }
  }
  if (!body.telegramId?.trim()) {
    errors.push('Telegram username is required');
  }
  if (!body.companyProject?.trim()) {
    errors.push('Company / Project is required');
  }
  if (!body.role?.trim()) {
    errors.push('Role is required');
  }
  if (!body.buildDex?.trim()) {
    errors.push('Please answer if you are looking to build a DEX');
  }
  if (!body.message?.trim()) {
    errors.push('Message is required');
  }
  
  return errors;
}

function formatTelegramMessage(data: PartnershipRequest): string {
  const escapeMarkdown = (text: string): string => {
    // Escape special characters for Telegram MarkdownV2
    return text.replace(/([_\*\[\]\(\)~`>#+\-=|{}.!])/g, '\\$1');
  };

  const lines = [
    '🚀 *New Partnership Inquiry*',
    '',
    `*First Name:* ${escapeMarkdown(data.firstName)}`,
    `*Last Name:* ${escapeMarkdown(data.lastName)}`,
    `*Email:* ${escapeMarkdown(data.email)}`,
    `*Telegram username:* ${escapeMarkdown(data.telegramId)}`,
    `*Company / Project:* ${escapeMarkdown(data.companyProject)}`,
    `*Role:* ${escapeMarkdown(data.role)}`,
    `*Looking to build a DEX:* ${escapeMarkdown(data.buildDex)}`,
    '',
    '*Message:*',
    escapeMarkdown(data.message),
  ];

  return lines.join('\n');
}

async function sendTelegramMessage(message: string): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { 
      success: false, 
      error: 'Telegram configuration missing. Please check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.' 
    };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Telegram API error:', errorData);
      return { 
        success: false, 
        error: `Failed to send message to Telegram: ${errorData.description || response.statusText}` 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return { 
      success: false, 
      error: 'Network error while sending message to Telegram. Please try again later.' 
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: Partial<PartnershipRequest>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    const validationErrors = validateRequiredFields(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Type assertion after validation
    const data = body as PartnershipRequest;

    // Format message for Telegram
    const telegramMessage = formatTelegramMessage(data);

    // Send to Telegram
    const telegramResult = await sendTelegramMessage(telegramMessage);
    
    if (!telegramResult.success) {
      return NextResponse.json(
        { error: telegramResult.error || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Partnership inquiry submitted successfully. We will get back to you soon!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in partnerships API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Partnerships API - Use POST to submit inquiries' },
    { status: 200 }
  );
}
