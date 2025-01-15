
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
    - Read DATA FROM await req.text()
    ``` DATA STRUCTURE
        token=cndacsadc11&
        team_id=cndadscsadc11&
        team_domain=cn435fdacsadc11&
        channel_id=sdcndacsadc11&
        channel_name=all-tasks&
        user_id=sadf89VCEU3C&
        user_name=user1&
        command=%2Fadd-task&
        text=first text&
        api_app_id=dsdfff&
        is_enterprise_install=false&
        response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2hTgdNLJ1R04%2F1335320793642%2FvabafdkExQViUzTvasvafdasK8oiV&
        trigger_id=2222.8243544698059009.vsfnkvsk43432k3k234253.
    ```
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
    - create a custome slack app
        - go to slack app developer dashboard
            ```
                https://api.slack.com/apps
            ```
        - create new app
        - give name to your app
        - choose a workspace
        - hit enter
        - Enable Required Permissions
            - Under the OAuth & Permissions section, add the following scopes under Bot Token Scopes:
            ```
                chat:write: Allows your app to send messages to channels and users.
                commands: Enables your app to handle slash commands.
                incoming-webhook: Allows your app to post messages automatically when tasks are created or updated
            ```
        - Set Up Slash Commands
            - Go to the Slash Commands section and click "Create New Command".
            ``` 
                Define the command (e.g., /addtask) and set the request URL to the endpoint of your backend (Supabase function or API endpoint).
                Provide a short description and usage hint for the command.
            ```
        - Set Up Incoming Webhooks
            - Under Incoming Webhooks, click "Activate Incoming Webhooks".
            ```
                Click "Add New Webhook to Workspace" and select the channel where you want task notifications to appear.
                Install the App to Your Workspace
            ```
        - Once all permissions are set, go to the Install App section and click "Install to Workspace".
            ```
                Authorize the app in the selected workspace.
                Store OAuth Token and Webhook URL
            ```

        - NOTES - 
            - After installing, Slack will generate an OAuth access token. Save this token securely, as it will be used to authenticate API requests.
            - If you're using webhooks, also save the Webhook URL.