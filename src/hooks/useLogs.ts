import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { TimeLog, NewTimeLog } from '../lib/types'

export function useLogs() {
  const [logs, setLogs] = useState<TimeLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('time_logs')
        .select('*')
        .order('log_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error
      setLogs(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addLog = async (log: NewTimeLog) => {
    try {
      const { data, error } = await supabase
        .from('time_logs')
        .insert([log])
        .select()

      if (error) throw error
      if (data) {
        setLogs([...data, ...logs])
      }
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  const updateLog = async (id: string, updates: Partial<NewTimeLog>) => {
    try {
      const { data, error } = await supabase
        .from('time_logs')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      if (data) {
        setLogs(logs.map(log => log.id === id ? data[0] : log))
      }
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  const deleteLog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('time_logs')
        .delete()
        .eq('id', id)

      if (error) throw error
      setLogs(logs.filter(log => log.id !== id))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return {
    logs,
    loading,
    error,
    addLog,
    updateLog,
    deleteLog,
    refreshLogs: fetchLogs
  }
}
