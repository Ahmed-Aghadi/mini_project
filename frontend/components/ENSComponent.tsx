"use client";
import { SSX } from "@spruceid/ssx";
import { useCallback, useEffect, useState } from "react";
import KeplerStorageComponent from "./KeplerStorageComponent";
import RebaseCredentialComponent from "./RebaseCredentialComponent";
import SpruceKitCredentialComponent from "./SpruceKitCredentialComponent";
import { ethers } from "ethers";

type Design = { label: string; design: string };
type Designs = Design[];

const ENSComponent = ({
  unityProvider,
  isLoaded,
  addEventListener,
  removeEventListener,
  sendMessage,
}: {
  unityProvider: any;
  isLoaded: boolean;
  addEventListener: any;
  removeEventListener: any;
  sendMessage: any;
}) => {
  const getENSDetails = useCallback(
    async (address: string) => {
      if (!address) {
        return;
      }

      let ensName = await ethers
        .getDefaultProvider(process.env.NEXT_PUBLIC_MAINNET_PROVIDER_URL)
        .lookupAddress(address);
      let ensAvatarUrl: string | null = "";
      if (!ensName) {
        ensName = await ethers
          .getDefaultProvider(process.env.NEXT_PUBLIC_GOERLI_PROVIDER_URL)
          .lookupAddress(address);
        if (ensName) {
          ensAvatarUrl = await ethers
            .getDefaultProvider(process.env.NEXT_PUBLIC_GOERLI_PROVIDER_URL)
            .getAvatar(address);
        }
      } else {
        ensAvatarUrl = await ethers
          .getDefaultProvider(process.env.NEXT_PUBLIC_MAINNET_PROVIDER_URL)
          .getAvatar(address);
      }
      if (!ensName) {
        ensName = address.slice(0, 6) + "..." + address.slice(-4);
      }
      if (!ensAvatarUrl) {
        ensAvatarUrl =
          "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png";
      }

      console.log("ens", {
        ensName,
        ensAvatarUrl,
      });

      sendMessage(
        "CanvasManager",
        "SetEnsDetails",
        JSON.stringify({
          ensName,
          ensAvatarUrl,
        })
      );
    },
    [unityProvider, isLoaded]
  );

  useEffect(() => {
    // requestFullscreen(true);
    //@ts-ignore
    addEventListener("GetENS", getENSDetails);
    return () => {
      //@ts-ignore
      removeEventListener("GetENS", getENSDetails);
    };
  }, [
    addEventListener,
    removeEventListener,
    getENSDetails,
    unityProvider,
    isLoaded,
  ]);

  return <></>;
};

export default ENSComponent;
