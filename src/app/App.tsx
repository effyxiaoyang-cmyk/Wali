import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AssessmentHub } from './components/AssessmentHub';
import { TalentAssessment } from './pages/TalentAssessment';
import { CareerAssessment } from './pages/CareerAssessment';
import { NatureAssessment } from './pages/NatureAssessment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssessmentHub />} />
        <Route path="/assessment/talent" element={<TalentAssessment />} />
        <Route path="/assessment/career" element={<CareerAssessment />} />
        <Route path="/assessment/creativity" element={<NatureAssessment />} />
        <Route path="/assessment/personality" element={<ComingSoon type="personality" />} />
        <Route path="/assessment/emotional" element={<ComingSoon type="emotional" />} />
        <Route path="/assessment/leadership" element={<ComingSoon type="leadership" />} />
        <Route path="/assessment/learning" element={<ComingSoon type="learning" />} />
        <Route path="/assessment/motivation" element={<ComingSoon type="motivation" />} />
        <Route path="/assessment/stress" element={<ComingSoon type="stress" />} />
        <Route path="/assessment/values" element={<ComingSoon type="values" />} />
      </Routes>
    </BrowserRouter>
  );
}

function ComingSoon({ type }: { type: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl mb-4">即将推出</h1>
        <p className="text-gray-600 mb-8">
          {type} 测评正在开发中，敬请期待...
        </p>
        <a
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl inline-block"
        >
          返回测评中心
        </a>
      </div>
    </div>
  );
}