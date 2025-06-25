export interface Workout {
  id: string;
  name: string;
  description?: string | null;
  duration?: number | null;
  createdAt: string;
  updateAt: string;
  sessions?: Session[];
}

export interface Session {
  id: string;
  date: string;
  notes?: string | null;
  workoutId: string;
  workout: Workout;
}
