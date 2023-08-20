import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const tokenSymbol = searchParams.get("tokenSymbol");
  if (!source || !destination || !tokenSymbol) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }
  const sdk = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });
  const res = await sdk.estimateGasFee(source, destination, tokenSymbol);
  // return NextResponse.json({ res: res });
  return new Response(JSON.stringify({ res: res }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, Authorization, X-Auth-Token, Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time",
    },
  });
}
