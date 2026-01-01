export interface TimeLog {
  id: string
  log_date: string
  hours: number
  project: string
  task_type: string
  notes?: string
  created_at: string
}

export type NewTimeLog = Omit<TimeLog, 'id' | 'created_at'>
