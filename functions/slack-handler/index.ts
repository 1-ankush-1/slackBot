// Import Supabase client
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client with environment variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

console.log("Telegram handler function started.");

const botToken = Deno.env.get("BOT_TOKEN") ?? "";

Deno.serve(async (req) => {
  const body = await req.json(); // Fully read the request body first
  console.log("Incoming message body:", body);
  handleTelegramRequest(body);    // Process the request asynchronously
  return new Response("OK");      // Immediately return 200 OK - because webhook call constantly till it gets a response
});

async function handleTelegramRequest(body) {
  try {
    const message = body?.message;

    if (!message || !message.text) {
      console.error("Invalid request: No message text found");
      return;
    }

    // Extract the command and actual message using the entities array
    const commandEntity = message.entities?.find((e) => e.type === "bot_command");
    if (!commandEntity) {
      console.warn("No bot command found in message");
      await respondToTelegram(message.chat.id, "Invalid command. Please try again.");
      return;
    }

    const command = message.text.slice(
      commandEntity.offset,
      commandEntity.offset + commandEntity.length
    );
    
    const actualMsg = message.text.slice(commandEntity.offset + commandEntity.length).trim();

    if (command === "/create" && actualMsg) 
      {
      // Insert task into Supabase
      const { error } = await supabase
      .from("tasks")
      .insert([{ description: actualMsg }]);

      if (error) {
        console.error("Error inserting task into Supabase:", error);
        await respondToTelegram(message.chat.id, "Failed to add the task. Please try again.");
        return;
      }

      await respondToTelegram(message.chat.id, `Task added: ${actualMsg}`);
    } else {
      console.warn("Unsupported or empty command");
      await respondToTelegram(message.chat.id, "Invalid command. Supported command: /create <task>");
    }
  } catch (error) {
    if (error.name === "Interrupted") {
      console.error("Request interrupted or canceled:", error);
    } else {
      console.error("Error handling Telegram request:", error);
    }
  }
}

// Helper function to send a response to Telegram
async function respondToTelegram(chatId, text) {
  const telegramResponse = {
    method: "sendMessage",
    chat_id: chatId,
    text: text,
  };

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(telegramResponse),
  });
}