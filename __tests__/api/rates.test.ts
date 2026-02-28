import { GET } from "@/app/api/rates/route";

// Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => data,
    }),
  },
}));

const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
  jest.resetAllMocks();
});

describe("GET /api/rates", () => {
  it("returns 500 when EXCHANGERATE_API_KEY is missing", async () => {
    delete process.env.EXCHANGERATE_API_KEY;
    const res = await GET();
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Missing EXCHANGERATE_API_KEY");
  });

  it("returns 502 when external fetch fails", async () => {
    process.env.EXCHANGERATE_API_KEY = "test-key";
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    const res = await GET();
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBe("Failed to fetch rates");
  });

  it("returns 502 when API result is not success", async () => {
    process.env.EXCHANGERATE_API_KEY = "test-key";
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ result: "error", "error-type": "invalid-key" }),
    });
    const res = await GET();
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBe("invalid-key");
  });

  it("returns rates object on success", async () => {
    process.env.EXCHANGERATE_API_KEY = "test-key";
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: "success",
        conversion_rates: { COP: 4000, MXN: 17 },
        time_last_update_utc: "Mon, 01 Jan 2024 00:00:00 +0000",
      }),
    });
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      COP: 4000,
      MXN: 17,
      lastUpdated: "Mon, 01 Jan 2024 00:00:00 +0000",
    });
  });
});
