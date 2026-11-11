import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  telegram: varchar("telegram", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
