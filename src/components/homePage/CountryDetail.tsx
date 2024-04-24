import { FC } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { CountryProperties } from "@/pages";

interface Props {
  country: CountryProperties;
}

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      emoji
      name
      code
    }
  }
`;

export const CountryDetail: FC<Props> = ({ country }) => {
  const { data, loading } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code: country.code },
  });

  if (loading) return <Spinner role="loader" />;

  return (
    <DetailContainer>
      <Data>Code: {data.country.code}</Data>
      <Data>Emoji: {data.country.emoji}</Data>
      <StyledLink href={`/country/${data.country.code}`}>
        Get more details
      </StyledLink>
      <StyledLink
        href={`https://www.wikidata.org/wiki/${country.wikidata_id}`}
        target="_blank"
      >
        Look up on Wikidata
      </StyledLink>
    </DetailContainer>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const Data = styled.p`
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: #0070f3;
  text-decoration: none;
  margin-bottom: 8px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
