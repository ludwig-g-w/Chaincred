import { View, Pressable } from "react-native";
import { Image } from "expo-image";
import { NWSymbolView } from "@lib/components/nativeWindInterop";
import * as Typo from "@lib/components/ui/typography";
import { useColorScheme } from "@lib/useColorScheme";
import { NAV_THEME } from "@lib/constants";
export default function ImageUploadArea({
  img,
  onPress,
}: {
  img?: string;
  onPress: () => void;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  return (
    <Pressable onPress={onPress}>
      <View className="bg-background rounded-full h-[180] aspect-square justify-center  border-dashed border-2 border-secondary">
        {img ? (
          <Image
            contentFit="cover"
            style={{
              left: 3,
              aspectRatio: 1,
              height: 170,
              borderRadius: 200,
            }}
            source={img}
          />
        ) : (
          <View className="justify-center items-center">
            <NWSymbolView
              name="paperclip"
              tintColor={theme.secondary}
              className="h-12 aspect-square"
            />
            <Typo.Large className="text-center mt-4">Select image</Typo.Large>
          </View>
        )}
      </View>
    </Pressable>
  );
}
