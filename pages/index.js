import { useState, useEffect } from 'react';
import Head from 'next/head'
import moon from '../lib/moon';
import BN from 'bignumber.js';

export default function Home() {
  const [moonState, setMoonState] = useState(() => moon.getState());

  useEffect(() => {

    const update = () => setMoonState(moon.getState());
    const id = setInterval(update, 3000);

    return () => clearInterval(id);

  }, []);

  // Debug stuff

  // const [a,b] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     b(aa => ((aa+1)%8));
  //   }, 1000)
  // }, []);
  // const currentPhase = BN(a);
  // const { daysSinceNew } = moonState;

  const { currentPhase, daysSinceNew } = moonState;

  console.log(currentPhase.toFixed(), daysSinceNew.toFixed());

  return (
    <div className="container">
      <Head>
        <title>Moon Clock</title>

        <meta charSet='utf-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
        <meta name='viewport'
              content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
        <meta name='description' content='Moon clock and phases'/>
        <meta name='keywords' content='moon,phases,cycles,full moon,waxing,crescent'/>

        <link rel="manifest" href="/manifest.json"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel='icon' href='/favicon-16x16.png' type='image/png' sizes='16x16'/>
        <link rel='icon' href='/favicon-32x32.png' type='image/png' sizes='32x32'/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        <meta name="theme-color" content="#317EFB"/>
      </Head>

      <main>
        <div className="moon-container">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <image
              href="images/moon_full.png"
              x="0" y="0" height="100" width="100"
            />
            <image
              href="images/moon_full_black.png"
              x="0" y="0" height="100" width="100"
              opacity={0.8}
              mask={`url(#mask-shape-${currentPhase.toFixed()})`}
            />
          </svg>
        </div>
        <p className="days-info">
          Current phase: {currentPhase.toFixed()}
          <br/>
          Days since new moon: {daysSinceNew.integerValue(BN.ROUND_FLOOR).toFixed()}
        </p>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          flex: 1;
          display: flex;
           flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #20212d;
          width: 100%;
        }
        
        .moon-container {
          margin: 5rem 0;
          width: 70%;
          max-width: 400px;
          position: relative;
        }
        .moon-container:after {
          content: "";
          display: block;
          padding-bottom: 100%;
          position: absolute;
        }

        .days-info {
          color: white;
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <svg width={0} height={0}>
        <defs>
          <mask id="mask-shape-0" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="white" x="0" y="0" width="1" height="1" />
          </mask>
          <mask id="mask-shape-1" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="black" x="0" y="0" width="1" height="1" />
            <rect    fill="white" x="0" y="0" width="0.5" height="1" />
            <ellipse fill="white" cx="0.5" cy="0.5" rx="0.25" ry="0.5"/>
          </mask>
          <mask id="mask-shape-2" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="black" x="0" y="0" width="1" height="1" />
            <rect    fill="white" x="0" y="0" width="0.5" height="1" />
          </mask>
          <mask id="mask-shape-3" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="white" x="0" y="0" width="1" height="1" />
            <rect    fill="black" x="0.5" y="0" width="0.5" height="1" />
            <ellipse fill="black" cx="0.5" cy="0.5" rx="0.25" ry="0.5"/>
          </mask>
          <mask id="mask-shape-4" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="black" x="0" y="0" width="1" height="1" />
            <rect    fill="white" x="0" y="0" width="0" height="0" />
          </mask>
          <mask id="mask-shape-5" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="white" x="0" y="0" width="1" height="1" />
            <rect    fill="black" x="0" y="0" width="0.5" height="1" />
            <ellipse fill="black" cx="0.5" cy="0.5" rx="0.25" ry="0.5"/>
          </mask>
          <mask id="mask-shape-6" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="black" x="0" y="0" width="1" height="1" />
            <rect    fill="white" x="0.5" y="0" width="0.5" height="1" />
          </mask>
          <mask id="mask-shape-7" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect    fill="black" x="0" y="0" width="1" height="1" />
            <rect    fill="white" x="0.5" y="0" width="0.5" height="1" />
            <ellipse fill="white" cx="0.5" cy="0.5" rx="0.25" ry="0.5"/>
          </mask>
        </defs>
      </svg>
    </div>
  )
}
