import { connectToDatabase } from "/utils/database";
import Prompt from "/models/prompt";
export const POST = async (req) => {
  const { userId, prompt, tag, image } = await req.json();
  

  try {
    await connectToDatabase();
    const newPrompt = await Prompt({
      creator: userId,
      prompt,
      tag,
      image,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating prompt:", error);
    return new Response("Error creating prompt", { status: 500 });
  }
};
