import { CreateOrUpdateUser } from "@/action/user/create-user";
import { env } from "@/env";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  if (!webhookSecret) {
    console.error("No webhook secret provided");
    return NextResponse.json({}, { status: 400 });
  }
  const payload = await request.json();

  const headersList = await headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  console.log("[WEB HOOK]", webhookSecret);
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;

  switch (eventType) {
    case "user.created": {
      await CreateOrUpdateUser({
        email: payload?.data?.email_addresses?.[0]?.email_address,
        first_name: payload?.data?.first_name,
        last_name: payload?.data?.last_name,
        profile_image_url: payload?.data?.profile_image_url,
        user_id: payload?.data?.id,
      })

      return NextResponse.json({ message: "User created" });
    }
    case "user.updated": {
      await CreateOrUpdateUser({
        email: payload?.data?.email_addresses?.[0]?.email_address,
        first_name: payload?.data?.first_name,
        last_name: payload?.data?.last_name,
        profile_image_url: payload?.data?.profile_image_url,
        user_id: payload?.data?.id,
      })
      return NextResponse.json({ message: "User updated" });
    }

    default: {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

  }
}
type EventType = "user.created" | "user.updated" | "*";

type Event = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, string | any>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
