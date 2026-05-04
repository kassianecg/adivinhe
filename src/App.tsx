import styles from "./app.module.css";
import { useEffect, useState } from "react";

import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";

import { Input } from "./components/Input";
import { Tip } from "./components/Tips";
import { Button } from "./components/Button";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";
import { LettersUsed } from "./components/LettersUsed";
import type { LetterUsedProps } from "./components/LettersUsed";

const ATTEMPTS_MARGIN = 5

export default function App() {
  const [score, setScore] = useState(0);
  const [letter, setletter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  function handleRestartGame() {
    const isConfirmed = window.confirm("Tem certeza que deseja reiniciar o jogo?")

    if (isConfirmed) {
      startGame()
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);

    setScore(0);
    setletter("");
    setLettersUsed([]);
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra para confirmar o palpite")
    }

    const value = letter.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      setletter("")
      return alert("Essa letra já foi utilizada: " + value)
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0
    const currentScore = score + hits

    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setletter("")
  }

  function endGame(message: string) {
    alert(message)
    startGame()
  }

  useEffect(() => {
    startGame();
  }, [])

  useEffect(() => {
    if (!challenge) {
      return
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você venceu!")
      }

      const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN
      if (lettersUsed.length === attemptLimit) {
        return endGame("Suas tentativas acabaram, tente novamente!")
      }
    }, 200)
  }, [score, lettersUsed.length])

  if (!challenge) {
    return null
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            )

            return <Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? "correct" : "default"} />
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-ZÀ-ú]/g, "")
              setletter(value)
            }}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>
        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}

