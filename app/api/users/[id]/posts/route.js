import { connectToDatabase } from "/utils/database";
import Prompt from "/models/prompt";

export const GET = async (req, { params }) => {
  try {
    console.log("Fetching all prompts", params);
    await connectToDatabase();
    const prompts = await Prompt.find({creator: params.id }).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch all prompts:", error);
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};