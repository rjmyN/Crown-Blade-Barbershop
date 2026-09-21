# Crown & Blade Barbershop Website

A modern, premium, fully responsive website for Crown & Blade Barbershop in Kapenguria, Kenya.

## 🎨 Features

- **Premium Design**: Sophisticated black, gold, and white color scheme
- **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **Interactive Navigation**: Sticky header with smooth scroll and mobile hamburger menu
- **Hero Section**: Full-screen hero with professional background and call-to-action buttons
- **About Section**: Showcase your barbershop story and values
- **Services**: Detailed service cards with pricing and booking buttons
- **Premium Packages**: Highlighted grooming packages for complete experiences
- **Pricing Menu**: Clean, organized pricing display
- **Gallery**: Filterable image gallery with lightbox functionality
- **Booking Form**: Professional appointment booking with validation
- **Contact Section**: Complete contact information with opening hours
- **WhatsApp Integration**: Floating WhatsApp button for instant messaging
- **Scroll Animations**: Smooth fade-in effects as users scroll
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with responsive design
- `script.js` - All interactive functionality
- `README.md` - This file

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in a web browser
2. **No installation required**: This is a pure HTML/CSS/JavaScript website
3. **Deploy anywhere**: Upload to any web hosting service

## 🔧 Customization Guide

### Update Contact Information

**In `index.html`**, search and replace:
- Phone: `+254 768 055 069` → Your actual number
- Email: `hainmcclain@gmail.com` → Your actual email
- Location: Update address as needed

**In `script.js`**, update WhatsApp number:
- Line with `wa.me/254768055069` → Your WhatsApp number

### Update Prices

**In `index.html`**, find the pricing sections and update:
- Services section (around line 100-200)
- Packages section (around line 300-350)
- Pricing menu section (around line 400-450)
- Booking form dropdown (around line 550-570)

All prices are clearly labeled with "KSh" for easy identification.

### Replace Images

The website currently uses high-quality placeholder images from Unsplash. To use your own:

1. **Prepare your images**:
   - Hero background: 1920x1080px minimum
   - About image: 800x800px minimum
   - Gallery images: 600x600px minimum (square format recommended)

2. **Create an images folder**:
   ```
   /images
     /hero-background.jpg
     /about.jpg
     /gallery
       /image1.jpg
       /image2.jpg
       etc.
   ```

3. **Update image URLs in `index.html`**:
   - Hero: Line ~30: `.hero-background` background image
   - About: Line ~60: `<img src="..."`
   - Gallery: Lines ~400-500: Each gallery item `<img src="..."`

### Update Opening Hours

**In `index.html`**, search for "Opening Hours" section (around line 700):
```html
<div class="hours-item">
    <span class="hours-days">Monday – Saturday</span>
    <span class="hours-time">8:00 AM – 8:00 PM</span>
</div>
```

### Add Social Media Links

**In `index.html`**, search for "social-links" (around line 750):
```html
<a href="YOUR_INSTAGRAM_URL" class="social-icon">📷</a>
<a href="YOUR_FACEBOOK_URL" class="social-icon">📘</a>
<a href="YOUR_TIKTOK_URL" class="social-icon">🎵</a>
```

Replace `#` with your actual social media URLs.

### Update Google Maps

**In `index.html`**, search for "map-placeholder" (around line 680):

Replace the placeholder div with actual Google Maps embed:
```html
<iframe 
    src="YOUR_GOOGLE_MAPS_EMBED_URL"
    width="100%" 
    height="400" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

To get your Google Maps embed URL:
1. Go to Google Maps
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code

### Change Color Scheme

**In `styles.css`**, update the CSS variables (lines 7-15):
```css
:root {
    --primary-bg: #0a0a0a;        /* Main background */
    --secondary-bg: #1a1a1a;      /* Secondary background */
    --gold: #d4af37;              /* Accent color */
    --white: #ffffff;             /* Text color */
    --light-gray: #b8b8b8;        /* Secondary text */
}
```

## 📱 Booking Form

The booking form currently:
- Validates all required fields
- Formats phone numbers to Kenyan format (+254...)
- Shows confirmation message after submission
- Logs data to browser console

### Connect to Backend

To make bookings functional, you can:

1. **Email Service**: Add EmailJS, Formspree, or similar
2. **Database**: Connect to Firebase, Supabase, or your backend
3. **WhatsApp**: Current setup allows manual WhatsApp integration
4. **Booking Platform**: Integrate with Calendly, Acuity, or similar

Example with EmailJS (in `script.js`):
```javascript
// After line 150 in script.js
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(response => {
        console.log('SUCCESS!', response);
    });
```

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Go to Settings → Pages
5. Select main branch
6. Your site will be live at `username.github.io/repository-name`

### Option 2: Netlify (Free)
1. Sign up at netlify.com
2. Drag and drop your folder
3. Get instant live URL
4. Optional: Add custom domain

### Option 3: Traditional Web Hosting
1. Purchase hosting from any provider
2. Upload files via FTP
3. Point your domain to the hosting

## 📊 Performance

- **Fast Loading**: No heavy frameworks, pure HTML/CSS/JS
- **Optimized Images**: Using modern image formats
- **Smooth Animations**: Hardware-accelerated CSS
- **Mobile-First**: Designed for mobile performance

## ✅ Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

- Form validation is client-side only
- Implement server-side validation when connecting to backend
- Use HTTPS when deploying (most modern hosts provide this free)
- Never expose API keys in frontend code

## 📞 Support

For customization help or questions:
- Email: hainmcclain@gmail.com
- WhatsApp: +254 768 055 069

## 📝 License

This website is created for Crown & Blade Barbershop. All rights reserved.

---

**Built with ❤️ for Crown & Blade Barbershop**

*"Sharp Cuts. Clean Look. Your Crown, Our Craft."*
