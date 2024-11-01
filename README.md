# Ollama Tools Demo

A demonstration project showing how to use Ollama with function calling
capabilities to create an AI assistant that can handle weather queries and
location lookups.

## Features

- Weather queries by city name
- Weather queries by latitude/longitude coordinates
- Location lookup from coordinates
- Direct answers for general knowledge questions
- Type-safe function calling using Zod schemas
- Integration with OpenStreetMap and Open-Meteo APIs

## Prerequisites

- [Deno](https://deno.com/) installed on your system
- [Ollama](https://ollama.ai/) installed and running locally
- Mistral model pulled (`ollama pull mistral`)

## Installation

1. Clone this repository
2. Make sure you have Deno installed
3. Install dependencies:

```bash
deno cache main.ts
```

## Usage

Run the development server:

```bash
deno task dev
```

The demo includes several example queries:

- Weather lookup by city name
- Weather lookup by coordinates
- Location lookup by coordinates
- General knowledge questions

## Project Structure

- `main.ts` - Main application entry point
- `tools.ts` - Tool definitions and implementations
- `types.ts` - TypeScript type definitions and Zod schemas
- `prompts.ts` - System prompt template

## API Integrations

- OpenStreetMap (Nominatim) for geocoding
- Open-Meteo for weather data

## Example Output

```typescript
// Weather query by city
await promptandanswer("What is the weather in London?");

// Weather query by coordinates
await promptandanswer("What is the weather at 41.881832, -87.640406?");

// General knowledge query
await promptandanswer("Who is the current ceo of tesla?");

// Location lookup
await promptandanswer("What is located at 41.881832, -87.640406?");
```

## License

MIT

## Contributing

Feel free to submit issues and pull requests.

## Notes

- This is a demonstration project showing how to implement function calling with
  Ollama
- The project uses Deno for TypeScript runtime
- All API calls are made to free, rate-limited services
