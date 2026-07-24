import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INITIAL_PRODUCTS = [
  {
    name: 'CyberBot DX Transformer Action Figure',
    category: 'Action Figures',
    price: 1499,
    originalPrice: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced articulating robot figure that transforms into a supersonic jet fighter with die-cast metal joints and light-up LED core launcher.',
    ageGroup: '6-12 Years',
    isBestSeller: true,
    stock: 25,
  },
  {
    name: 'CuddleBear Ultra Plush Soft Companion',
    category: 'Plush Toys',
    price: 899,
    originalPrice: 1199,
    imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    description: 'Hypoallergenic super-soft teddy bear crafted with ultra-plush organic cotton. Perfect cuddle buddy for toddlers and newborns.',
    ageGroup: '0-5 Years',
    isBestSeller: true,
    stock: 40,
  },
  {
    name: 'STEM Genius Magnetic Building Blocks (60 Pcs)',
    category: 'Educational',
    price: 2199,
    originalPrice: 2799,
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    description: '3D translucent magnetic tile set encouraging architectural thinking, spatial awareness, and creative geometry for young minds.',
    ageGroup: '3-10 Years',
    isBestSeller: true,
    stock: 18,
  },
  {
    name: 'SpeedRacer Pro 4WD Remote Control Buggy',
    category: 'RC & Vehicles',
    price: 2999,
    originalPrice: 3899,
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
    description: 'High-speed off-road RC car reaching up to 25 km/h with rechargeable battery, shock absorbers, and anti-interference 2.4GHz remote.',
    ageGroup: '8+ Years',
    isBestSeller: false,
    stock: 12,
  },
  {
    name: 'Wooden Wonderland Train Track Express',
    category: 'Educational',
    price: 1849,
    originalPrice: 2299,
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    description: 'Premium natural beechwood train system with magnetic cars, suspension bridge, station house, and 45 interlocking tracks.',
    ageGroup: '3-8 Years',
    isBestSeller: true,
    stock: 15,
  },
  {
    name: 'Quest for Glory Fantasy Board Game',
    category: 'Board Games',
    price: 1299,
    originalPrice: 1599,
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    description: 'Family strategy adventure game featuring custom miniatures, quest cards, and dynamic board tiles for 2 to 6 players.',
    ageGroup: '7+ Years',
    isBestSeller: false,
    stock: 30,
  },
  {
    name: 'Rainbow Clay & Pottery Crafting Studio',
    category: 'Creative & Crafts',
    price: 999,
    originalPrice: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    description: 'Complete air-dry clay kit with 24 non-toxic vibrant colors, sculpting tools, glitter gels, and step-by-step project guide.',
    ageGroup: '5-12 Years',
    isBestSeller: false,
    stock: 22,
  },
  {
    name: 'AeroGlide Quadcopter Drone with HD Camera',
    category: 'RC & Vehicles',
    price: 3499,
    originalPrice: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    description: 'Beginner-friendly stunt drone with altitude hold, one-key flip, HD camera, and dual batteries for 20 mins flight time.',
    ageGroup: '10+ Years',
    isBestSeller: true,
    stock: 8,
  }
];

export async function seedDatabase() {
  console.log('Seeding MySQL database with initial toy products...');
  await prisma.product.deleteMany({});
  for (const prod of INITIAL_PRODUCTS) {
    await prisma.product.create({
      data: prod
    });
  }
  console.log('Database seeded successfully!');
}

async function main() {
  await seedDatabase();
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
