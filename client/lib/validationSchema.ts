import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, " product name is required"),
  description: z.string().min(1, "description of the the product is required"),
  brand: z.string().min(1, "brand of the product is required"),
  price: z.string().min(1, "price is requried"),
  category: z.string().min(1, "category is required"),
  releaseDate: z.string().date(),
  available: z.boolean(),
  quantity: z.string().min(1, "quantity of the product is required"),
});

export type ProductForm = z.infer<typeof productSchema>;
