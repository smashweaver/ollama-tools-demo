import { z } from "zod";

export const ToolParameterSchema = z.object({
  type: z.string(),
  description: z.string(),
});

export const ToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.object({
    type: z.literal("object"),
    properties: z.record(ToolParameterSchema),
    required: z.array(z.string()),
  }),
});

export const FunctionCallSchema = z.object({
  name: z.union([
    z.literal("WeatherFromLocation"),
    z.literal("WeatherFromLatLon"),
    z.literal("LatLonToCity"),
    z.literal("DirectAnswer"),
  ]),
  arguments: z.object({}).passthrough(),
});

export type Tool = z.infer<typeof ToolSchema>;
// export type ToolParameter = z.infer<typeof ToolParameterSchema>;
export type FunctionCall = z.infer<typeof FunctionCallSchema>;

// For better type safety with arguments
export const WeatherFromLocationArgs = z.object({
  location: z.string(),
});

export const WeatherFromLatLonArgs = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const LatLonToCityArgs = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const DirectAnswerArgs = z.object({
  answer: z.string(),
});

export type Argument = z.infer<
  | typeof WeatherFromLocationArgs
  | typeof WeatherFromLatLonArgs
  | typeof LatLonToCityArgs
  | typeof DirectAnswerArgs
>;
