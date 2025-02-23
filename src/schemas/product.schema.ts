import { z } from "zod";

const productFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.string()
    .min(1, "Preço é obrigatório")
    .regex(/^\d+([.,]\d{1,2})?$/, "Formato inválido. Use 0.00 ou 0,00"),
  quantity: z.number().min(0, "Quantidade deve ser maior ou igual a 0"),
  images: z.string().url("URL inválida"),
});

export const productSchema = productFormSchema.transform((data) => ({
  ...data,
  price: Number(data.price.replace(',', '.')),
}));

export type ProductFormData = z.infer<typeof productFormSchema>;

export type ProductData = z.infer<typeof productSchema>;


export const OrderStatus = z.enum([
  'processando',
  'confirmado',
  'enviado',
  'entregue',
  'cancelado',
]);

export const orderSchema = z.object({
  orderId: z.string().min(1, 'ID do pedido é obrigatório'),
  status: OrderStatus,
});

export type OrderFormData = z.infer<typeof orderSchema>;