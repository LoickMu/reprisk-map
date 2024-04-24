import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CountryDetail,
  GET_COUNTRY_DETAILS,
} from "@/components/homePage/CountryDetail";

const mocks = [
  {
    request: {
      query: GET_COUNTRY_DETAILS,
      variables: { code: "US" },
    },
    result: {
      data: {
        country: {
          name: "United States",
          code: "US",
        },
      },
    },
  },
];

describe("CountryDetail", () => {
  it("renders without error and displays country details after loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryDetail
          country={{ code: "US", name: "United States", wikidata_id: "ID" }}
        />
      </MockedProvider>
    );

    expect(screen.getByRole("loader")).toBeInTheDocument();

    await screen.findByText("Code: US");
    expect(screen.getByText("Code: US")).toBeInTheDocument();
  });
});
