import bcrypt from 'bcrypt';
import prisma from './prisma';

export const seedAdmin = async () => {
  try {
    const adminExists = await prisma.user.findUnique({
      where: {
        email: 'admin@example.com',
      },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);

      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });

      console.log('Admin user successfully seeded!');
    }
  } catch (error) {
    console.error('Failed to seed Admin user:', error);
  }
};

seedAdmin();
