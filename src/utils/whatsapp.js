// WhatsApp Integration Helper for BodyFit
// Note: Currently set to testing number (+91 9945505665).
// Client production number (+91 92120 59586) will be swapped before final release.

export class WhatsAppConfig {
  static TESTING_NUMBER = '919945505665';
  static CLIENT_NUMBER = '919212059586';
  
  static get ActiveNumber() {
    return this.TESTING_NUMBER; // Active testing number
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
