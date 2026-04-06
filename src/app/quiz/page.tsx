import { QuizProvider } from "@/context/QuizContext";
import { QuizShell } from "@/components/quiz/QuizShell";

export const metadata = {
  title: "Find your path — Torvi",
};

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizShell />
    </QuizProvider>
  );
}
