import MainButton from "@components/MainButton";
import ReviewComponent from "@components/Rating";
import MyToast from "@components/Toast";
import { Box, Textarea, TextareaInput, useToast } from "@gluestack-ui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import { createReviewAttestation } from "@utils/eas";
import { shortenAddress } from "@utils/index";
import { useActiveAccount } from "thirdweb/react";

import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import invariant from "tiny-invariant";

const ScanScreen = () => {
  const { isDarkColorScheme } = useColorScheme();
  const tTheme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [scannedAddress, setScannedAddress] = useState("");
  const [rating, setRating] = useState<number>();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [comment, setComment] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const account = useActiveAccount();
  const toast = useToast();

  const handleSubmitReview = async () => {
    try {
      invariant(scannedAddress && rating, " Missing input");
      setLoading(true);
      await createReviewAttestation({
        address: scannedAddress,
        rating,
        comment,
        account: account as any,
      });
      toast.show({
        duration: 3_000,
        placement: "top",
        render: () => (
          <MyToast
            action="success"
            variant="solid"
            title="Review sent!"
            description="You can check it in the history"
          />
        ),
      });
      setIsBottomSheetVisible(false);
    } catch (error) {
      toast.show({
        duration: 3_000,
        placement: "top",
        render: () => (
          <MyToast action="error" variant="solid" title="Error occurred!" />
        ),
      });
      console.log(error);
    } finally {
      setLoading(false);
      setIsBottomSheetVisible(false);
      setScannedAddress("");
      setRating(undefined);
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
        <Typo.H3>Requesting for camera permission</Typo.H3>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Typo.H3>No access to camera</Typo.H3>
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
            backgroundColor: tTheme.background,
          }}
          ref={bottomSheetRef}
          keyboardBehavior="extend"
          snapPoints={["80%"]}
          enablePanDownToClose={true}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <KeyboardAwareScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
            <Typo.Muted className="mb-4">
              Scanned Ethereum Address:{" "}
              <Typo.Large className="color-primary">
                {shortenAddress(scannedAddress)}
              </Typo.Large>
            </Typo.Muted>

            <ReviewComponent onRatingChange={handleRatingChange} />
            <Textarea
              p="$1"
              my="$4"
              rounded="$lg"
              bg={
                isDarkColorScheme ? "$backgroundDark800" : "$backgroundLight800"
              }
              borderColor={
                isDarkColorScheme ? "$borderDark200" : "$borderLight200"
              }
            >
              <TextareaInput
                onChangeText={setComment}
                returnKeyType="default"
                placeholder="Make a comment..."
                color={isDarkColorScheme ? "$textDark200" : "$textLight200"}
              />
            </Textarea>

            <MainButton onPress={handleSubmitReview} {...{ loading }}>
              Send review to EAS
            </MainButton>
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
