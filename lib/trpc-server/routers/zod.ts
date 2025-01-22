import { z } from "zod";
import { Prisma } from "@prisma/client";

// Define which fields can be selected
export const ProfileSelect = z.record(z.boolean()).optional();

// Define filter operations for different field types
const StringFilter = z
  .object({
    equals: z.string().optional(),
    in: z.array(z.string()).optional(),
    notIn: z.array(z.string()).optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.string().optional(),
  })
  .optional();

const IntFilter = z
  .object({
    equals: z.number().optional(),
    in: z.array(z.number()).optional(),
    notIn: z.array(z.number()).optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.number().optional(),
  })
  .optional();

const DateTimeFilter = z
  .object({
    equals: z.date().optional(),
    in: z.array(z.date()).optional(),
    notIn: z.array(z.date()).optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z.date().optional(),
  })
  .optional();

// Define the Profile schema for where clauses
export const ProfileSchema = z.object({
  id: z.number().or(IntFilter).optional(),
  title: z.string().or(StringFilter).optional(),
  image_url: z.string().or(StringFilter).optional(),
  description: z.string().or(StringFilter).optional(),
  location_coords: z.string().or(StringFilter).optional(),
  created_at: z.date().or(DateTimeFilter).optional(),
  updated_at: z.date().or(DateTimeFilter).optional(),
  address: z.string().or(StringFilter).optional(),
  location_name: z.string().or(StringFilter).optional(),
});

// Define a schema for the orderBy clause
export const SortOrder = z.enum(["asc", "desc"]);

export const ProfileOrderByWithRelationInput = z
  .object({
    id: SortOrder.optional(),
    title: SortOrder.optional(),
    image_url: SortOrder.optional(),
    description: SortOrder.optional(),
    location_coords: SortOrder.optional(),
    created_at: SortOrder.optional(),
    updated_at: SortOrder.optional(),
    address: SortOrder.optional(),
    location_name: SortOrder.optional(),
  })
  .optional();

// Define a schema for the pagination and sorting
export const FindManyProfileInput = z.object({
  where: ProfileSchema.optional(),
  orderBy: ProfileOrderByWithRelationInput,
  take: z.number().optional(),
  skip: z.number().optional(),
  select: ProfileSelect,
});
