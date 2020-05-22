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

  const { currentPhase, daysSinceNew } = moonState;

  const quarters = [
    currentPhase > 3,
    currentPhase > 2 && currentPhase < 7,
    currentPhase > 1 && currentPhase < 6,
    currentPhase > 0 && currentPhase < 5,
  ];

  console.log(currentPhase.toFixed(), daysSinceNew.toFixed(), quarters);

  return (
    <div className="container">
      <Head>
        <title>Moon Clock</title>

        <meta charSet='utf-8'/>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
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
          <div className={'moon-quarter ' + (quarters[0] && 'moon-quarter-light')}/>
          <div className={'moon-quarter ' + (quarters[1] && 'moon-quarter-light')}/>
          <div className={'moon-quarter ' + (quarters[2] && 'moon-quarter-light')}/>
          <div className={'moon-quarter ' + (quarters[3] && 'moon-quarter-light')}/>
        </div>
        <p className="days-info">Days since new moon: {daysSinceNew.integerValue(BN.ROUND_FLOOR).toFixed()}</p>
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
          background-color: #222444;
          width: 100%;
        }
        
        .moon-container {
          padding: 5rem 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 50%;
          max-width: 800px;
        }

        .moon-quarter {
          width: 50px;
          height: 100px;
          margin: 10px;
          background-color: black;
        }
        .moon-quarter-light {
          background-color: white;
        }
        
        .days-info {
          color: white;
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
    </div>
  )
}
