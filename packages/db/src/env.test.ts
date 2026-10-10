import { describe, expect, it } from "vitest";
import { readDatabaseUrl } from "./env.js";

describe("readDatabaseUrl", () => {
  it("returns the url when DATABASE_URL is a postgres url", () => {
    const url = "postgres://menged:secret@localhost:5434/menged";
    expect(readDatabaseUrl({ DATABASE_URL: url })).toBe(url);
  });

  it("accepts the postgresql:// scheme too", () => {
    const url = "postgresql://menged:secret@localhost:5434/menged";
    expect(readDatabaseUrl({ DATABASE_URL: url })).toBe(url);
  });

  it("throws when DATABASE_URL is missing", () => {
    expect(() => readDatabaseUrl({})).toThrow("DATABASE_URL is not set");
  });

  it("throws when DATABASE_URL is empty", () => {
    expect(() => readDatabaseUrl({ DATABASE_URL: "  " })).toThrow(
      "DATABASE_URL is not set",
    );
  });

  it("throws when DATABASE_URL is not a postgres url", () => {
    expect(() =>
      readDatabaseUrl({
        DATABASE_URL: "mysql://menged:secret@localhost:3306/menged",
      }),
    ).toThrow("DATABASE_URL must start with postgres:// or postgresql://");
  });

  it("never puts the password in the error message", () => {
    try {
      readDatabaseUrl({
        DATABASE_URL: "mysql://menged:super-secret@localhost/menged",
      });
    } catch (error) {
      expect(String(error)).not.toContain("super-secret");
      return;
    }
    throw new Error("expected readDatabaseUrl to throw");
  });
});
