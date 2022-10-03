import { z } from "zod";

export const apiContentSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  title_short1: z.string(),
  title_short2: z.string(),
  title_short3: z.string(),
  title_en: z.string(),
  public_url: z.union([
    z.string().url().min(1).startsWith("https://"),
    z.string().url().min(1).startsWith("http://"),
  ]),
  twitter_account: z.string().min(1),
  twitter_hash_tag: z.string().min(1),
  cours_id: z.number().nonnegative(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
  sex: z.number().min(0).max(1),
  sequel: z.number().nonnegative(),
  city_code: z.number(),
  city_name: z.string(),
  product_companies: z.string(),
  ogp_image_url: z.union([z.string().url().startsWith("https://"), z.string()]),
  ogp_description: z.string(),
});

export const apiSchema = z.array(apiContentSchema);
