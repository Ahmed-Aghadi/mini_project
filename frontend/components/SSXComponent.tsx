"use client";
import { SSX } from "@spruceid/ssx";
import { useCallback, useEffect, useState } from "react";
import KeplerStorageComponent from "./KeplerStorageComponent";
import RebaseCredentialComponent from "./RebaseCredentialComponent";
import SpruceKitCredentialComponent from "./SpruceKitCredentialComponent";

type Design = { label: string; design: string };
type Designs = Design[];

const SSXComponent = ({
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
  const [ssxProvider, setSSX] = useState<SSX | null>(null);

  // const [formattedData, setFormattedData] = useState<Designs>([]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   if (ssxProvider && !wasSet) {
  //     setWasSet(true);
  //   }
  //   if (wasSet && !ssxProvider) {
  //     ssxHandler();
  //   }
  // }, [wasSet, ssxProvider]);

  const getData = async () => {
    if (!ssxProvider) {
      console.log("no ssxProvider getData");
      return;
    }
    let { data } = await ssxProvider.storage.list();
    data = data.filter((d: string) => d.includes("/content/"));
    let datas = new Map();
    for (let i = 0; i < data.length; i++) {
      const contentName = data[i].replace("my-app/", "");
      const { data: data1 } = await ssxProvider.storage.get(contentName);
      const label = contentName.replace("content/", "");
      datas.set(label, data1);
      console.log(`${data1}`);
    }
    console.log("datas: ", datas);
    let formattedData: Designs = [];
    const keys = Array.from(datas.keys());
    for (let i = 0; i < keys.length; i++) {
      formattedData.push({
        label: keys[i],
        design: JSON.parse(datas.get(keys[i])),
      });
    }
    console.log("formattedData: ", formattedData);
    const formattedDataString = JSON.stringify(formattedData);
    console.log("formattedDataString: ", formattedDataString);
    return formattedData;
  };

  const saveDesign = useCallback(
    async (design: string) => {
      if (!ssxProvider) {
        console.log("no ssxProvider saveDesign");
        return;
      }
      const data: Design = JSON.parse(design);
      const label = data.label;
      const designString = JSON.stringify(data.design);
      const contentName = `content/${label}`;
      await ssxProvider.storage.put(contentName, designString);
    },
    [ssxProvider, unityProvider, isLoaded]
  );

  const ssxHandler = useCallback(async () => {
    if (ssxProvider) {
      console.log("ssxProvider already available ssxHandler");
      return;
    }
    console.log("signing in...");
    if (!process.env.NEXT_PUBLIC_API_LINK) {
      console.log("NEXT_PUBLIC_API_LINK not set");
      return;
    }
    const ssx = new SSX({
      providers: {
        server: {
          host: process.env.NEXT_PUBLIC_API_LINK,
        },
      },
      modules: {
        storage: {
          prefix: "my-app",
          hosts: ["https://kepler.spruceid.xyz"],
          autoCreateNewOrbit: true,
        },
        credentials: true,
      },
    });
    await ssx.signIn();
    setSSX(ssx);
  }, [ssxProvider, unityProvider, isLoaded]);

  const ssxLogoutHandler = async () => {
    ssxProvider?.signOut();
    setSSX(null);
  };

  const address = ssxProvider?.address() || "";

  useEffect(() => {
    // requestFullscreen(true);
    //@ts-ignore
    addEventListener("SignIn", ssxHandler);
    //@ts-ignore
    addEventListener("GetDesigns", getDesigns);
    //@ts-ignore
    addEventListener("SaveDesign", saveDesign);
    getData();
    return () => {
      //@ts-ignore
      removeEventListener("SignIn", ssxHandler);
      //@ts-ignore
      removeEventListener("GetDesigns", getDesigns);
      //@ts-ignore
      removeEventListener("SaveDesign", saveDesign);
    };
  }, [
    addEventListener,
    removeEventListener,
    ssxHandler,
    getDesigns,
    getData,
    saveDesign,
    unityProvider,
    isLoaded,
  ]);

  async function getDesigns() {
    console.log("getDesigns", JSON.stringify(await getData()));
    sendMessage("CanvasManager", "SetDesigns", JSON.stringify(await getData()));
  }

  return (
    <>
      {/* <h2>User Authorization Module</h2>
      <p>Authenticate and Authorize using your ETH keys</p>
      {
        ssxProvider ?
          <>
            {
              address &&
              <p>
                <b>Ethereum Address:</b> <code>{address}</code>
              </p>
            }
            <br />
            <button onClick={ssxLogoutHandler}>
              <span>
                Sign-Out
              </span>
            </button>
            <br />
            <KeplerStorageComponent ssx={ssxProvider} />
            <br />
            <RebaseCredentialComponent ssx={ssxProvider} />
            <br />
            <SpruceKitCredentialComponent ssx={ssxProvider} />
          </> :
          <button onClick={ssxHandler}>
            <span>
              Sign-In with Ethereum
            </span>
          </button>
      } */}
    </>
  );
};

export default SSXComponent;
