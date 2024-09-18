import { View, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { NWIcon } from "@lib/components/nativeWindInterop";
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
            cachePolicy={"none"}
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
            <NWIcon
              name="paperclip"
              tintColor={theme.secondary}
              className="h-12 aspect-square"
              color={theme.secondary}
              size={Platform.OS === "android" ? 24 : 32}
            />
            <Typo.Large className="text-center mt-4">Select image</Typo.Large>
          </View>
        )}
      </View>
    </Pressable>
  );
}
