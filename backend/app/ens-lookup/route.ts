import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  if (!address) {
    return NextResponse.json(
      { error: "Missing required parameters 'address'" },
      { status: 400 }
    );
  }

  if (ethers.utils.isAddress(address) === false) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }
  let ensName = await ethers
    .getDefaultProvider(process.env.MAINNET_PROVIDER_URL)
    .lookupAddress(address);
  let ensAvatarUrl: string | null = "";
  if (!ensName) {
    ensName = await ethers
      .getDefaultProvider(process.env.GOERLI_PROVIDER_URL)
      .lookupAddress(address);
    if (ensName) {
      ensAvatarUrl = await ethers
        .getDefaultProvider(process.env.GOERLI_PROVIDER_URL)
        .getAvatar(address);
    }
  } else {
    ensAvatarUrl = await ethers
      .getDefaultProvider(process.env.MAINNET_PROVIDER_URL)
      .getAvatar(address);
  }
  if (!ensName) {
    ensName = address;
  }
  if (!ensAvatarUrl) {
    ensAvatarUrl = "";
  }
  // return NextResponse.json({ res: res });
  return new Response(JSON.stringify({ ensName, ensAvatarUrl }), {
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
