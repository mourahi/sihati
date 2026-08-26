import { Navigate, useParams } from 'react-router-dom'
import { workouts } from '../data/content'
import { programPathForZone } from '../lib/zones'

export default function WorkoutRedirect() {
  const { videoId } = useParams<{ videoId: string }>()
  const workout = workouts.find((item) => item.youtubeId === videoId)
  return <Navigate to={workout ? programPathForZone(workout.zone) : '/programs'} replace />
}
