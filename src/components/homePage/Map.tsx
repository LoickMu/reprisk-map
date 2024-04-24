import { CountryProperties } from "@/pages";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import MapGL, { Layer, MapLayerMouseEvent, Source } from "react-map-gl";

interface Props {
  setCountrySelected: (country: CountryProperties) => void;
}

export function Map({ setCountrySelected }: Props) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const onClick = (event: MapLayerMouseEvent) => {
    const features = event.features;
    const countryFeature = features?.find(
      (f) => f.sourceLayer === "country_boundaries"
    );
    if (countryFeature) {
      setCountrySelected({
        name: countryFeature?.properties?.name_en,
        code: countryFeature?.properties?.iso_3166_1,
        wikidata_id: countryFeature?.properties?.wikidata_id,
      });
    }
  };

  const onMouseMove = (event: MapLayerMouseEvent) => {
    const features = event.features;
    const countryFeature = features?.find(
      (f) => f.sourceLayer === "country_boundaries"
    );
    if (countryFeature) {
      if (countryFeature.properties?.name_en !== hoveredCountry) {
        setHoveredCountry(countryFeature.properties?.name_en);
      }
    } else {
      setHoveredCountry(null);
    }
  };

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return <div>Mapbox access token is not set</div>;
  }

  return (
    <MapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 1,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      onClick={onClick}
      onMouseMove={onMouseMove}
      interactiveLayerIds={["country-boundaries"]}
    >
      <Source
        id="countries"
        type="vector"
        url="mapbox://mapbox.country-boundaries-v1"
      >
        <Layer
          id="country-boundaries"
          type="fill"
          source-layer="country_boundaries"
          paint={{
            "fill-color": [
              "case",
              ["==", ["get", "name_en"], hoveredCountry],
              "#ff6347",
              "#627BC1",
            ],
            "fill-opacity": 0.5,
          }}
          beforeId="waterway-label"
        />
      </Source>
    </MapGL>
  );
}
