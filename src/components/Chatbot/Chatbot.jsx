import React, { useState, useEffect } from "react";
import Sentiment from "sentiment";
import Papa from "papaparse";
import { tokenize } from "nlp-tokenizer";

const ChatbotWithAI = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [chatCompleted, setChatCompleted] = useState(false);
  const [foodDataset, setFoodDataset] = useState([]);

  const questions = [
    "How are you feeling today? (e.g., happy, sad, adventurous)",
    "Do you prefer spicy, sweet, or savory food?",
    "Are you in the mood for vegetarian or non-vegetarian dishes?",
    "Any specific region you prefer? (North, South, East, West)",
    "Any food craving you have right now?",
  ];

  const sentiment = new Sentiment();

  useEffect(() => {
    Papa.parse("/Ifood_new.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setFoodDataset(results.data);
      },
    });
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step === questions.length - 1) {
      generateRecommendation(newAnswers);
    } else {
      setStep(step + 1);
    }
  };

  const generateRecommendation = (answers) => {
    const fullInput = answers.join(" ");
    const sentimentAnalysis = sentiment.analyze(fullInput);
    const sentimentScore = sentimentAnalysis.score;
    const tokens = tokenize(fullInput.toLowerCase());

    const filteredDishes = foodDataset.filter((dish) => {
      const matchesCategory = tokens.some((token) =>
        dish.Category?.toLowerCase().includes(token)
      );
      const matchesVeg = tokens.some((token) =>
        dish["Veg/Non-Veg"]?.toLowerCase().includes(token)
      );
      const matchesRegion = tokens.some((token) =>
        dish.Region?.toLowerCase().includes(token)
      );
      return matchesCategory && matchesVeg && matchesRegion;
    });

    const scoredDishes = filteredDishes.map((dish) => {
      let score = 0;

      if (sentimentScore > 5 && dish.Category?.toLowerCase() === "spicy") {
        score += 3;
      } else if (sentimentScore < 0 && dish.Category?.toLowerCase() === "sweet") {
        score += 3;
      } else if (dish.Category?.toLowerCase() === answers[1].toLowerCase()) {
        score += 2;
      }

      if (dish.Region?.toLowerCase().includes(answers[3].toLowerCase())) {
        score += 2;
      }
      if (dish["Veg/Non-Veg"]?.toLowerCase().includes(answers[2].toLowerCase())) {
        score += 2;
      }

      return { ...dish, score };
    });

    const sortedDishes = scoredDishes.sort((a, b) => b.score - a.score);
    const recommendedDish = sortedDishes[0]?.Name || "A balanced meal of your choice!";
    setRecommendation(recommendedDish);
    setChatCompleted(true);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-md w-96">
      {!chatCompleted ? (
        <>
          <p className="text-lg font-semibold mb-2">{questions[step]}</p>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Type your answer here..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                handleAnswer(e.target.value.trim());
                e.target.value = "";
              }
            }}
          />
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2">Your Food Recommendation</h3>
          <p className="text-gray-700 mb-4">{recommendation}</p>
          <button
            onClick={() => {
              setStep(0);
              setAnswers([]);
              setRecommendation("");
              setChatCompleted(false);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Restart Chat
          </button>
        </>
      )}
    </div>
  );
};

export default ChatbotWithAI;
