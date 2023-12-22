import {
  Box,
  Button,
  Text,
  Tooltip,
  TooltipContent,
  TooltipText,
} from "@gluestack-ui/themed";
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Supercluster from "supercluster";

const MapComponent = ({ coordinates }: { coordinates?: string[] }) => {
  const mapRef = useRef(null);
  const [clusters, setClusters] = useState<
    Supercluster.PointFeature<Supercluster.AnyProps>[]
  >([]);

  // Initialize the supercluster
  const cluster = new Supercluster({
    log: true,
    radius: 40,
    maxZoom: 16,
  });
  // console.log(clusters);

  // Load the points into the cluster
  useEffect(() => {
    if (!coordinates?.length || !mapRef.current) return;
    const points = coordinates.map((coord, id) => {
      const [long, lat] = coord.split(",");
      return {
        type: "Feature",
        properties: { cluster: false, id },
        geometry: {
          type: "Point",
          coordinates: [Number(long), Number(lat)],
        },
      } as Supercluster.PointFeature<Supercluster.AnyProps>;
    });
    cluster.load(points);
  }, [coordinates]);

  // Function to estimate the zoom level based on latitude delta
  const getZoomLevel = (latitudeDelta) => {
    const angle = latitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  };

  // Render the markers and clusters
  const renderMarkers = () => {
    return clusters.map((feature, index) => {
      const coord = {
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      };

      if (feature.properties.cluster) {
        return (
          <Marker
            key={`cluster-${index}`}
            coordinate={coord}
            title={`Cluster of ${feature.properties.point_count} items`}
          />
        );
      }

      return (
        <Marker key={`marker-${feature.properties.id}`} coordinate={coord} />
      );
    });
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      // Function to update clusters based on current map view
      onRegionChangeComplete={(region) => {
        const zoom = getZoomLevel(region.latitudeDelta);
        const bbox = [
          region.longitude - region.longitudeDelta / 2, // westLng - min lng
          region.latitude - region.latitudeDelta / 2, // southLat - min lat
          region.longitude + region.longitudeDelta / 2, // eastLng - max lng
          region.latitude + region.latitudeDelta / 2, // northLat - max lat
        ] as [number, number, number, number];

        try {
          const newClusters = cluster.getClusters(bbox, zoom);
          console.log("SUCCESS", zoom, bbox);

          setClusters(newClusters);
        } catch (error) {
          console.log("FAIL", zoom, bbox);
          console.log(error);
        }
      }}
    >
      {renderMarkers()}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapComponent;
