import { motion } from 'motion/react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Waves, TreePine, Sparkles, Mountain, Wind, Flower2, Home } from 'lucide-react';

export interface NatureScores {
  depth: number;
  warmth: number;
  energy: number;
  stability: number;
  sensitivity: number;
  freedom: number;
}

interface NatureResultPageProps {
  scores: NatureScores;
  onRestart: () => void;
  onBackToHub?: () => void;
}

interface NatureType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  poem: string;
  traits: string[];
  icon: any;
  gradient: string;
  bgGradient: string;
  matchDimensions: string[];
}

const natureTypes: NatureType[] = [
  {
    id: 'whale-song',
    title: '深海鲸歌',
    subtitle: 'Deep Ocean Whale',
    description: '你的内心深邃而丰富，拥有强大的内在智慧和直觉力。不常表达，但每次出声都能引起深深的共鸣。你的存在如同深海，平静的表面下蕴藏着浩瀚的世界。',
    poem: '静水流深，星河倒映\n不语之中，自有天地',
    traits: ['深度思考', '内在智慧', '含蓄表达', '长期影响'],
    icon: Waves,
    gradient: 'from-blue-600 to-indigo-600',
    bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
    matchDimensions: ['depth', 'sensitivity'],
  },
  {
    id: 'forest-guide',
    title: '森林向导',
    subtitle: 'Forest Nurturer',
    description: '你温暖、包容且富有生命力，善于滋养和支持他人成长。你的存在就像森林，为所有靠近你的人提供庇护和养分。你是朋友中的"定心丸"。',
    poem: '绿意盎然，生生不息\n你的温暖，滋养万物',
    traits: ['包容滋养', '稳定支持', '生命力强', '关系连接'],
    icon: TreePine,
    gradient: 'from-green-600 to-emerald-600',
    bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
    matchDimensions: ['warmth', 'stability'],
  },
  {
    id: 'meteor-fire',
    title: '流星焰火',
    subtitle: 'Shooting Star',
    description: '你拥有瞬间的爆发力、创意和激情，能在短时间内聚焦能量，创造高光时刻。你的出现总是令人惊艳，留下难以磨灭的印象。',
    poem: '刹那璀璨，一闪而过\n你的光芒，永恒难忘',
    traits: ['瞬间爆发', '创意激情', '强烈感染', '高光时刻'],
    icon: Sparkles,
    gradient: 'from-orange-500 to-pink-500',
    bgGradient: 'from-orange-50 via-pink-50 to-rose-50',
    matchDimensions: ['energy', 'freedom'],
  },
  {
    id: 'mountain-rock',
    title: '高山磐石',
    subtitle: 'Mountain Foundation',
    description: '你可靠、稳定且有清晰的边界，善于构建体系和规则。你是团队中的基石，为所有人提供支撑和方向。人们知道，有你在就有安全感。',
    poem: '巍然不动，千年如一\n你的坚定，众生依靠',
    traits: ['稳定可靠', '体系构建', '清晰边界', '长期主义'],
    icon: Mountain,
    gradient: 'from-gray-600 to-slate-600',
    bgGradient: 'from-gray-50 via-slate-50 to-zinc-50',
    matchDimensions: ['stability', 'depth'],
  },
  {
    id: 'spring-breeze',
    title: '春风化雨',
    subtitle: 'Gentle Spring Wind',
    description: '你温柔而有力量，善于用细腻的方式影响他人。你的存在如春风，润物细无声，却能让万物复苏。你懂得等待和陪伴的力量。',
    poem: '轻柔拂过，万物生长\n你的温柔，治愈人心',
    traits: ['温和力量', '细腻感知', '润物无声', '长期陪伴'],
    icon: Wind,
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-50 via-sky-50 to-blue-50',
    matchDimensions: ['warmth', 'sensitivity'],
  },
  {
    id: 'wild-flower',
    title: '荒野繁花',
    subtitle: 'Wild Blossom',
    description: '你自由、独立且充满生命力，在任何环境中都能找到属于自己的生长方式。你不需要刻意栽培，却能绽放出最真实的美丽。',
    poem: '随风摇曳，自在生长\n你的自由，无拘无束',
    traits: ['自由精神', '独立成长', '适应力强', '真实绽放'],
    icon: Flower2,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 via-fuchsia-50 to-pink-50',
    matchDimensions: ['freedom', 'energy'],
  },
];

function getNatureType(scores: NatureScores): NatureType {
  const dimensionScores = [
    { name: 'depth', score: scores.depth },
    { name: 'warmth', score: scores.warmth },
    { name: 'energy', score: scores.energy },
    { name: 'stability', score: scores.stability },
    { name: 'sensitivity', score: scores.sensitivity },
    { name: 'freedom', score: scores.freedom },
  ];

  const sortedDimensions = [...dimensionScores].sort((a, b) => b.score - a.score);
  const topTwoDimensions = sortedDimensions.slice(0, 2).map(d => d.name);

  for (const nature of natureTypes) {
    const matchCount = nature.matchDimensions.filter(dim => 
      topTwoDimensions.includes(dim)
    ).length;
    if (matchCount === 2) {
      return nature;
    }
  }

  for (const nature of natureTypes) {
    const matchCount = nature.matchDimensions.filter(dim => 
      topTwoDimensions.includes(dim)
    ).length;
    if (matchCount === 1) {
      return nature;
    }
  }

  return natureTypes[0];
}

export function NatureResultPage({ scores, onRestart, onBackToHub }: NatureResultPageProps) {
  const nature = getNatureType(scores);
  const Icon = nature.icon;

  const radarData = [
    { dimension: '深度', score: scores.depth, fullMark: 100 },
    { dimension: '温度', score: scores.warmth, fullMark: 100 },
    { dimension: '能量', score: scores.energy, fullMark: 100 },
    { dimension: '稳定', score: scores.stability, fullMark: 100 },
    { dimension: '敏感', score: scores.sensitivity, fullMark: 100 },
    { dimension: '自由', score: scores.freedom, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`w-32 h-32 bg-gradient-to-br ${nature.gradient} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}
        >
          <Icon className="w-16 h-16 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 mb-3 tracking-widest">{nature.subtitle}</p>
          <h1 className="text-5xl mb-6 bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-gray-600 font-serif">
            {nature.title}
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {nature.description}
            </p>
            <div className={`bg-gradient-to-r ${nature.gradient} bg-opacity-10 rounded-2xl p-6`}>
              <p className="text-gray-700 leading-loose whitespace-pre-line font-serif italic">
                {nature.poem}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-8 mb-8"
      >
        <h2 className="text-2xl mb-8 text-center">你的灵魂特质</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {nature.traits.map((trait, index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${nature.gradient} text-white rounded-xl p-6 text-center font-medium shadow-lg hover:shadow-xl transition-all`}>
                {trait}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <h3 className="text-xl mb-6 text-center">天赋形态图谱</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: '#6b7280', fontSize: 14, fontWeight: 500 }} 
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#9ca3af', fontSize: 11 }} 
                />
                <Radar
                  name="灵魂特质"
                  dataKey="score"
                  stroke="url(#gradient)"
                  fill="url(#gradient)"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8 mb-8"
      >
        <h2 className="text-2xl mb-6 text-center">灵魂地貌解读</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${nature.gradient}`}></span>
              你的能量特质
            </h3>
            <p className="text-sm leading-relaxed">
              {nature.title}型的你，拥有独特的能量流动方式。你的力量来自内在深处，
              不需要外界的喧嚣来证明自己的存在。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${nature.gradient}`}></span>
              你的成长方式
            </h3>
            <p className="text-sm leading-relaxed">
              保持真实，按照自己的节奏前进。不要试图改变你的本质，
              而是学会欣赏和发挥你独特的天赋。
            </p>
          </div>
        </div>
      </motion.div>

      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className={`px-8 py-3 bg-gradient-to-r ${nature.gradient} text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl`}
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
