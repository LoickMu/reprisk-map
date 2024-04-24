import { Country } from "@/types/country";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { apolloClient } from "../../lib/apolloClient";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

type Props =
  | {
      country: Country;
      errorCode?: never;
    }
  | {
      country?: never;
      errorCode: number;
    };

const CountryDetailPage: FC<Props> = ({ country, errorCode }) => {
  const countryProperties = useMemo(
    () =>
      country
        ? [
            {
              label: "Code",
              value: country.code,
            },
            {
              label: "Capital",
              value: country.capital || "N/A",
            },
            {
              label: "Continent",
              value: country.continent.name,
            },
            {
              label: "Phone Code",
              value: country.phone,
            },
            {
              label: "Currencies",
              value: country.currencies.join(", "),
            },
            {
              label: "Languages",
              value: country.languages.map((lang) => lang.name).join(", "),
            },
            {
              label: "Emoji",
              value: country.emoji,
            },
            {
              label: "States",
              value: country.states.map((state) => state.name).join(", "),
            },
            {
              label: "Subdivisions",
              value: country.subdivisions.map((sub) => sub.name).join(", "),
            },
          ]
        : [],
    [country]
  );

  if (errorCode || !country) {
    return (
      <Container>
        <Label>Error: Country not found</Label>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{country.name} Details</title>
        <meta name="description" content={`Details for ${country.name}`} />
      </Head>
      <Container>
        <Link href="/">
          <Button>Go Back</Button>
        </Link>
        <Header>{country.name}</Header>
        {countryProperties.map((property) => (
          <InfoSection key={property.label}>
            <Label>{property.label}:</Label>
            <Info>{property.value}</Info>
          </InfoSection>
        ))}
      </Container>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  countryCode: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  if (!params || typeof params.countryCode !== "string") {
    return { notFound: true };
  }

  try {
    const { countryCode } = params;
    const { data } = await apolloClient.query({
      query: GET_COUNTRY_DETAILS,
      variables: { code: countryCode },
    });

    if (!data.country) {
      return { props: { errorCode: 404 } };
    }

    return {
      props: { country: data.country },
    };
  } catch (error) {
    // TODO: Handle server logs
    return { props: { errorCode: 500 } };
  }
};

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      code
      name
      phone
      capital
      emoji
      continent {
        name
      }
      languages {
        code
        name
      }
      currencies
      states {
        name
      }
      subdivisions {
        name
      }
    }
  }
`;

const Container = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Header = styled.h1`
  color: #333;
  font-size: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Info = styled.span`
  margin-left: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 5px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default CountryDetailPage;
