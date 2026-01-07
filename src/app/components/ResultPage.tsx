import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Trophy, Sparkles, Users, Lightbulb, Palette, Target, Home } from 'lucide-react';

export interface TalentScores {
  logic: number;
  creativity: number;
  interpersonal: number;
  leadership: number;
  artistic: number;
  analytical: number;
}

interface ResultPageProps {
  scores: TalentScores;
  onRestart: () => void;
  onBackToHub?: () => void;
}

export function ResultPage({ scores, onRestart, onBackToHub }: ResultPageProps) {
  const chartData = [
    { talent: '逻辑思维', score: scores.logic, fullMark: 100 },
    { talent: '创造力', score: scores.creativity, fullMark: 100 },
    { talent: '人际交往', score: scores.interpersonal, fullMark: 100 },
    { talent: '领导力', score: scores.leadership, fullMark: 100 },
    { talent: '艺术感知', score: scores.artistic, fullMark: 100 },
    { talent: '分析能力', score: scores.analytical, fullMark: 100 },
  ];

  const topTalent = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b));
  
  const talentNames: Record<string, string> = {
    logic: '逻辑思维',
    creativity: '创造力',
    interpersonal: '人际交往',
    leadership: '领导力',
    artistic: '艺术感知',
    analytical: '分析能力',
  };

  const talentIcons: Record<string, any> = {
    logic: Target,
    creativity: Sparkles,
    interpersonal: Users,
    leadership: Trophy,
    artistic: Palette,
    analytical: Lightbulb,
  };

  const talentDescriptions: Record<string, string> = {
    logic: '你擅长系统化思考，能够通过逻辑推理解决复杂问题。适合从事程序开发、工程设计、数学研究等需要严密逻辑的工作。',
    creativity: '你具有丰富的想象力和创新思维，善于从不同角度看待问题。适合从事设计、营销策划、内容创作等需要创意的领域。',
    interpersonal: '你善于理解他人情绪，建立良好的人际关系。适合从事人力资源、客户服务、心理咨询等需要与人打交道的工作。',
    leadership: '你具有出色的组织协调能力和影响力，能够激励团队达成目标。适合从事管理、创业、项目负责等领导性工作。',
    artistic: '你对美有独特的感知力，能够欣赏和创造艺术作品。适合从事艺术创作、设计、表演等需要审美能力的领域。',
    analytical: '你擅长收集信息、分析数据，从复杂信息中提炼关键洞察。适合从事数据分析、市场研究、战略规划等需要分析能力的工作。',
  };

  const TopIcon = talentIcons[topTalent[0]];

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
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <TopIcon className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-3xl mb-4">你的天赋测试结果</h1>
        <p className="text-gray-600">
          你的主要天赋是：<span className="text-blue-600 font-semibold">{talentNames[topTalent[0]]}</span>
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-xl mb-6 text-center">天赋雷达图</h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="talent" tick={{ fill: '#6b7280', fontSize: 14 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Radar
              name="天赋分数"
              dataKey="score"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-xl mb-6">详细分析</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map(([key, value]) => {
              const Icon = talentIcons[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{talentNames[key]}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="bg-blue-600 h-2 rounded-full"
                          />
                        </div>
                        <span className="text-sm font-medium text-blue-600">{value}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{talentDescriptions[key]}</p>
                </motion.div>
              );
            })}
        </div>
      </div>

      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
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