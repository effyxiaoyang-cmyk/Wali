import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { NatureResultPage, NatureScores } from '../components/NatureResultPage';
import { natureQuestions } from '../data/natureQuestions';
import { Compass, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function NatureAssessment() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [natureScores, setNatureScores] = useState<NatureScores>({
    depth: 0,
    warmth: 0,
    energy: 0,
    stability: 0,
    sensitivity: 0,
    freedom: 0,
  });

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestionIndex < natureQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    const scores: NatureScores = {
      depth: 0,
      warmth: 0,
      energy: 0,
      stability: 0,
      sensitivity: 0,
      freedom: 0,
    };

    finalAnswers.forEach((answer, index) => {
      const question = natureQuestions[index];
      const scoreArray = question.scores[answer];
      scores.depth += scoreArray[0];
      scores.warmth += scoreArray[1];
      scores.energy += scoreArray[2];
      scores.stability += scoreArray[3];
      scores.sensitivity += scoreArray[4];
      scores.freedom += scoreArray[5];
    });

    const maxScore = Math.max(...Object.values(scores));
    const normalizedScores: NatureScores = {
      depth: Math.round((scores.depth / maxScore) * 100),
      warmth: Math.round((scores.warmth / maxScore) * 100),
      energy: Math.round((scores.energy / maxScore) * 100),
      stability: Math.round((scores.stability / maxScore) * 100),
      sensitivity: Math.round((scores.sensitivity / maxScore) * 100),
      freedom: Math.round((scores.freedom / maxScore) * 100),
    };

    setNatureScores(normalizedScores);
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setStarted(false);
  };

  const handleBackToHub = () => {
    navigate('/');
  };

  const handleStart = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <button
            onClick={handleBackToHub}
            className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">返回测评中心</span>
          </button>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Compass className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl mb-4 font-serif">天赋自然形态</h1>
          <p className="text-gray-600 mb-8 text-lg">
            探索你的灵魂地貌，找到属于你的自然元素
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl mb-4">测试说明</h2>
            <ul className="text-left text-gray-600 space-y-2 mb-6">
              <li>• 本测试共有20道偏好题</li>
              <li>• 探索你与自然元素的内在联结</li>
              <li>• 根据真实的感受和偏好作答</li>
              <li>• 完成后将获得充满诗意的"天赋形态"结果</li>
            </ul>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
            >
              开始探索
            </button>
          </div>
          <p className="text-sm text-gray-500">预计用时：5-8分钟</p>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4 py-12">
        <NatureResultPage scores={natureScores} onRestart={handleRestart} onBackToHub={handleBackToHub} />
      </div>
    );
  }

  const currentQuestion = natureQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <button
            onClick={handleBackToHub}
            className="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">返回测评中心</span>
          </button>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Compass className="w-5 h-5 text-cyan-600" />
            <span className="text-sm font-medium">天赋自然形态</span>
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
            totalQuestions={natureQuestions.length}
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
                ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === natureQuestions.length - 1 ? '查看结果' : '下一题'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
