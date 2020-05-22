import { useState, useEffect } from 'react';
import Head from 'next/head'
import moon from '../lib/moon';
import BN from 'bignumber.js';

export default function Home() {
  const [moonState, setMoonState] = useState(() => moon.getState());

  const [currentPhase, setCurrentPhase] = useState(BN(0));
  const [daysSinceNew, setDaysSinceNew] = useState(BN(0));

  useEffect(() => {

    const update = () => setMoonState(moon.getState());
    const id = setInterval(update, 3000);

    return () => clearInterval(id);

  }, []);

  useEffect(() => {

    const update = () => {
      setCurrentPhase(c => BN(c).plus(1));
      setDaysSinceNew(c => BN(c).plus(1));
    }
    const id = setInterval(update, 500);

    return () => clearInterval(id);

  }, []);

  // const { currentPhase, daysSinceNew } = moonState;

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
        <link rel="icon" href="/favicon.ico" />
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

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

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
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        
        
        .logo {
          height: 1em;
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
