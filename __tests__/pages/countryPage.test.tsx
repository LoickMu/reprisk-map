import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CountryDetailPage, {
  getServerSideProps,
} from "@/pages/country/[countryCode]";
import * as ApolloClientModule from "@/lib/apolloClient";

vi.mock("@/lib/apolloClient", () => ({
  apolloClient: {
    query: vi.fn(),
  },
}));

// TODO: Fix type issue with Apollo Client mock
const queryMock = ApolloClientModule.apolloClient.query as any;

describe("CountryDetailPage", () => {
  it("renders country details correctly", async () => {
    queryMock.mockReturnValue(
      Promise.resolve({
        data: {
          country: {
            name: "United States",
            code: "US",
          },
        },
      })
    );

    render(
      <CountryDetailPage
        country={{
          code: "US",
          name: "United States",
          phone: "1",
          capital: "Washington D.C.",
          emoji: "🇺🇸",
          continent: {
            name: "North America",
          },
          languages: [
            {
              code: "en",
              name: "English",
            },
          ],
          currencies: ["USD", "USN", "USS"],
          states: [],
          subdivisions: [],
        }}
      />
    );
    expect(await screen.findByText("United States")).toBeInTheDocument();
    expect(screen.getByText("US")).toBeInTheDocument();
  });

  it("renders error when country data is not found", () => {
    render(<CountryDetailPage errorCode={404} />);
    expect(screen.getByText("Error: Country not found")).toBeInTheDocument();
  });
});

describe("getServerSideProps", () => {
  it("returns props with country data", async () => {
    queryMock.mockReturnValue(
      Promise.resolve({
        data: {
          country: {
            name: "United States",
            code: "US",
          },
        },
      })
    );

    const context = {
      params: { countryCode: "US" },
      req: {},
      res: {},
      query: {},
      resolvedUrl: "",
    };

    const response = await getServerSideProps(context as any);
    expect(response).toEqual({
      props: {
        country: {
          name: "United States",
          code: "US",
        },
      },
    });
  });

  it("returns error code 404 when no country is found", async () => {
    queryMock.mockReturnValue(Promise.resolve({ data: {} }));

    const context = {
      params: { countryCode: "XX" },
      req: {},
      res: {},
      query: {},
      resolvedUrl: "",
    };

    const response = await getServerSideProps(context as any);
    expect(response).toEqual({
      props: {
        errorCode: 404,
      },
    });
  });

  it("handles exceptions by returning error code 500", async () => {
    queryMock.mockReturnValue(Promise.reject(new Error("Server error")));

    const context = {
      params: { countryCode: "YY" },
      req: {},
      res: {},
      query: {},
      resolvedUrl: "",
    };

    const response = await getServerSideProps(context as any);
    expect(response).toEqual({
      props: {
        errorCode: 500,
      },
    });
  });
});
