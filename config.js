import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from the project's root
dotenv.config({ path: path.resolve(__dirname, ".env") });
