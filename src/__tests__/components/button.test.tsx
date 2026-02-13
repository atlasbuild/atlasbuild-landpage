import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with the correct text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: "Outline" });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain("border");
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });
});
