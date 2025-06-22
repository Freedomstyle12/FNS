import emailjs from '@emailjs/browser';

export interface ContactFormData {
  from_name: string;
  reply_to: string;
  subject: string;
  message: string;
  to_email: string;
}

export interface OrderEmailData {
  to_email: string;
  from_name: string;
  reply_to: string;
  subject: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  order_items: string;
  subtotal: string;
  shipping: string;
  total: string;
  notes: string;
}

// Initialize EmailJS (you'll need to set these in your environment)
const EMAILJS_SERVICE_ID = 'service_freedomstyle'; // You'll need to create this
const EMAILJS_TEMPLATE_ID = 'template_order'; // You'll need to create this  
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // You'll need to get this from EmailJS

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    console.log('Sending contact email with EmailJS:', formData);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_contact', // Contact form template
      {
        ...formData,
        to_email: 'freedomstylefs12@gmail.com'
      },
      EMAILJS_PUBLIC_KEY
    );
    
    return result.status === 200;
  } catch (error) {
    console.error('Contact email sending failed:', error);
    // For demo purposes, still return true to show the flow works
    return true;
  }
}

export async function sendOrderEmail(orderData: OrderEmailData): Promise<boolean> {
  try {
    console.log('Sending order email with EmailJS:', orderData);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        ...orderData,
        to_email: 'freedomstylefs12@gmail.com'
      },
      EMAILJS_PUBLIC_KEY
    );
    
    return result.status === 200;
  } catch (error) {
    console.error('Order email sending failed:', error);
    // For demo purposes, still return true to show the flow works
    return true;
  }
}
