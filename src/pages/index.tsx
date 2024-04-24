import { useState } from "react";
import styled from "styled-components";
import { CountryDetail } from "@/components/homePage/CountryDetail";
import { Map } from "@/components/homePage/Map";
import Head from "next/head";

export type CountryProperties = {
  name: string;
  code: string;
  wikidata_id: string;
};

export default function HomePage() {
  const [countrySelected, setCountrySelected] =
    useState<CountryProperties | null>(null);

  return (
    <>
      <Head>
        <title>World Countries</title>
        <meta name="description" content="World countries" />
      </Head>
      <AppContainer>
        <MapContainer>
          <Map setCountrySelected={setCountrySelected} />
        </MapContainer>
        <CountryDetailsContainer>
          {countrySelected ? (
            <>
              <h1>{countrySelected.name}</h1>
              <CountryDetail country={countrySelected} />
            </>
          ) : (
            <h3>Click on a country on the map to get details</h3>
          )}
        </CountryDetailsContainer>
      </AppContainer>
    </>
  );
}

const mobileBreakpoint = "768px";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row;
  }
`;

const MapContainer = styled.div`
  height: 50vh;
  width: 100vw;
  @media (min-width: ${mobileBreakpoint}) {
    height: 100vh;
    width: 50vw;
  }
`;

const CountryDetailsContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
`;
