import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") as `${string}.eth`;
  if (!name) {
    return NextResponse.json(
      { error: "Missing required parameters 'name'" },
      { status: 400 }
    );
  }
  let address = await ethers
    .getDefaultProvider(process.env.MAINNET_PROVIDER_URL)
    .resolveName(name);
  if (!address) {
    address = await ethers
      .getDefaultProvider(process.env.GOERLI_PROVIDER_URL)
      .resolveName(name);
  }
  if (!address) {
    address = name;
  }
  // return NextResponse.json({ res: res });
  return new Response(JSON.stringify({ address }), {
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
