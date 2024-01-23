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
      borderRadius="$full"
      h={180}
      borderWidth={2}
      aspectRatio={1}
      borderColor="$coolGray400"
      borderStyle="dashed"
      justifyContent="center"
    >
      {img ? (
        <Image
          contentFit="cover"
          style={{
            aspectRatio: 1,
            height: 170,
            borderRadius: 200,
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
