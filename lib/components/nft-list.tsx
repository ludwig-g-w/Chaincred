import { Progress } from "@components/ui/progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";

// Mock NFT data
const NFTs = [
  {
    id: "1",
    name: "Cosmic Dreamer #1",
    creator: "CryptoArtist",
    progress: 0.7,
    price: "0.5 ETH",
    image:
      "https://api.a0.dev/assets/image?text=ethereal%20cosmic%20dream%20digital%20art%20nft&seed=1",
  },
  {
    id: "2",
    name: "Digital Soul #42",
    creator: "PixelMaster",
    progress: 0.4,
    price: "0.8 ETH",
    image:
      "https://api.a0.dev/assets/image?text=cyberpunk%20soul%20digital%20art%20nft&seed=2",
  },
  {
    id: "3",
    name: "Abstract Mind",
    creator: "ArtBlock",
    progress: 0.9,
    price: "1.2 ETH",
    image:
      "https://api.a0.dev/assets/image?text=abstract%20mindscape%20colorful%20nft&seed=3",
  },
  {
    id: "4",
    name: "Future Vision",
    creator: "Neo Artist",
    progress: 0.3,
    price: "0.6 ETH",
    image:
      "https://api.a0.dev/assets/image?text=futuristic%20vision%20art%20nft&seed=4",
  },
];

export default function NFTGalleryScreen() {
  const renderNFTCard = (nft: (typeof NFTs)[number]) => (
    <Pressable
      key={nft.id}
      className="flex-1 min-w-[40%] rounded"
      onPress={() => console.log(`Selected NFT: ${nft.name}`)}
    >
      <Image
        source={nft.image}
        contentFit="cover"
        placeholder={{ blurhash: "L5HqXs_N4=wb~qRkW=R*00oJ9F-p" }}
        style={{
          width: "100%",
          aspectRatio: 1,
          borderRadius: 8,
        }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        className="absolute bottom-0 left-0 right-0 h-1/2 p-3 justify-end"
      >
        <Text className="text-white text-base font-bold mb-1">{nft.name}</Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="account-circle"
            size={16}
            color="var(--foreground)"
          />
          <Text className="text-white text-xs ml-1 opacity-80">
            {nft.creator}
          </Text>
        </View>
      </LinearGradient>
      <View className="absolute bottom-0 left-0 right-0 bg-card p-3">
        <Progress value={nft.progress} className="h-2 rounded-full" />
        <View className="flex-row items-center mt-2">
          <MaterialCommunityIcons
            name="ethereum"
            size={16}
            color="var(--primary)"
          />
          <Text className="text-primary text-sm font-bold ml-1">
            {nft.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-muted">
      <View className="flex-row justify-between items-center p-4 bg-card border-b border-border">
        <Text className="text-2xl font-bold text-foreground">NFT Gallery</Text>
        <MaterialCommunityIcons
          name="filter-variant"
          size={24}
          color="var(--foreground)"
        />
      </View>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between gap-2 flex-wrap">
          {NFTs.map(renderNFTCard)}
        </View>
      </ScrollView>
    </View>
  );
}
