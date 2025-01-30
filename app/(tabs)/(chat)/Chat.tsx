import * as Typo from "@components/ui/typography";
import { generateAPIUrl } from "@lib/utils";
import { useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import React from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Button } from "@components/ui/button";
import { NWIcon } from "@lib/components/nativeWindInterop";
import { match } from "ts-pattern";

export default function Chat() {
  const { messages, isLoading, handleSubmit, input, setInput, error } = useChat(
    {
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl("/api/ai"),
    }
  );

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {messages?.map((message) =>
          match(message.role)
            .with("user", () => (
              <View
                key={message.id}
                className="flex-grow-0 flex-row items-center  bg-primary rounded-lg p-4  rounded-br-none"
              >
                <Typo.P className="text-primary-foreground">
                  {message.content}
                </Typo.P>
                <NWIcon
                  name="ellipsis.bubble"
                  size={20}
                  className="text-foreground"
                />
              </View>
            ))
            .with("assistant", () => (
              <View key={message.id} className="flex-row justify-start mb-4">
                <View className="max-w-[80%] rounded-lg p-4 bg-card rounded-bl-none">
                  <Typo.P>{message.content}</Typo.P>
                </View>
              </View>
            ))
            .otherwise(() => null)
        )}

        {match(isLoading)
          .with(true, () => (
            <View className="flex-row items-center space-x-2 bg-muted rounded-lg p-3 w-24 h-12">
              <NWIcon
                name="ellipsis.bubble"
                size={20}
                className="text-foreground"
              />
              <Typo.Small>Typing...</Typo.Small>
            </View>
          ))
          .otherwise(() => null)}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-0 w-full bg-background border-t border-border pt-2"
      >
        <View className="flex-row items-center p-4 gap-2">
          <TextInput
            value={input}
            onChangeText={setInput}
            className="text-end flex-1 bg-card rounded-xl px-4 h-12 text-foreground border border-border "
            placeholder="Type your message..."
            placeholderTextColor="#64748b"
            multiline
            maxLength={2000}
          />
          <Button
            onPress={handleSubmit}
            className="bg-primary rounded-lg px-4 py-3"
            disabled={isLoading}
          >
            <NWIcon
              name="paperplane.fill"
              size={20}
              className="text-background"
            />
          </Button>
        </View>
      </KeyboardAvoidingView>

      {error && (
        <View className="bg-destructive p-3 m-4 rounded-lg">
          <Typo.Small className="text-destructive-foreground">
            Error: {error.message}
          </Typo.Small>
        </View>
      )}
    </View>
  );
}
