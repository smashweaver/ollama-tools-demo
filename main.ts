import ollama from "ollama";
import { executeFunction, toolsString } from "./tools.ts";
import { FunctionCallSchema } from "./types.ts";
import { createSystemPrompt } from "./prompts.ts";

const systemPrompt = createSystemPrompt(toolsString);
const promptandanswer = async (prompt: string) => {
  const response = await ollama.generate({
    model: "mistral",
    system: systemPrompt,
    prompt: prompt,
    stream: false,
    format: "json",
  });

  const tool = JSON.parse(response.response);
  const functionCall = FunctionCallSchema.parse(tool);
  const answer = await executeFunction(
    functionCall.name,
    functionCall.arguments,
  );
  console.log({ prompt, answer, tool: { ...functionCall } }, "\n");
};

if (import.meta.main) {
  await promptandanswer("What is the weather in London?");
  await promptandanswer("What is the weather at 41.881832, -87.640406?");
  await promptandanswer("Who is the current ceo of tesla?");
  await promptandanswer("What is located at 41.881832, -87.640406?");
}
