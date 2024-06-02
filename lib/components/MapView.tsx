import { AvatarImage, ChevronRightIcon } from "@gluestack-ui/themed";
import { Avatar, Box, Center, HStack, Text } from "@gluestack-ui/themed";
import { Profile } from "@prisma/client";
import { router } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import Supercluster from "supercluster";

const Map = ({ profiles = [] }: { profiles: Profile[] }) => {
  const mapRef = useRef(null);
  const clusterRef = useRef(
    new Supercluster({
      radius: 40,
      maxZoom: 16,
    })
  );
  const [clusters, setClusters] = useState<
    Supercluster.PointFeature<Supercluster.AnyProps>[]
  >([]);

  // Load the points into the cluster
  useEffect(() => {
    if (!profiles?.length || !mapRef.current) return;
    const points = profiles
      .filter((p) => (p.location_coords?.length ?? 0) > 2)
      .map((p) => {
        const [lat, long] = p?.location_coords.split(",");
        return {
          type: "Feature",
          properties: {
            cluster: false,
            ...p,
          },
          geometry: {
            type: "Point",
            coordinates: [Number(long), Number(lat)],
          },
        } as Supercluster.PointFeature<Supercluster.AnyProps>;
      });
    if (points.length) {
      clusterRef.current.load(points);
    }
  }, [profiles]);

  // Function to estimate the zoom level based on latitude delta
  const getZoomLevel = (latitudeDelta: number) => {
    const angle = latitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  };

  const onRegionChange = useCallback((region: Region) => {
    const zoom = getZoomLevel(region.latitudeDelta);
    const bbox = [
      region.longitude - region.longitudeDelta / 2,
      region.latitude - region.latitudeDelta / 2,
      region.longitude + region.longitudeDelta / 2,
      region.latitude + region.latitudeDelta / 2,
    ] as [number, number, number, number];

    try {
      const newClusters = clusterRef.current.getClusters(bbox, zoom);
      setClusters(newClusters);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  const renderPoints = useMemo(
    () =>
      clusters.map((feature, index) => {
        const coord = {
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        };
        const profile = profiles.find(
          (p) => p.location_coords === `${coord.latitude},${coord.longitude}`
        );

        if (feature.properties.cluster) {
          return (
            <Marker
              key={`cluster-${index}`}
              coordinate={coord}
              title={`Cluster of ${feature.properties?.point_count} items`}
            >
              <Box
                aspectRatio={1}
                zIndex={99}
                p="$1"
                borderRadius="$2xl"
                bgColor="$fuchsia400"
              >
                <Center>
                  <Text color="$white">{feature.properties?.point_count}</Text>
                </Center>
              </Box>
            </Marker>
          );
        }
        return (
          <Marker key={`marker-${profile?.id}`} coordinate={coord}>
            <Callout
              onPress={() => {
                router.push(`/profiles/${profile?.address}`);
              }}
              tooltip
            >
              <HStack
                gap="$2"
                alignItems="center"
                rounded={"$lg"}
                bgColor="white"
                p="$4"
              >
                <Avatar size={"md"}>
                  <AvatarImage
                    alt="avatar"
                    source={{
                      uri: profile?.image_url,
                    }}
                  />
                </Avatar>
                <Text bold>{profile?.title}</Text>
                <ChevronRightIcon size="xl" />
              </HStack>
            </Callout>
          </Marker>
        );
      }),
    [clusters]
  );

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      onRegionChangeComplete={onRegionChange}
    >
      {renderPoints}
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
