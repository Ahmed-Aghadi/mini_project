import {
  AxelarQueryAPI,
  AxelarGMPRecoveryAPI,
  GMPStatusResponse,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txHash = searchParams.get("txHash");
  if (!txHash) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }
  const sdk = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
  });

  const txStatus: GMPStatusResponse = await sdk.queryTransactionStatus(txHash);
  return NextResponse.json({ txStatus: txStatus });
}
