import {
  Badge,
  BadgeText,
  Box,
  Center,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Callout, Circle, Marker, Region } from "react-native-maps";
import Supercluster from "supercluster";

const Map = ({ coordinates }: { coordinates?: string[] }) => {
  const mapRef = useRef(null);
  const [clusters, setClusters] = useState<
    Supercluster.PointFeature<Supercluster.AnyProps>[]
  >([]);

  // Initialize the supercluster
  const cluster = new Supercluster({
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
          coordinates: [Number(lat), Number(long)],
        },
      } as Supercluster.PointFeature<Supercluster.AnyProps>;
    });
    cluster.load(points);
  }, [coordinates]);

  // Function to estimate the zoom level based on latitude delta
  const getZoomLevel = (latitudeDelta: number) => {
    const angle = latitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  };

  const onRegionChange = useCallback((region: Region) => {
    const zoom = getZoomLevel(region.latitudeDelta);
    const bbox = [
      region.longitude - region.longitudeDelta / 2, // westLng - min lng
      region.latitude - region.latitudeDelta / 2, // southLat - min lat
      region.longitude + region.longitudeDelta / 2, // eastLng - max lng
      region.latitude + region.latitudeDelta / 2, // northLat - max lat
    ] as [number, number, number, number];
    const newClusters = cluster.getClusters(bbox, zoom);
    setClusters(newClusters);
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      onRegionChangeComplete={onRegionChange}
    >
      {clusters.map((feature, index) => {
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
            >
              <Box
                aspectRatio={1}
                zIndex={99}
                p="$1"
                borderRadius="$2xl"
                bgColor="$fuchsia400"
              >
                <Center>
                  <Text color="$white">{feature.properties.point_count}</Text>
                </Center>
              </Box>
            </Marker>
          );
        }

        return (
          <Marker key={`marker-${feature.properties.id}`} coordinate={coord}>
            <Callout
              onPress={() => {
                console.log("asdsad");
              }}
              tooltip
            >
              <Box bgColor="white" p="$4">
                <Text>Cluster Info</Text>
                <Text>Items: {feature.properties.point_count}</Text>
              </Box>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
