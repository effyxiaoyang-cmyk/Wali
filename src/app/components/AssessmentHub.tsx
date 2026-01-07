import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Heart, 
  Briefcase, 
  Palette, 
  Users, 
  Target, 
  Lightbulb,
  TrendingUp,
  Smile,
  Compass
} from 'lucide-react';

export interface Assessment {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  questionCount: number;
  duration: string;
}

export const assessments: Assessment[] = [
  {
    id: 'talent',
    title: '天赋测评',
    description: '发现你的核心优势和潜在才能',
    icon: Brain,
    color: 'blue',
    gradient: 'from-blue-500 to-purple-600',
    questionCount: 20,
    duration: '5-8分钟',
  },
  {
    id: 'personality',
    title: '性格测评',
    description: '深入了解你的性格特质与行为模式',
    icon: Heart,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    questionCount: 20,
    duration: '6-9分钟',
  },
  {
    id: 'career',
    title: '职业倾向测评',
    description: '找到最适合你的职业发展方向',
    icon: Briefcase,
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    questionCount: 20,
    duration: '7-10分钟',
  },
  {
    id: 'creativity',
    title: '创造力测评',
    description: '评估你的创新思维和想象力水平',
    icon: Palette,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    questionCount: 20,
    duration: '5-8分钟',
  },
  {
    id: 'emotional',
    title: '情商测评',
    description: '测试你的情绪管理和人际交往能力',
    icon: Users,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    questionCount: 20,
    duration: '6-9分钟',
  },
  {
    id: 'leadership',
    title: '领导力测评',
    description: '评估你的管理潜力和领导风格',
    icon: Target,
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    questionCount: 20,
    duration: '7-10分钟',
  },
  {
    id: 'learning',
    title: '学习风格测评',
    description: '找到最适合你的学习方法和策略',
    icon: Lightbulb,
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
    questionCount: 20,
    duration: '5-7分钟',
  },
  {
    id: 'motivation',
    title: '动机测评',
    description: '了解驱动你行为的内在动力源泉',
    icon: TrendingUp,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    questionCount: 20,
    duration: '6-8分钟',
  },
  {
    id: 'stress',
    title: '压力管理测评',
    description: '评估你的压力应对能力和心理韧性',
    icon: Smile,
    color: 'teal',
    gradient: 'from-teal-500 to-green-600',
    questionCount: 20,
    duration: '5-8分钟',
  },
  {
    id: 'values',
    title: '价值观测评',
    description: '探索你的核心价值观和人生追求',
    icon: Compass,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    questionCount: 20,
    duration: '7-10分钟',
  },
];

interface AssessmentHubProps {
  onSelectAssessment?: (assessmentId: string) => void;
}

export function AssessmentHub({ onSelectAssessment }: AssessmentHubProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl mb-4">心理测评中心</h1>
          <p className="text-gray-600 text-lg">
            选择一个测评，开启自我探索之旅
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => {
            const Icon = assessment.icon;
            return (
              <Link
                key={assessment.id}
                to={`/assessment/${assessment.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl"
                >
                  <div className={`h-2 bg-gradient-to-r ${assessment.gradient}`} />
                  <div className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${assessment.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-2">{assessment.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                      {assessment.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{assessment.questionCount} 道题</span>
                      <span>{assessment.duration}</span>
                    </div>
                    <button
                      className={`w-full mt-4 py-2 rounded-lg bg-gradient-to-r ${assessment.gradient} text-white hover:opacity-90 transition-opacity`}
                    >
                      开始测评
                    </button>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-xl mb-4">测评说明</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left text-gray-600">
              <div>
                <h3 className="font-medium mb-2">✓ 测评特点</h3>
                <ul className="space-y-1 text-sm">
                  <li>• 科学专业的题目设计</li>
                  <li>• 多维度综合评估</li>
                  <li>• 详细的结果分析</li>
                  <li>• 个性化建议指导</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">✓ 注意事项</h3>
                <ul className="space-y-1 text-sm">
                  <li>• 请在安静环境下完成</li>
                  <li>• 根据真实情况作答</li>
                  <li>• 没有对错之分</li>
                  <li>• 诚实作答获得最准确结果</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}