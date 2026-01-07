import { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { ResultPage, TalentScores } from './components/ResultPage';
import { questions } from './data/questions';
import { Brain, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // 计算结果
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    const scores: TalentScores = {
      logic: 0,
      creativity: 0,
      interpersonal: 0,
      leadership: 0,
      artistic: 0,
      analytical: 0,
    };

    finalAnswers.forEach((answer, index) => {
      const question = questions[index];
      const scoreArray = question.scores[answer];
      scores.logic += scoreArray[0];
      scores.creativity += scoreArray[1];
      scores.interpersonal += scoreArray[2];
      scores.leadership += scoreArray[3];
      scores.artistic += scoreArray[4];
      scores.analytical += scoreArray[5];
    });

    // 归一化到100分制
    const maxScore = Math.max(...Object.values(scores));
    const normalizedScores: TalentScores = {
      logic: Math.round((scores.logic / maxScore) * 100),
      creativity: Math.round((scores.creativity / maxScore) * 100),
      interpersonal: Math.round((scores.interpersonal / maxScore) * 100),
      leadership: Math.round((scores.leadership / maxScore) * 100),
      artistic: Math.round((scores.artistic / maxScore) * 100),
      analytical: Math.round((scores.analytical / maxScore) * 100),
    };

    setShowResult(true);
    setTalentScores(normalizedScores);
  };

  const [talentScores, setTalentScores] = useState<TalentScores>({
    logic: 0,
    creativity: 0,
    interpersonal: 0,
    leadership: 0,
    artistic: 0,
    analytical: 0,
  });

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setStarted(false);
  };

  const handleStart = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl mb-4">天赋自测系统</h1>
          <p className="text-gray-600 mb-8 text-lg">
            通过20道精心设计的问题，深入了解你的天赋优势
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl mb-4">测试说明</h2>
            <ul className="text-left text-gray-600 space-y-2 mb-6">
              <li>• 本测试共有20道题目</li>
              <li>• 每道题目请根据真实情况选择最符合你的选项</li>
              <li>• 没有对错之分，请诚实作答</li>
              <li>• 完成后将获得详细的天赋分析报告</li>
            </ul>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
            >
              开始测试
            </button>
          </div>
          <p className="text-sm text-gray-500">预计用时：5-8分钟</p>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
        <ResultPage scores={talentScores} onRestart={handleRestart} />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">天赋自测</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end mt-8 max-w-2xl mx-auto"
        >
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded-lg flex items-center gap-2 transition-all ${
              selectedOption !== null
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? '查看结果' : '下一题'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
