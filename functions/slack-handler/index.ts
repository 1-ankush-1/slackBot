// Import Supabase client
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client with environment variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",    //AUTOMATICALLY READ FROM SUPABASE DB
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

console.log("Slack handler function started.");

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Parse the raw form-encoded body
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);

    // Extract necessary fields from Slack payload
    const command = params.get("command"); // Should be "/add-task"
    const text = params.get("text"); // Task description
    const user_name = params.get("user_name"); // User who issued the command

    // Validate the incoming data
    if (command !== "/add-task" || !text) {
      return new Response("Invalid command or missing task description", { status: 400 });
    }

    // Insert the task into the 'tasks' table
    const { error } = await supabase
      .from("tasks")
      .insert([{ description: text, created_by: user_name }]);

    if (error) {
      console.error("Error inserting task:", error);
      return new Response("Failed to create task", { status: 500 });
    }

    // Respond to Slack with a success message
    return new Response(
      JSON.stringify({ text: `Task added successfully: "${text}" by ${user_name}` }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error handling Slack request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
