import Head from "next/head";
const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "";
const HeadComp = () => {
  return (
    <>
      <Head>
        <title>SDVX BPM DB</title>
        <link rel="icon" href="/favicon.ico" />
        {GA_TRACKING_ID != null && (
          <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });`,
              }}
            />
          </>
        )}
        <meta property="og:title" content="SDVX DB" />
        <meta property="og:description" content="SDVX DB" />
        {/* <meta
          property="og:image"
          content="../public/sdvx_bpm_database_logo_for_twitter.png"
        /> */}
        <meta
          name="twitter:image"
          content="../public/sdvx_bpm_database_logo_for_twitter.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SDVX DB" />
        <meta name="twitter:description" content="SDVX DB" />
      </Head>
    </>
  );
};

export default HeadComp;
