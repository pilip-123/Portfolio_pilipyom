import { useEffect, useState } from 'react';

const TYPING_SPEED = 85;
const DELETING_SPEED = 45;
const PAUSE_AT_END = 1800;
const PAUSE_AT_START = 300;

export default function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_AT_END);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
        isDeleting ? DELETING_SPEED : TYPING_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}
