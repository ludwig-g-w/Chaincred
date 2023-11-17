import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Camera } from "expo-camera";
import BottomSheet from "@gorhom/bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box, FormControl, Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";

const QRScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedAddress, setScannedAddress] = useState("");
  const [address, setAddress] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (isValidEthereumAddress(data)) {
      setScannedAddress(data);
      bottomSheetRef.current?.expand();
    } else {
      // Handle invalid Ethereum address
      console.log("Scanned data is not a valid Ethereum address");
    }
  };

  const handleConfirm = () => {
    setAddress(scannedAddress);
    bottomSheetRef.current?.close();
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
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          <Text>Scanned Ethereum Address:</Text>
          <Text>{scannedAddress}</Text>
          <Button title="Confirm Address" onPress={handleConfirm} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
