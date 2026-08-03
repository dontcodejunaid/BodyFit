// WhatsApp Integration Helper for BodyFit
// Configure the destination number via VITE_WHATSAPP_NUMBER (digits only, including country code).

export class WhatsAppConfig {
  static get ActiveNumber() {
    return import.meta.env.VITE_WHATSAPP_NUMBER ?? '';
  }
}

/**
 * Formats booking details into a clean WhatsApp text message and opens wa.me link
 * @param {Object} bookingDetails 
 */
export function sendWhatsAppBookingAlert(bookingDetails) {
  const { id, name, phone, service, date, time, trainer, status } = bookingDetails;

  const textMessage = `🏋️ *NEW BODYFIT BOOKING REQUEST* 🏋️\n\n` +
    `📌 *Booking Ref:* #${id}\n` +
    `👤 *Client Name:* ${name}\n` +
    `📞 *Phone Number:* ${phone}\n` +
    `💪 *Service:* ${service}\n` +
    `📅 *Date:* ${date}\n` +
    `⏰ *Time Slot:* ${time}\n` +
    `${trainer ? `🧘 *Trainer:* ${trainer}\n` : ''}` +
    `⚡ *Status:* ${status || 'Pending'}\n\n` +
    `Please confirm slot availability. Thank you!`;

  const encodedMessage = encodeURIComponent(textMessage);
  const whatsappUrl = `https://wa.me/${WhatsAppConfig.ActiveNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}
