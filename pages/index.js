import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export default function Home() {
  const soundPhrases = [
    { emoji: "😤", displayedText: "U hate me" },
    { emoji: "🥰", displayedText: "hug hut" },
    { emoji: "🥺", displayedText: "U miss me" },
    { emoji: "🥺", displayedText: "U like me?" },
    { emoji: "🥰", displayedText: "what's going on over there" },
    { emoji: "☹️", displayedText: "why are you a child" },
    { emoji: "🥰", displayedText: "miss you, love you" },
    { emoji: "😐", displayedText: "why are you like this" },
    { emoji: "😡", displayedText: "you're cheating on me" },
    { emoji: "😡", displayedText: "give me attention" },
    { emoji: "🥰", displayedText: "you look chinese" },
    { emoji: "🥴", displayedText: "nut hut" },
    { emoji: "🥴", displayedText: "horny" },
    { emoji: "☹️", displayedText: "sad hut" },
    { emoji: "🥰", displayedText: "miss u" },
    { emoji: "🥰", displayedText: "biotech couple" },
    { emoji: "🥰", displayedText: "how much do you like me" },
    { emoji: "😡", displayedText: "i like you five" },
    { emoji: "😡", displayedText: "why r u vaping, u have a girlfriend!" },
    { emoji: "🥰", displayedText: "u make me happy" },
    { emoji: "🥰", displayedText: "wish u were here" },
    { emoji: "😐", displayedText: "why are you so chaotic" },
    { emoji: "🤩", displayedText: "road trophy" },
    { emoji: "😑", displayedText: "you catfished me" },
    { emoji: "😴", displayedText: "goodmornigngg" },
  ];

  const { speak, voices } = useSpeechSynthesis();

  const [clickStateA, setClickStateA] = useState(false);
  const [clickStateB, setClickStateB] = useState(false);
  const [animationA, setAnimationA] = useState(false);
  const [animationB, setAnimationB] = useState(false);
  const [choiceA, setChoiceA] = useState();
  const [choiceB, setChoiceB] = useState();

  const randomlySelect = () =>
    soundPhrases[Math.floor(Math.random() * soundPhrases.length)];

  useEffect(() => {
    if (clickStateA || clickStateB) {
      const resetFunction = () => {
        setClickStateA(false);
        setClickStateB(false);
        setAnimationA(false);
        setAnimationB(false);
        setChoiceA(randomlySelect());
        setChoiceB(randomlySelect());
      };

      speak({
        text: clickStateA ? choiceA.displayedText : choiceB.displayedText,
        voice: voices[4],
      });

      const delayedReset = () => setTimeout(resetFunction, 2000);

      delayedReset();
    }
  }, [clickStateA, clickStateB]);

  const renderEmoji = () => {
    if (!choiceA || !choiceB) {
      setChoiceA(randomlySelect());
      setChoiceB(randomlySelect());
      return null;
    }

    const randomPickA = choiceA;
    const randomPickB = choiceB;

    const setMessage = (setAnimation, setState) => {
      setAnimation(true);

      const settingTrue = () => setState(true);
      const delayedState = () => setTimeout(settingTrue, 600);

      delayedState();
    };

    if (clickStateA || clickStateB) {
      if (clickStateA) {
        return (
          <div className="messageContainer">{randomPickA.displayedText}</div>
        );
      }
      if (clickStateB) {
        return (
          <div className="messageContainer">{randomPickB.displayedText}</div>
        );
      }
    }

    return (
      <div className="emojiContainerContainer">
        <span
          onClick={() => setMessage(setAnimationA, setClickStateA)}
          className={`emojiContainer ${animationA && "spin"}`}
        >
          {randomPickA.emoji}
        </span>

        <span
          onClick={() => setMessage(setAnimationB, setClickStateB)}
          className={`emojiContainer ${animationB && "spin"}`}
        >
          {randomPickB.emoji}
        </span>
      </div>
    );
  };

  return (
    <div className="container">
      <Head>
        <title>hug hut</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>{renderEmoji()}</main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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

        .emojiContainerContainer {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          height: 90vh;
          align-items: center;
        }

        .emojiContainer {
          display: flex;
          font-size: 7rem;
          font-family: "Shadows Into Light", cursive;
        }

        .messageContainer {
          font-size: 8rem;
          font-family: "Shadows Into Light", cursive;
          text-align: center;
        }

        .emojiContainer:hover {
          font-size: 8rem;
        }

        .spin {
          font-size: 8rem;
          animation: spin 0.5s linear;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s 0.5s, opacity 0.5s linear;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @import url("https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap");

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
