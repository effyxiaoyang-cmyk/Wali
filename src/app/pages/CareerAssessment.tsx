import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { CareerResultPage, CareerScores } from '../components/CareerResultPage';
import { careerQuestions } from '../data/careerQuestions';
import { Briefcase, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CareerAssessment() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [careerScores, setCareerScores] = useState<CareerScores>({
    communication: 0,
    logic: 0,
    empathy: 0,
    action: 0,
    creativity: 0,
    coordination: 0,
  });

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestionIndex < careerQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    const scores: CareerScores = {
      communication: 0,
      logic: 0,
      empathy: 0,
      action: 0,
      creativity: 0,
      coordination: 0,
    };

    finalAnswers.forEach((answer, index) => {
      const question = careerQuestions[index];
      const scoreArray = question.scores[answer];
      scores.communication += scoreArray[0];
      scores.logic += scoreArray[1];
      scores.empathy += scoreArray[2];
      scores.action += scoreArray[3];
      scores.creativity += scoreArray[4];
      scores.coordination += scoreArray[5];
    });

    const maxScore = Math.max(...Object.values(scores));
    const normalizedScores: CareerScores = {
      communication: Math.round((scores.communication / maxScore) * 100),
      logic: Math.round((scores.logic / maxScore) * 100),
      empathy: Math.round((scores.empathy / maxScore) * 100),
      action: Math.round((scores.action / maxScore) * 100),
      creativity: Math.round((scores.creativity / maxScore) * 100),
      coordination: Math.round((scores.coordination / maxScore) * 100),
    };

    setCareerScores(normalizedScores);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Briefcase className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl mb-4">隐藏天赋职业</h1>
          <p className="text-gray-600 mb-8 text-lg">
            发现你内在的独特才能，找到专属于你的"非传统职业"
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl mb-4">测试说明</h2>
            <ul className="text-left text-gray-600 space-y-2 mb-6">
              <li>• 本测试共有20道场景题</li>
              <li>• 将评估你的沟通、逻辑、共情、行动力等6个维度</li>
              <li>• 根据真实感受作答，没有对错之分</li>
              <li>• 完成后将获得专属的"天赋职业"结果</li>
            </ul>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 py-12">
        <CareerResultPage scores={careerScores} onRestart={handleRestart} onBackToHub={handleBackToHub} />
      </div>
    );
  }

  const currentQuestion = careerQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 py-12">
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
            <Briefcase className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">隐藏天赋职业</span>
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
            totalQuestions={careerQuestions.length}
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
                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === careerQuestions.length - 1 ? '查看结果' : '下一题'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
