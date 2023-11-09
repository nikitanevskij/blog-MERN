import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать не менее 5 символов").isLength({ min: 5 }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на автараку").optional().isURL(),
];
export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать не менее 5 символов").isLength({ min: 5 }),
];
