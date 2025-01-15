
- INTEGRATE SLACK WITH SUPABASE EDGE FUNCTIONS

# SUPABASE
    - intialize supabase in local system
    ```
        npx supabase init
    ```
    - create an function on same path
    ```
        npx supabase functions new functionname
    ```
    - create or update the function
    ```
        \supabase\functions\functionname\index.ts
    ```
    - Read DATA FROM await req.json()
     ```body: {
                    update_id: 372379775,
                    message: {
                        message_id: 8,
                        from: {
                            id: 1812288800,
                            is_bot: false,
                            first_name: "someOne",
                            language_code: "en"
                        },
                        chat: { id: 1560388800, first_name: "someOne", type: "private" },
                        date: 173635464240752,
                        edit_date: 175408263454,
                        text: "/task checking test",
                        entities: [ { offset: 0, length: 12, type: "bot_command" } ]
                    }
        ```}
    - save the function
    - deploy function on supabase(it need docker so it will automatically generate an image and deploy on supabase).
        ```
            npx supabase functions deploy functionname --project-ref opytrlntutcndfcevvfv
        ```
        - opytrlntutcndfcevvfv (project id) - inside settings you can find projectid
    - open supabase app
        - go to edge function 
        - you can see your created function


# SLACK 
    - create a custome telegram bot
        - open telegram app
        - search for BotFather and start the bot
            ```
            /start
            ```
        - choose new bot
            ```
            /newbot
            ```
        - name your bot
        - set commands
            ```
                /setcommands
            ```
            ```
                something - some desc
            ```
        - create a webhook
            ```
                const botToken = '2435949548:dsjkdfsfkjjkgjdkkjjejdndndh';
                const edgeFunctionUrl = 'https://projectID.supabase.co/functions/v1/slack-handler';
                console.log("calling:");
                fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
                method: 'POST',
                body: new URLSearchParams({
                    url: edgeFunctionUrl
                })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Webhook set:', data);
                })
                .catch(error => {
                    console.error('Error setting webhook:', error);
                });
            ```