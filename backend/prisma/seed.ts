// Импортируем PrismaClient из сгенерированного клиента
import { PrismaClient } from '../src/generated/prisma';
// Подключаем bcrypt для хэширования паролей
import bcrypt from 'bcrypt';

// Создаём экземпляр Prisma
const prisma = new PrismaClient();

async function main() {
  // Удалим старых пользователей (чтобы при повторном запуске не было конфликтов с уникальными email)
  await prisma.user.deleteMany();

  // Подготавливаем список тестовых пользователей
  const users = [
    { email: 'alice@example.com', password: 'password123', name: 'Alice' },
    { email: 'bob@example.com', password: 'mypassword', name: 'Bob' },
    { email: 'charlie@example.com', password: 'qwerty123', name: 'Charlie' },
  ];

  // Для каждого пользователя хэшируем пароль и создаём запись в базе
  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await prisma.user.create({
      data: {
        email: u.email,
        password: hashedPassword,
        name: u.name,
      },
    });
  }

  console.log('✅ Seed завершён: пользователи добавлены');
}

// Запускаем функцию main и корректно закрываем соединение
main()
  .catch((e) => {
    console.error('❌ Ошибка при seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
