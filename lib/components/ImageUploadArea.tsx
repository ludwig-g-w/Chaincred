import {
  VStack,
  HStack,
  Text,
  Button,
  Center,
  Icon,
  PaperclipIcon,
} from "@gluestack-ui/themed";
import { Image } from "expo-image";

export default function ImageUploadArea({
  img,
  onPress,
}: {
  img?: string;
  onPress: () => void;
}) {
  return (
    <Button
      onPress={onPress}
      bg="$coolGray100"
      borderRadius="$md"
      borderWidth={2}
      borderColor="$coolGray400"
      borderStyle="dashed"
      h={220}
      justifyContent="center"
    >
      {img ? (
        <Image
          contentFit="cover"
          style={{
            height: 210,
            width: "110%",
          }}
          source={img}
        />
      ) : (
        <Center>
          <Icon as={PaperclipIcon} size="xl" />
          <Text textAlign="center" mt="$4">
            Click and select image
          </Text>
        </Center>
      )}
    </Button>
  );
}
