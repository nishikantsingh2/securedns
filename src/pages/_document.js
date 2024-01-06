import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
    {/* <!-- Bootstrap core CSS --> */}
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>


    {/* <!-- Additional CSS Files --> */}
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/assets/css/fontawesome.css"/>
    <link rel="stylesheet" href="/assets/css/templatemo-liberty-market.css"/>
    <link rel="stylesheet" href="/assets/css/owl.css"/>
    <link rel="stylesheet" href="/assets/css/animate.css"/>
    <link rel="stylesheet"href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>
    
    
        </Head>
        <Script>
document.write("<h1>Heading Text</h1>");
document.write("<p>This message appeared because you have JS enabled.</p>");
</Script>
        
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
