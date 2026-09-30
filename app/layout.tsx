import {
  futuraMdBtMedium,
  futuraMdBtBold,
  futuraBookBt,
  trajanProRegular,
  trajanProBold
} from "@/fonts";

import Script from "next/script";
import "./globals.css";
import type { Viewport } from "next";
import GAConnector from "@/components/utils/GAConnector";

export function generateViewport(): Viewport {
  return {
    themeColor: "#4B4D4C",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${futuraMdBtMedium.variable} ${futuraMdBtBold.variable} ${futuraBookBt.variable} ${trajanProRegular.variable} ${trajanProBold.variable} scroll-smooth`}>
      <head>
        <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event:'gtm.js'
            });
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KSDBCQ8');
        `}
      </Script>

        {/* Google Ads / gtag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-832162169"
          strategy="afterInteractive"
        />

        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-832162169');
          `}
        </Script>

        {/* Comscore / ClmbTech Pixel */}
        <Script id="clmbtech-pixel" strategy="afterInteractive">
          {`
            !function(px){
              function e(t,e,c){
                var n="",r="";
                try{
                  ""!=(n=function(t,e){
                    try{
                      var c={};
                      e.replace(/[?&]+([^=&]*)/gi,function(t,e,n){c[e]=n});
                      return c.hasOwnProperty(t)?c[t]:""
                    }catch(t){return""}
                  }(t,c))
                  ?function(t,e,c){
                    try{
                      var n,r;
                      c
                        ?((n=new Date).setTime(n.getTime()+864e5),
                          r="; expires="+n.toGMTString())
                        :r="";
                      document.cookie=t+"="+e+r+";Path=/"
                    }catch(t){}
                  }(e,n,1)
                  :n=function(t){
                    try{
                      var e=document.cookie.match(new RegExp("(^| )"+t+"=([^;]+)"));
                      if(e)return e[2]
                    }catch(t){}
                    return null
                  }(e);

                  r=""!=n&&null!=n?"&"+t+"="+n:"&"+t+"=";
                }catch(t){}
                return r;
              }

              var c="",n="",r="";
              try{
                n=e("ad","acf",c=window.location.href);
                r=e("col_ci","col_ci",c);
              }catch(t){
                console.log(t)
              }

              var a=
                "https://ade.clmbtech.com/cde/eventTracking.htm?pixelId="
                +px+
                "&_w=1&_t=2"+
                n+
                r+
                "&rd="+(new Date).getTime();

              (new Image).src=a;
            }('8721');
          `}
        </Script>

        {/* Verloop Live Chat */}
        <Script id="verloop-chat" strategy="afterInteractive">
          {`
            (function(w, d, s, u) {
              w.Verloop = function(c) {
                w.Verloop._.push(c)
              };
              w.Verloop._ = [];
              w.Verloop.url = u;

              var h = d.getElementsByTagName(s)[0],
                  j = d.createElement(s);

              j.async = true;
              j.src = 'https://panchshil.verloop.io/livechat/script.min.js';

              h.parentNode.insertBefore(j, h);
            })(
              window,
              document,
              'script',
              'https://panchshil.verloop.io/livechat'
            );
          `}
        </Script>
      </head>
      <body className="font-futura">
        {children}
        <GAConnector />
      </body>
    </html>
  );
}
