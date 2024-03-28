import { z } from "zod";

const FilterOperations = z.object({
  equals: z.union([z.string(), z.number()]).optional(),
  in: z.array(z.union([z.string(), z.number()])).optional(),
  notIn: z.array(z.union([z.string(), z.number(), z.null()])).optional(),
  not: z.union([z.string(), z.number(), z.null()]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
});

export const ProfileSchema = z.object({
  id: z.number().or(FilterOperations).optional(), // Assuming autoincrement implies it's always present and a number
  title: z.string().or(FilterOperations).optional(), // Optional String
  image_url: z.string().or(FilterOperations).optional(), // Optional String
  description: z.string().or(FilterOperations).optional(), // Optional String
  location_coords: z.string().or(FilterOperations).optional(), // Optional String
  created_at: z.date().or(FilterOperations).optional(), // Assuming always present with a default now() value
  updated_at: z.date().optional().or(FilterOperations).optional(), // Optional DateTime
  address: z.string().or(FilterOperations).optional(), // String and unique but uniqueness is a
});

// Define a schema for the orderBy clause
export const ProfileOrderByWithRelationInput = z
  .object({
    id: z.enum(["asc", "desc"]).optional(),
    title: z.enum(["asc", "desc"]).optional(),
    image_url: z.enum(["asc", "desc"]).optional(),
    description: z.enum(["asc", "desc"]).optional(),
    location_coords: z.enum(["asc", "desc"]).optional(),
    created_at: z.enum(["asc", "desc"]).optional(),
    updated_at: z.enum(["asc", "desc"]).optional(),
    address: z.enum(["asc", "desc"]).optional(),
  })
  .optional();

// Define a schema for the pagination and sorting
export const FindManyProfileInput = z.object({
  where: ProfileSchema.optional(),
  orderBy: ProfileOrderByWithRelationInput,
  take: z.number().optional(),
  skip: z.number().optional(),
});
