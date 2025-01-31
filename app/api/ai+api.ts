import { openai } from "@ai-sdk/openai";
import { LangChainAdapter, streamText } from "ai";
import { Client, StreamEvent } from "@langchain/langgraph-sdk";

const langgraphClient = new Client({
  apiUrl: "http://localhost:7777",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const thread = await langgraphClient.threads.create();

  const langgraphStream: AsyncGenerator<{
    event: StreamEvent;
    data: any;
  }> = langgraphClient.runs.stream(
    thread.thread_id,
    "0ffad589-644a-42d1-a028-e5ee41ec6958",
    {
      input: { messages },
      streamMode: "updates",
    }
  );

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of langgraphStream) {
          console.log(JSON.stringify(event, null, 2));
          if (event.event === "updates")
            controller.enqueue(event.data.callModel.messages[0].content);
        }
      } catch (error) {
        console.error("Stream error:", error);
      } finally {
        controller.close();
      }
    },
  });

  return LangChainAdapter.toDataStreamResponse(stream);

  // const llm = streamText({
  //   model: openai("gpt-4o-mini"),
  //   system: "You are a helpful assistant.",
  //   messages,
  // });

  // return llm.toDataStreamResponse();
}
