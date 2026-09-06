import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Recarrega o Radar sob demanda.
 *
 * Chamado pelo cron da Vercel (ver vercel.json — 3x ao dia) e utilizável
 * manualmente. Em produção a Vercel envia o header `Authorization: Bearer
 * $CRON_SECRET` quando a variável existe; se ela não estiver definida, só
 * aceitamos a chamada quando vier do próprio cron da Vercel.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const isVercelCron = request.headers.get("user-agent")?.includes("vercel-cron");

  if (secret) {
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "não autorizado" }, { status: 401 });
    }
  } else if (!isVercelCron && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "não autorizado" }, { status: 401 });
  }

  revalidatePath("/radar");
  revalidatePath("/");

  return NextResponse.json({
    revalidated: ["/", "/radar"],
    at: new Date().toISOString(),
  });
}
