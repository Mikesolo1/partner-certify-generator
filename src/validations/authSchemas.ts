
import { z } from 'zod';

export const registerFormSchema = z.object({
  companyName: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  contactPerson: z.string().min(2, 'Имя контактного лица должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Номер телефона должен содержать минимум 10 цифр'),
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(1, 'Пароль обязателен'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
