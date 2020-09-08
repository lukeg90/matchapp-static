import React, { useState } from "react"

const QAndA = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <span>{question}</span>
        {showAnswer ? (
          <span className="faq-expand">&#8963;</span>
        ) : (
          <span className="faq-expand">&#8964;</span>
        )}
      </button>
      <p className={`faq-answer ${showAnswer ? "show" : "hide"}`}>{answer}</p>
    </div>
  )
}

export default QAndA
