import {
  Button,
  Box,
  ICustomConfig,
  Text,
  useStyled,
} from "@gluestack-ui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import ListOfAttestations from "../../lib/components/ListOfAttestations";
import { match } from "ts-pattern";
import { Link } from "expo-router";
import type { AttestItem } from "../../utils/types";

const QRScannerScreen = () => {
  const theme: { config: ICustomConfig } = useStyled();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedAddress, setScannedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [attestItem, setAttestItem] = useState<AttestItem>();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleConfirm = () => {
    setAddress(scannedAddress);
  };

  // Ethereum address validation
  const isValidEthereumAddress = (address: string) => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Box flex={1}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={({ type, data }) => {
          if (isValidEthereumAddress(data)) {
            setScannedAddress(data);
            setIsBottomSheetVisible(true);
            bottomSheetRef.current?.expand();
          } else {
            console.log("Scanned data is not a valid Ethereum address");
          }
        }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      />
      {isBottomSheetVisible && (
        <BottomSheet
          backgroundStyle={{
            backgroundColor: theme.config.tokens.colors.coolGray100,
          }}
          ref={bottomSheetRef}
          snapPoints={["50%", "75%"]}
          enablePanDownToClose={true}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <Box bg="$coolGray100" flex={1}>
            {match(!!address)
              .with(true, () => (
                <Box flex={1}>
                  <ListOfAttestations
                    onPressItem={(attestItem) => {
                      setAttestItem(attestItem);
                    }}
                  />
                  {!!attestItem && (
                    <Link
                      href={{
                        params: {
                          address,
                          ...attestItem,
                        },
                        pathname: "/confirmAttest",
                      }}
                      asChild
                    >
                      <Button
                        left="30%"
                        bottom="$4"
                        position="absolute"
                        bg="$backgroundDark950"
                      >
                        <Text color="white">Create Attestation</Text>
                      </Button>
                    </Link>
                  )}
                </Box>
              ))
              .otherwise(() => (
                <Box style={styles.contentContainer}>
                  <Text bold>Scanned Ethereum Address:</Text>
                  <Text>{scannedAddress}</Text>
                  <Button onPress={handleConfirm}>
                    <Text color="white">Confirm Address</Text>
                  </Button>
                </Box>
              ))}
          </Box>
        </BottomSheet>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QRScannerScreen;
