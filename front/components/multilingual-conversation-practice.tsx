"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Language = 'portuguese' | 'english' | 'spanish'

const suggestedPhrasesByLanguage: Record<Language, string[]> = {
  portuguese: [
    "Como vai você?",
    "Qual é o seu hobby favorito?",
    "Onde você gostaria de viajar?",
    "O que você fez no fim de semana?",
  ],
  english: [
    "How are you?",
    "What's your favorite hobby?",
    "Where would you like to travel?",
    "What did you do over the weekend?",
  ],
  spanish: [
    "¿Cómo estás?",
    "¿Cuál es tu pasatiempo favorito?",
    "¿Dónde te gustaría viajar?",
    "¿Qué hiciste el fin de semana?",
  ],
}

const placeholdersByLanguage: Record<Language, string> = {
  portuguese: "Digite uma frase em português...",
  english: "Type a sentence in English...",
  spanish: "Escribe una frase en español...",
}

const titlesByLanguage: Record<Language, string> = {
  portuguese: "Prática de Conversação",
  english: "Conversation Practice",
  spanish: "Práctica de Conversación",
}

export function Conversation() {
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [language, setLanguage] = useState<Language>('portuguese')

  const analyzeSentence = (sentence: string, lang: Language) => {
    if (sentence.length < 5) {
      return lang === 'portuguese' ? "Tente elaborar mais sua frase." :
             lang === 'english' ? "Try to elaborate more on your sentence." :
             "Intenta elaborar más tu frase.";
    }
    if (!sentence.includes(' ')) {
      return lang === 'portuguese' ? "Tente usar mais de uma palavra na sua frase." :
             lang === 'english' ? "Try to use more than one word in your sentence." :
             "Intenta usar más de una palabra en tu frase.";
    }
    const commonPhrases = {
      portuguese: 'eu gosto',
      english: 'i like',
      spanish: 'me gusta'
    };
    if (sentence.toLowerCase().includes(commonPhrases[lang])) {
      return lang === 'portuguese' ? "Ótimo uso da expressão 'eu gosto'! Tente expandir mais sobre o que você gosta." :
             lang === 'english' ? "Great use of the phrase 'I like'! Try to expand more on what you like." :
             "¡Buen uso de la expresión 'me gusta'! Intenta expandir más sobre lo que te gusta.";
    }
    return lang === 'portuguese' ? "Boa frase! Continue praticando." :
           lang === 'english' ? "Good sentence! Keep practicing." :
           "¡Buena frase! Sigue practicando.";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const feedbackText = analyzeSentence(userInput, language)
    setFeedback(feedbackText)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{titlesByLanguage[language]}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value: Language) => setLanguage(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portuguese">Português</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholdersByLanguage[language]}
            className="w-full"
          />
          <Button type="submit">
            {language === 'portuguese' ? 'Enviar' : language === 'english' ? 'Submit' : 'Enviar'}
          </Button>
        </form>
        
        {feedback && (
          <div className="mt-4 p-4 bg-secondary text-secondary-foreground rounded-md">
            <h3 className="font-semibold">
              {language === 'portuguese' ? 'Feedback:' : language === 'english' ? 'Feedback:' : 'Retroalimentación:'}
            </h3>
            <p>{feedback}</p>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            {language === 'portuguese' ? 'Frases sugeridas para prática:' :
             language === 'english' ? 'Suggested phrases for practice:' :
             'Frases sugeridas para practicar:'}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {suggestedPhrasesByLanguage[language].map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}