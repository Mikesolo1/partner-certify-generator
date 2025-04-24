
import * as z from 'zod';

export const registerFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Название компании должно содержать не менее 2 символов.",
  }),
  contactPerson: z.string().min(2, {
    message: "Имя контактного лица должно содержать не менее 2 символов.",
  }),
  phone: z.string().min(10, {
    message: "Введите корректный номер телефона.",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Подтверждение пароля должно быть не менее 6 символов.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
