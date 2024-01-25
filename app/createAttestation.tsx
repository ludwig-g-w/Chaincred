import MainButton from "@components/MainButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "@utils/constants";
import type { AttestItem } from "@utils/types";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  const [toSubmit, setToSubmit] = useState<AttestItem>({
    title: "",
    description: "",
  });

  const createAttestation = async () => {
    try {
      const prev: AttestItem[] = JSON.parse(
        (await AsyncStorage.getItem(STORAGE_KEY)) ?? "[]"
      );
      await AsyncStorage.setItem(
        STORAGE_KEY,
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
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Box paddingHorizontal={"$4"} mt="$16" flex={1}>
        <Text bold size="2xl" mb={"$4"}>
          Create an Action
        </Text>
        <Text size="lg" mb={"$4"}>
          This can later given to other people to register attesting to
          something they have done
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
          <Input
            bg="$white"
            borderRadius="$lg"
            h="$12"
            borderWidth="$1"
            borderColor="$borderLight300"
          >
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
          <Textarea>
            <TextareaInput
              onChangeText={changeDesc}
              type="text"
              placeholder="Describe more in detail what this action actually represent"
            />
          </Textarea>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
          <MainButton mt="$8" onPress={createAttestation}>
            Create Action
          </MainButton>
        </FormControl>
      </Box>
    </KeyboardAwareScrollView>
  );
};
