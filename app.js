const express = require("express");
const app = express();
const port = 3000;

// Консольное логирование каждого запроса (пригодится для продвинутого уровня)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 1. Текстовый эндпоинт на корневом маршруте (Вариант 1)
app.get("/", (req, res) => {
  res.send("Добро пожаловать!");
});

// 2. JSON-эндпоинт 1: сущность /api/users
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Иван Иванов", email: "ivan@example.com", role: "admin" },
    { id: 2, name: "Пётр Петров", email: "petr@example.com", role: "user" },
    {
      id: 3,
      name: "Анна Смирнова",
      email: "anna@example.com",
      role: "manager",
    },
  ]);
});

// 3. JSON-эндпоинт 2: справочник /api/roles
app.get("/api/roles", (req, res) => {
  res.json([
    { id: 1, code: "admin", title: "Администратор" },
    { id: 2, code: "user", title: "Пользователь" },
    { id: 3, code: "manager", title: "Менеджер" },
  ]);
});

// Кастомная обработка 404 (Not Found) с JSON-ответом
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
