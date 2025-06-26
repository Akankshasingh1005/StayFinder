import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from './model/user.model.js';
import Listing from './model/listing.model.js';
import Booking from './model/booking.model.js';

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/stayfinder';

const staticImages = [

  "https://stayfinder-n48x.onrender.com/uploads/1.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/2.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/3.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/4.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/5.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/6.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/7.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/8.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/9.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/10.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/11.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/12.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/13.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/14.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/15.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/16.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/17.jpg",
  "https://stayfinder-n48x.onrender.com/uploads/18.jpg"


];


const categories = [
  "Rooms",
  "Flat",
  "Farm House",
  "Pool House",
  "Villa",
  "PG",
  "Cabins",
  "Shops"
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('🟢 Connected to MongoDB');

    await User.deleteMany();
    await Listing.deleteMany();
    await Booking.deleteMany();

    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456'
      });
      await user.save();
      users.push(user);
    }

    const listings = [];
    for (let i = 0; i < 16; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];

      const listing = await Listing.create({
        title: `${faker.number.int({ min: 1, max: 4 })}BHK ${faker.word.adjective()} home in ${faker.location.city()}`,
        description: faker.lorem.paragraph(),
        rent: faker.number.int({ min: 500, max: 5000 }),
        city: faker.location.city(),
        landmark: faker.location.street(),
        image1: staticImages[i % staticImages.length],
        image2: staticImages[(i + 1) % staticImages.length],
        image3: staticImages[(i + 2) % staticImages.length],
        category: category,
        host: randomUser._id
      });

      listings.push(listing);
    }

    for (let i = 0; i < 5; i++) {
      const listing = listings[Math.floor(Math.random() * listings.length)];
      const host = listing.host;

      let guest;
      do {
        guest = users[Math.floor(Math.random() * users.length)]._id;
      } while (guest.toString() === host.toString());

      const startDate = faker.date.soon({ days: 30 });
      const endDate = faker.date.soon({ days: 5, refDate: startDate });
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = totalDays * listing.rent;

      await Booking.create({
        host,
        guest,
        listing: listing._id,
        startDate,
        endDate,
        totalPrice,
        status: 'active'
      });
    }

    console.log('✅ Seeded users, listings, and bookings successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
