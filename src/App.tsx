import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import NutritionDetail from './pages/NutritionDetail'
import ProgramDetail from './pages/ProgramDetail'
import Programs from './pages/Programs'
import Workouts from './pages/Workouts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:videoId" element={<Workouts />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/:id" element={<NutritionDetail />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
