"use client";
import { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Script from "next/script";
import SSXComponent from "@/components/SSXComponent";
import ENSComponent from "@/components/ENSComponent";
import Progressbar from "@/components/ProgressBar";

type Design = { label: string; design: string };
type Designs = Design[];

const UnityPlayer = () => {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef(null);

  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    requestFullscreen,
    isLoaded,
    initialisationError,
    sendMessage,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });
  console.log("conf", {
    isLoaded,
    initialisationError,
  });

  return (
    <>
      <Script
        src="lib/thirdweb-unity-bridge.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log(`script loaded correctly, window.FB has been populated`);
          setLoaded(true);
        }}
      />
      {loaded && (
        <>
          {!isLoaded && (
            <Progressbar
              bgcolor="orange"
              progress={Math.round(loadingProgression * 100)}
              height={30}
            />
          )}
          <Unity
            unityProvider={unityProvider}
            ref={canvasRef}
            style={{ height: "100dvh", width: "100dvw" }}
            devicePixelRatio={window.devicePixelRatio}
          />
          <SSXComponent
            unityProvider={unityProvider}
            isLoaded={isLoaded}
            addEventListener={addEventListener}
            removeEventListener={removeEventListener}
            sendMessage={sendMessage}
          />
          <ENSComponent
            unityProvider={unityProvider}
            isLoaded={isLoaded}
            addEventListener={addEventListener}
            removeEventListener={removeEventListener}
            sendMessage={sendMessage}
          />
        </>
      )}
    </>
  );
};

export default UnityPlayer;
