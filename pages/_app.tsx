import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { usePageView } from "../usePageView";

export default function App({ Component, pageProps }: AppProps) {
  usePageView();
  return <Component {...pageProps} />;
}
