export const chatLimits = {
  turns: 9,
  questionCharacters: 700,
  answerCharacters: 2400,
}

export type ChatTurn = {
  role: "user" | "assistant"
  content: string
}
