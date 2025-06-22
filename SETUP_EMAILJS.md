# EmailJS Setup Instructions

To receive real orders on your email (freedomstylefs12@gmail.com), follow these steps:

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up with your email: freedomstylefs12@gmail.com
3. Verify your email address

## 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" 
4. Connect your Gmail account (freedomstylefs12@gmail.com)
5. Note down the Service ID (something like `service_xxxxxxx`)

## 3. Create Email Templates

### Template 1: Order Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it "Order Notification"
4. Use this template:

**Subject:** New Order #{{order_number}} - FreedomStyle

**Body:**
```
New Order Received!

Order Number: {{order_number}}
Customer: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

Delivery Address:
{{customer_address}}

Order Items:
{{order_items}}

Order Total: PKR {{total}}
Shipping: PKR {{shipping}}

Customer Notes: {{notes}}

Please contact customer to confirm order.
```

### Template 2: Contact Template
1. Create another template for contact form
2. Name it "Contact Message"
3. Use this template:

**Subject:** {{subject}} - FreedomStyle Contact

**Body:**
```
New contact message from FreedomStyle website:

From: {{from_name}}
Email: {{reply_to}}
Subject: {{subject}}

Message:
{{message}}
```

## 4. Get Your Keys
1. Go to "Account" → "General"
2. Copy your Public Key
3. Copy your Service ID from Email Services
4. Copy Template IDs from Email Templates

## 5. Update the Code
Replace the placeholders in `client/src/lib/emailjs.ts`:
- `EMAILJS_SERVICE_ID`: Your service ID
- `EMAILJS_PUBLIC_KEY`: Your public key
- Template IDs for both contact and order templates

## 6. Test
1. Add some items to cart
2. Go through checkout process
3. Check your email for order confirmation!

## Security Note
EmailJS is free for up to 200 emails per month. For production use, consider upgrading to a paid plan.