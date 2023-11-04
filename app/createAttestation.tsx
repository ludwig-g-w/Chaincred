import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  AddIcon,
  AlertCircleIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { AttestItem } from "../utils/types";
export default () => {
  const [toSubmit, setToSubmit] = useState<AttestItem>({
    title: "",
    description: "",
  });

  const createAttestation = async () => {
    try {
      const prev: AttestItem[] = JSON.parse(
        (await AsyncStorage.getItem("listOfAttestations")) ?? "[]"
      );
      await AsyncStorage.setItem(
        "listOfAttestations",
        JSON.stringify([...prev, toSubmit])
      );
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const changeTitle = (s: string) =>
    setToSubmit((prev) => ({
      ...prev,
      title: s,
    }));
  const changeDesc = (s: string) =>
    setToSubmit((prev) => ({
      ...prev,
      description: s,
    }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Link
        asChild
        style={{
          zIndex: 99,
          position: "absolute",
          top: 64,
          right: 24,
        }}
        href={{}}
        onPress={() => {
          router.back();
        }}
      >
        <FontAwesome size={28} name="toggle-off" />
      </Link>
      <Box paddingHorizontal={"$4"} mt="$16" flex={1}>
        <Text bold size="2xl" mb={"$4"}>
          Create an attestation
        </Text>
        <Text size="lg" mb={"$4"}>
          Cross pollination, create your interlinked rewards program
        </Text>
        <FormControl
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel mb="$1">
            <FormControlLabelText>Title</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              onChangeText={changeTitle}
              type="text"
              placeholder="Title"
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Must be at least 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Description</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              onChangeText={changeDesc}
              type="text"
              placeholder="Title"
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Must be at least 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
          <Button
            onPress={createAttestation}
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            bgColor="$darkBlue800"
          >
            <ButtonText>Add</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </FormControl>
      </Box>
    </SafeAreaView>
  );
};
