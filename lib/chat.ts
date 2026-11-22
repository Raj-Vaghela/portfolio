export const chatLimits = {
  turns: 13,
  questionCharacters: 700,
  answerCharacters: 2400,
}

export type ChatTurn = {
  role: "user" | "assistant"
  content: string
}

export type ChatLink = {
  label: string
  href: string
}
