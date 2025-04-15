import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const application_id = process.env.SENDBIRD_API_ID;
    const api_token = process.env.SENDBIRD_ACCESS_TOKEN;

    const { user_id, nickname, profile_url, userIds, title } = await req.json();

    if (!Array.isArray(userIds) || !userIds.every(id => typeof id === "string")) {
        return NextResponse.json(
            { message: "`userIds` must be an array of strings." },
            { status: 400 }
        );
    }
    try {
        // Step 1: Check if user exists
        const existingUserResponse = await fetch(
            `https://api-${application_id}.sendbird.com/v3/users/${user_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Api-Token": api_token as string,
                },
            }
        );

        const userResponseText = await existingUserResponse.text();
        let userData;

        try {
            userData = JSON.parse(userResponseText);
        } catch {
            throw new Error("Invalid JSON response from Sendbird");
        }

        // Step 2: Handle user already exists
        if (existingUserResponse.ok) {
            return NextResponse.json(
                { message: "User already exists", data: userData },
                { status: 200 }
            );
        }

        // Step 3: Handle 'User not found' (Sendbird returns 400 + code 400201)
        if (
            existingUserResponse.status === 400 &&
            userData.code === 400201
        ) {
            // Create user
            const createUserResponse = await fetch(
                `https://api-${application_id}.sendbird.com/v3/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Api-Token": api_token as string,
                    },
                    body: JSON.stringify({
                        user_id,
                        nickname,
                        profile_url,
                        issue_access_token: false,
                    }),
                }
            );

            const createdUser = await createUserResponse.json();

            if (!createUserResponse.ok) {
                throw new Error(createdUser.message || "Failed to create user");
            }

            // Create group chat after user creation
            const createChatResponse = await fetch(
                `https://api-${application_id}.sendbird.com/v3/group_channels`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Api-Token": api_token as string,
                    },
                    body: JSON.stringify({
                        user_ids: userIds,
                        is_distinct: true,
                        name: title,
                    }),
                }
            );

            const createInbox = await createChatResponse.json();

            if (!createChatResponse.ok) {
                throw new Error(createInbox.message || "Failed to create group chat");
            }

            return NextResponse.json(
                { message: "Chat created successfully", data: createInbox },
                { status: 201 }
            );
        }

        // Step 4: If none of the above, throw error
        throw new Error(userData.message || "Unexpected error while checking user existence");
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Failed to create user or chat",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 400 }
        );
    }
}
