import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import DashboardHome from "./page";
import NotFound from "./not-found";

vi.mock("../components/ApiHealthBanner", () => ({
  ApiHealthBanner: () => <div role="status">API health</div>,
}));
vi.mock("next/link", () => ({ default: "a" }));

afterEach(cleanup);

describe("dashboard page smoke tests", () => {
  it("renders the dashboard page", () => {
    render(<DashboardHome />);

    expect(screen.getByRole("heading", { name: /member dashboard/i })).toBeTruthy();
  });

  it("renders the not-found page", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeTruthy();
  });
});
