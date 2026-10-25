import React from "react";
import { render, screen } from "@testing-library/react";
import UntetheredSellerLayout, { metadata } from "../app/untethered-seller/layout";

describe("UntetheredSellerLayout", () => {
  it("renders its children", () => {
    render(
      <UntetheredSellerLayout>
        <p>child content</p>
      </UntetheredSellerLayout>
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("exports page metadata", () => {
    expect(metadata.title).toBe("Sell More As An Untethered Seller | Shannon Muruli");
    expect(metadata.description).toBe("Your free 5-day audio experience for women who sell.");
  });
});
