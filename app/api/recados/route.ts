import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RedisResponse<T> = {
  result?: T;
  error?: string;
};

type GuestMessage = {
  id: string;
  name: string;
  relation: string;
  message: string;
  signature?: string;
  createdAt: string;
};

const RECADO_KEY = "fabio-mariana:recados";
const MAX_NAME_LENGTH = 80;
const MAX_RELATION_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 700;
const MAX_SIGNATURE_LENGTH = 140000;

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  return { url, token };
}

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanSignature(value: unknown) {
  const signature = String(value ?? "").trim();

  if (!signature) return "";
  if (!signature.startsWith("data:image/png;base64,")) return "";

  return signature.slice(0, MAX_SIGNATURE_LENGTH);
}

async function redisCommand<T>(command: unknown[]) {
  const config = redisConfig();

  if (!config) {
    throw new Error("Redis is not configured");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  });

  const payload = (await response.json()) as RedisResponse<T>;

  if (!response.ok || payload.error) {
    throw new Error(payload.error ?? "Redis request failed");
  }

  return payload.result as T;
}

export async function GET() {
  if (!redisConfig()) {
    return NextResponse.json({ configured: false, messages: [] });
  }

  const storedMessages = await redisCommand<string[]>(["LRANGE", RECADO_KEY, 0, 99]);
  const messages = storedMessages
    .map((item) => {
      try {
        return JSON.parse(item) as GuestMessage;
      } catch {
        return null;
      }
    })
    .filter((item): item is GuestMessage => Boolean(item));

  return NextResponse.json({ configured: true, messages });
}

export async function POST(request: Request) {
  if (!redisConfig()) {
    return NextResponse.json(
      {
        error: "O mural de recados ainda precisa das variáveis do Upstash Redis no Vercel."
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as Partial<GuestMessage> | null;
  const name = cleanText(body?.name, MAX_NAME_LENGTH);
  const relation = cleanText(body?.relation, MAX_RELATION_LENGTH);
  const message = cleanText(body?.message, MAX_MESSAGE_LENGTH);
  const signature = cleanSignature(body?.signature);

  if (!message) {
    return NextResponse.json({ error: "Mensagem obrigatória." }, { status: 400 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Assinatura obrigatória." }, { status: 400 });
  }

  const guestMessage: GuestMessage = {
    id: crypto.randomUUID(),
    name: name || "Assinatura manual",
    relation,
    message,
    signature,
    createdAt: new Date().toISOString()
  };

  await redisCommand<number>(["LPUSH", RECADO_KEY, JSON.stringify(guestMessage)]);
  await redisCommand<number>(["LTRIM", RECADO_KEY, 0, 99]);

  return NextResponse.json({ message: guestMessage }, { status: 201 });
}
