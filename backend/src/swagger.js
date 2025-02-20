import swaggerAutogen from "swagger-autogen";
import { writeFileSync } from "fs"; // ✅ Ensure we write the output manually

const doc = {
  info: {
    title: "My API",
    description: "Automatically generated Swagger documentation",
    version: "1.0.0",
  },
  host: "localhost:8000", // Change to your server URL
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter the token with 'Bearer ' prefix (e.g., 'Bearer xyz123')",
    },
  },
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/routes/userRoutes.js", "./src/routes/tasksRoutes.js"]; // Add all your route files

swaggerAutogen()(outputFile, endpointsFiles, doc)
  .then(({ data }) => {
    // ✅ Write JSON manually (avoids import errors)
    writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log("✅ Swagger JSON file generated successfully!");
  })
  .catch((error) => {
    console.error("❌ Error generating Swagger JSON:", error);
  });
