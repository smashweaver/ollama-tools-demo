import {
  Argument,
  DirectAnswerArgs,
  LatLonToCityArgs,
  Tool,
  ToolSchema,
  WeatherFromLatLonArgs,
  WeatherFromLocationArgs,
} from "./types.ts";

export const tools: Tool[] = [
  {
    name: "WeatherFromLocation",
    description: "Get the weather for a location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The location to get the weather for",
        },
      },
      required: ["location"],
    },
  },
  {
    name: "WeatherFromLatLon",
    description:
      "Get the weather for specific latitude and longitude coordinates",
    parameters: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "The latitude of the location",
        },
        longitude: {
          type: "number",
          description: "The longitude of the location",
        },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "LatLonToCity",
    description: "Get the city name for given coordinates",
    parameters: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "The latitude of the location",
        },
        longitude: {
          type: "number",
          description: "The longitude of the location",
        },
      },
      required: ["latitude", "longitude"],
    },
  },
];

// Validate tools against schema
tools.forEach((tool) => {
  ToolSchema.parse(tool);
});

export const toolsString = JSON.stringify({ tools }, null);

// tools implemntation
async function CityToLatLon(city: string) {
  const output = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${city}&format=json`,
  );
  const json = await output.json();
  return [json[0].lat, json[0].lon];
}

async function LatLonToCity(latitude: string, longitude: string) {
  const output = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
  );
  const json = await output.json();
  return json.display_name;
}

async function WeatherFromLatLon(latitude: string, longitude: string) {
  const output = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&forecast_days=1`,
  );

  const json = await output.json();
  const result = `${json.current.temperature_2m} degrees Fahrenheit`;
  return result;
}

async function WeatherFromLocation(location: string) {
  const latlon = await CityToLatLon(location);
  return await WeatherFromLatLon(latlon[0], latlon[1]);
}

export async function executeFunction(
  functionName: string,
  argumentsJson: Argument,
) {
  const args = argumentsJson;

  switch (functionName) {
    case "WeatherFromLocation": {
      const { location } = WeatherFromLocationArgs.parse(args);
      return await WeatherFromLocation(location);
    }
    case "WeatherFromLatLon": {
      const { latitude, longitude } = WeatherFromLatLonArgs.parse(args);
      return await WeatherFromLatLon(latitude.toString(), longitude.toString());
    }
    case "LatLonToCity": {
      const { latitude, longitude } = LatLonToCityArgs.parse(args);
      return await LatLonToCity(latitude.toString(), longitude.toString());
    }
    case "DirectAnswer": {
      return args.answer;
    }
  }
}
