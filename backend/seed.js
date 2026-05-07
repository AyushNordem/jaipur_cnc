require('dotenv').config();
const mongoose = require('mongoose');
const SiteContent = require('./models/SiteContent');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jaipurcnc')
  .then(async () => {
    console.log('MongoDB Connected for Seeding');
    
    // Clear existing document if any
    await SiteContent.deleteMany({});
    
    const seedData = {
      siteName: 'Jaipur Arts CNC',
      contactPhone: '90010-21857',
      contactEmail: 'jaipurartscnc@gmail.com',
      address: 'Shop No. 2, Narayan Vihar Asarpura, Jaipur',
      facebookUrl: 'https://facebook.com',
      instagramUrl: 'https://instagram.com/jaipurartscnc',
      whatsappUrl: 'https://wa.me/919001021857',
      heroTitle: 'Premium CNC Cutting\n& Carving',
      heroSubtitle: 'Wood | Stone | Metal | Acrylic\nPrecision crafting with modern technology, fast delivery, and professional finishing.',
      testimonials: [
        {
          clientName: 'Rahul Verma',
          quote: 'Beautifully crafted wood temple—perfectly designed to fit my compact, custom space. A true blessing to have this sacred piece anchoring my daily prayers.',
          rating: 5
        },
        {
          clientName: 'Sanjay Sharma',
          quote: 'Incredible precision on the MDF jali cutting for our new office. Delivered right on time with flawless finishing.',
          rating: 5
        }
      ],
      galleryImages: [
        {
          url: '/uploads/cnc_about_hero.png',
          title: 'Industrial Wood Routing',
          category: 'Wood'
        },
        {
          url: '/uploads/cnc_finished_mandir.png',
          title: 'Premium Corian Mandir',
          category: 'Corian'
        },
        {
          url: '/uploads/about_hero_mandir.png',
          title: 'Glowing Home Temple',
          category: 'Corian'
        },
        {
          url: '/uploads/cnc_raw_wood.png',
          title: 'Precision MDF Cutting',
          category: 'MDF'
        }
      ]
    };
    
    await SiteContent.create(seedData);
    console.log('Database successfully seeded with demo data!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding Error:', err);
    process.exit(1);
  });
