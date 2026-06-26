import { Routes, Route, Navigate } from 'react-router-dom'
import LoveQuiz from './pages/LoveQuiz.jsx'
import ReadyGate from './pages/ReadyGate.jsx'
import NoPage from './pages/NoPage.jsx'
import HeartGame from './pages/HeartGame.jsx'
import Surprise from './pages/Surprise.jsx'
import HeartCursor from './components/HeartCursor.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { MusicProvider } from './audio/MusicProvider.jsx'

export default function App() {
  return (
    <MusicProvider>
      <HeartCursor />
      <MusicToggle />
      <Routes>
        <Route path="/" element={<LoveQuiz />} />
        <Route path="/ready" element={<ReadyGate />} />
        <Route path="/no" element={<NoPage />} />
        <Route path="/hearts" element={<HeartGame />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MusicProvider>
  )
}
