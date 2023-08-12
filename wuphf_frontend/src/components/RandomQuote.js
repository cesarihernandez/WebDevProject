import React, { useState, useEffect } from 'react';

const quotes = [
    "A dog's love is unconditional.",
    "Dogs are not our whole life, but they make our lives whole. - Roger Caras",
    "The greatest pleasure of a dog is that you may make a fool of yourself with him and not only will he not scold you, but he will make a fool of himself too. - Samuel Butler",
    "Dogs are loyal companions.",
    "Every dog has its day.",
    "Happiness is a warm puppy. - Charles M. Schulz",
    "Wagging tails warm hearts.",
    "Dogs speak with their eyes.",
    "Adopt, don't shop for dogs.",
    "In a dog's world, kindness matters.",
    "The better I get to know men, the more I find myself loving dogs. - Charles de Gaulle",
    "Love is spelled D-O-G.",
    "Dogs leave paw prints on our hearts.",
    "The world would be a nicer place if everyone had the ability to love as unconditionally as a dog. - M.K. Clinton",
    "Dogs understand the language of the heart.",
    "Dogs are not our whole life, but they make our lives whole. - Roger Caras",
    "A dog is the only thing on earth that loves you more than he loves himself. - Josh Billings",
    "Dogs offer endless cuddles and smiles.",
    "The better I get to know men, the more I find myself loving dogs. - Charles de Gaulle",
    "Dogs teach us to live in the moment."
  ];
  

const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="random-quote">
      Random Dog Quote: {randomQuote && <p style={{ fontSize: '0.95rem', fontWeight: 'bold', fontStyle: 'italic' }}>{"\"" + randomQuote + "\""}</p>}
    </div>
  );
};

export default RandomQuote;
