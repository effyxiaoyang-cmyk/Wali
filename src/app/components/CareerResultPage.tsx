import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Sparkles, Heart, Brain, Zap, Palette, Scale, Home } from 'lucide-react';

export interface CareerScores {
  communication: number;
  logic: number;
  empathy: number;
  action: number;
  creativity: number;
  coordination: number;
}

interface CareerResultPageProps {
  scores: CareerScores;
  onRestart: () => void;
  onBackToHub?: () => void;
}

interface CareerType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  icon: any;
  gradient: string;
  matchDimensions: string[];
}

const careerTypes: CareerType[] = [
  {
    id: 'curator',
    title: '宇宙策展人',
    subtitle: 'Cosmic Curator',
    description: '你拥有天马行空的想象力和强大的联结能力，擅长将看似无关的事物组合成新故事。在你的世界里，一切都可以被重新定义和连接。',
    traits: ['超强联想力', '跨界整合', '故事叙述', '美学敏感'],
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500',
    matchDimensions: ['creativity', 'communication'],
  },
  {
    id: 'emotion-wizard',
    title: '情绪魔法师',
    subtitle: 'Emotion Wizard',
    description: '你能精准感知自己和他人的情绪波动，并能用语言或行动进行治愈和转化。你的存在本身就是一种温暖的力量。',
    traits: ['情绪感知', '共情治愈', '倾听支持', '关系维护'],
    icon: Heart,
    gradient: 'from-rose-500 to-pink-500',
    matchDimensions: ['empathy', 'communication'],
  },
  {
    id: 'balance-master',
    title: '人间平衡仪',
    subtitle: 'Balance Master',
    description: '天生的协调者和判断者，在复杂局面中总能找到最稳妥、最公平的解决方案。你是混乱中的秩序，是冲突中的和谐。',
    traits: ['公平判断', '利益平衡', '冲突调解', '系统思维'],
    icon: Scale,
    gradient: 'from-blue-500 to-cyan-500',
    matchDimensions: ['coordination', 'logic'],
  },
  {
    id: 'inspiration-catcher',
    title: '灵感捕手',
    subtitle: 'Inspiration Hunter',
    description: '对新鲜信息和趋势极度敏感，总能第一时间捕捉到潮流与机会。你的直觉和洞察力让你始终走在时代前沿。',
    traits: ['趋势洞察', '创意迸发', '快速反应', '机会敏感'],
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    matchDimensions: ['creativity', 'action'],
  },
  {
    id: 'logic-architect',
    title: '逻辑建筑师',
    subtitle: 'Logic Architect',
    description: '你的大脑是一台精密的机器，擅长构建框架、分析问题和设计系统。复杂性在你面前会自动变得清晰有序。',
    traits: ['结构化思维', '问题分析', '系统设计', '精准表达'],
    icon: Brain,
    gradient: 'from-indigo-500 to-purple-500',
    matchDimensions: ['logic', 'coordination'],
  },
  {
    id: 'action-catalyst',
    title: '行动催化剂',
    subtitle: 'Action Catalyst',
    description: '你是天生的执行者，能够将想法快速转化为现实。在你的推动下，一切都会加速发生，目标变得触手可及。',
    traits: ['快速执行', '目标导向', '高效推进', '结果驱动'],
    icon: Zap,
    gradient: 'from-red-500 to-orange-500',
    matchDimensions: ['action', 'logic'],
  },
  {
    id: 'creative-alchemist',
    title: '创意炼金术士',
    subtitle: 'Creative Alchemist',
    description: '你能将平凡转化为非凡，在你的手中，任何元素都可能发生奇妙的化学反应，创造出令人惊叹的作品。',
    traits: ['创新思维', '美学创造', '跨界融合', '艺术表达'],
    icon: Palette,
    gradient: 'from-purple-500 to-indigo-500',
    matchDimensions: ['creativity', 'empathy'],
  },
  {
    id: 'bridge-builder',
    title: '桥梁建造者',
    subtitle: 'Bridge Builder',
    description: '你是人与人之间的连接者，擅长搭建沟通的桥梁，让不同的声音能够相互理解。你的世界里没有无法跨越的鸿沟。',
    traits: ['沟通协调', '关系连接', '团队融合', '文化翻译'],
    icon: Heart,
    gradient: 'from-green-500 to-teal-500',
    matchDimensions: ['communication', 'coordination'],
  },
];

function getCareerType(scores: CareerScores): CareerType {
  const dimensionScores = [
    { name: 'communication', score: scores.communication },
    { name: 'logic', score: scores.logic },
    { name: 'empathy', score: scores.empathy },
    { name: 'action', score: scores.action },
    { name: 'creativity', score: scores.creativity },
    { name: 'coordination', score: scores.coordination },
  ];

  const sortedDimensions = [...dimensionScores].sort((a, b) => b.score - a.score);
  const topTwoDimensions = sortedDimensions.slice(0, 2).map(d => d.name);

  for (const career of careerTypes) {
    const matchCount = career.matchDimensions.filter(dim => 
      topTwoDimensions.includes(dim)
    ).length;
    if (matchCount === 2) {
      return career;
    }
  }

  for (const career of careerTypes) {
    const matchCount = career.matchDimensions.filter(dim => 
      topTwoDimensions.includes(dim)
    ).length;
    if (matchCount === 1) {
      return career;
    }
  }

  return careerTypes[0];
}

export function CareerResultPage({ scores, onRestart, onBackToHub }: CareerResultPageProps) {
  const career = getCareerType(scores);
  const Icon = career.icon;

  const radarData = [
    { dimension: '沟通力', score: scores.communication, fullMark: 100 },
    { dimension: '逻辑力', score: scores.logic, fullMark: 100 },
    { dimension: '共情力', score: scores.empathy, fullMark: 100 },
    { dimension: '行动力', score: scores.action, fullMark: 100 },
    { dimension: '创造力', score: scores.creativity, fullMark: 100 },
    { dimension: '协调力', score: scores.coordination, fullMark: 100 },
  ];

  const barData = [
    { name: '沟通力', value: scores.communication },
    { name: '逻辑力', value: scores.logic },
    { name: '共情力', value: scores.empathy },
    { name: '行动力', value: scores.action },
    { name: '创造力', value: scores.creativity },
    { name: '协调力', value: scores.coordination },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`w-24 h-24 bg-gradient-to-br ${career.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 mb-2">{career.subtitle}</p>
          <h1 className="text-4xl mb-4 bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-gray-600">
            {career.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {career.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
      >
        <h2 className="text-xl mb-6">你的核心特质</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {career.traits.map((trait, index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`bg-gradient-to-br ${career.gradient} text-white rounded-lg p-4 text-center font-medium`}
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-xl mb-6">能力雷达图</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Radar
                name="能力值"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-xl mb-6">能力分布</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            重新测试
          </button>
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              返回测评中心
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
