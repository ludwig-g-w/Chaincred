import MainButton from "@components/MainButton";
import ReviewComponent from "@components/Rating";
import MyToast from "@components/Toast";
import {
  Box,
  ICustomConfig,
  Text,
  Textarea,
  TextareaInput,
  VStack,
  useStyled,
  useToast,
} from "@gluestack-ui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSigner } from "@thirdweb-dev/react-native";
import { createReviewAttestation } from "@utils/eas";
import { shortenAddress } from "@utils/index";

import { CameraView, Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";
import * as WebBrowser from "expo-web-browser";
import * as Typo from "@lib/components/ui/typography";
const ScanScreen = () => {
  const theme: {
    config: ICustomConfig;
  } = useStyled();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [scannedAddress, setScannedAddress] = useState("");
  const [rating, setRating] = useState(0);
  const [sControl, setSControl] = useState("Review");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [comment, setComment] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const signer = useSigner();
  const toast = useToast();

  const handleSubmitReview = async () => {
    if (!signer) {
      toast.show({
        duration: 6_000,
        placement: "top",
        render: () => (
          <MyToast
            action="warning"
            variant="solid"
            title="Connect to your wallet"
            description="Button is in the top right corner"
          />
        ),
      });
    }
    invariant(signer || scannedAddress || rating || comment, " Missing input");
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
        render: () => (
          <MyToast
            onPress={() => {
              WebBrowser.openBrowserAsync(
                `https://sepolia.easscan.org/attestation/view/${id}`
              );
            }}
            action="success"
            variant="solid"
            title="Review sent!"
            description="check it on EAS here"
            id={id}
          />
        ),
      });
      setIsBottomSheetVisible(false);
    } catch (error) {
      toast.show({
        duration: 10_000,
        placement: "top",
        render: () => (
          <MyToast
            action="error"
            variant="solid"
            title="Error occurred!"
            description="Make sure you have some funds on your account"
          />
        ),
      });
      console.log(error);
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

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // Ethereum address validation
  const isValidEthereumAddress = (address: string) => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  };
  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Typo.H3>Requesting for camera permission</Typo.H3>;
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Typo.H3>No access to camera</Typo.H3>;
      </View>
    );
  }
  return (
    <Box flex={1}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={({ type, data }) => {
          if (isValidEthereumAddress(data)) {
            setScannedAddress(data);
            setIsBottomSheetVisible(true);
            bottomSheetRef.current?.expand();
          } else {
            console.log("Scanned data is not a valid Ethereum address");
          }
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        autofocus="on"
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
              {match(sControl)
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
