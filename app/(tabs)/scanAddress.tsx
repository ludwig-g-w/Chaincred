import { Textarea, TextareaInput, useToast } from "@gluestack-ui/themed";
import ListOfAttestations from "@components/ListOfAttestations";
import MainButton from "@components/MainButton";
import ReviewComponent from "@components/Rating";
import MyToast from "@components/Toast";
import {
  Box,
  ICustomConfig,
  Text,
  VStack,
  useStyled,
} from "@gluestack-ui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSigner } from "@thirdweb-dev/react-native";
import { createReviewAttestation } from "@utils/eas";
import { shortenAddress } from "@utils/index";
import type { AttestItem } from "@utils/types";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";

const ScanScreen = () => {
  const theme: {
    config: ICustomConfig;
  } = useStyled();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [scannedAddress, setScannedAddress] = useState("");
  const [attestItem, setAttestItem] = useState<AttestItem>();
  const [rating, setRating] = useState(0);
  const [sControl, setSControl] = useState("Review");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [comment, setComment] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const signer = useSigner();
  const toast = useToast();

  const handleSubmitReview = async () => {
    invariant(scannedAddress || rating || comment, " Missing input");
    setLoading(true);
    try {
      const id = await createReviewAttestation({
        address: scannedAddress,
        rating,
        comment,
        signer,
      });
      toast.show({
        duration: 3_000,
        placement: "top",
        render: () => <MyToast description={`ID: ${id}`} />,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Additional actions based on rating can be added here
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
            backgroundColor: theme.config.tokens.colors.white,
          }}
          ref={bottomSheetRef}
          keyboardBehavior="extend"
          snapPoints={["80%"]}
          enablePanDownToClose={true}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <KeyboardAwareScrollView>
            <VStack p="$4">
              <Text size="lg">
                Scanned Ethereum Address:
                <Text size="xl" bold color="$purple600">
                  {shortenAddress(scannedAddress)}
                </Text>
              </Text>
              <Text mb="$2" mt="$4" size="xl" bold>
                I want to register a:
              </Text>
              <SegmentedControl
                onValueChange={setSControl}
                selectedIndex={sControl === "Action" ? 0 : 1}
                activeFontStyle={{
                  color: theme.config.tokens.colors.textLight800,
                  fontSize: 18,
                }}
                fontStyle={{
                  color: "white",
                  fontSize: 18,
                }}
                style={{
                  height: 36,
                  backgroundColor:
                    theme.config.tokens.colors.backgroundLight800,
                  borderRadius: 19,
                  marginBottom: 12,
                }}
                tabStyle={{
                  borderRadius: 20,
                }}
                values={["Action", "Review"] as const}
              />

              {match(sControl)
                .with("Action", () => (
                  <ListOfAttestations
                    onPressItem={(attestItem) => {
                      setAttestItem(attestItem);
                    }}
                  />
                ))
                .with("Review", () => (
                  <>
                    <ReviewComponent onRatingChange={handleRatingChange} />
                    <Textarea p="$1" my="$4" rounded="$lg" bg="$blueGray100">
                      <TextareaInput
                        onChangeText={setComment}
                        returnKeyType="default"
                        placeholder="Make a comment..."
                      />
                    </Textarea>

                    <MainButton onPress={handleSubmitReview} {...{ loading }}>
                      Confirm
                    </MainButton>
                  </>
                ))
                .run()}
            </VStack>
          </KeyboardAwareScrollView>
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
export default ScanScreen;
