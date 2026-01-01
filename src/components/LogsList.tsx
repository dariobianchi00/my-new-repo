import React, { useState } from 'react'
import { format } from 'date-fns'
import { TimeLog, NewTimeLog } from '../lib/types'
import { PROJECTS, TASK_TYPES } from '../lib/constants'

interface LogsListProps {
  logs: TimeLog[]
  onUpdate: (id: string, updates: Partial<NewTimeLog>) => Promise<{ success: boolean; error?: string }>
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
}

export function LogsList({ logs, onUpdate, onDelete }: LogsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<NewTimeLog>>({})
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const recentLogs = logs.slice(0, 20)

  const startEdit = (log: TimeLog) => {
    setEditingId(log.id)
    setEditData({
      log_date: log.log_date,
      hours: log.hours,
      project: log.project,
      task_type: log.task_type,
      notes: log.notes
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const saveEdit = async (id: string) => {
    const result = await onUpdate(id, editData)
    if (result.success) {
      setEditingId(null)
      setEditData({})
    }
  }

  const confirmDelete = (id: string) => {
    setDeletingId(id)
  }

  const cancelDelete = () => {
    setDeletingId(null)
  }

  const executeDelete = async (id: string) => {
    await onDelete(id)
    setDeletingId(null)
  }

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-warm-brown mb-4">
          Recent Logs
        </h2>
        <p className="text-gray-500 text-center py-8">
          No logs yet. Start by adding your first time entry!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-warm-brown mb-4">
        Recent Logs (Last 20)
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-sand">
              <th className="text-left py-2 px-2 text-sm md:text-base text-warm-brown font-semibold">Date</th>
              <th className="text-left py-2 px-2 text-sm md:text-base text-warm-brown font-semibold">Hours</th>
              <th className="text-left py-2 px-2 text-sm md:text-base text-warm-brown font-semibold hidden md:table-cell">Project</th>
              <th className="text-left py-2 px-2 text-sm md:text-base text-warm-brown font-semibold hidden md:table-cell">Task Type</th>
              <th className="text-left py-2 px-2 text-sm md:text-base text-warm-brown font-semibold hidden md:table-cell">Notes</th>
              <th className="text-right py-2 px-2 text-sm md:text-base text-warm-brown font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentLogs.map((log) => (
              <React.Fragment key={log.id}>
                {editingId === log.id ? (
                  <tr className="border-b border-sand bg-sand bg-opacity-20">
                    <td className="py-2 px-2">
                      <input
                        type="date"
                        value={editData.log_date || log.log_date}
                        onChange={(e) => setEditData({ ...editData, log_date: e.target.value })}
                        className="w-full px-2 py-1 border border-sand rounded text-sm"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        step="0.25"
                        min="0.25"
                        max="24"
                        value={editData.hours ?? log.hours}
                        onChange={(e) => setEditData({ ...editData, hours: parseFloat(e.target.value) })}
                        className="w-full px-2 py-1 border border-sand rounded text-sm"
                      />
                    </td>
                    <td className="py-2 px-2 hidden md:table-cell">
                      <select
                        value={editData.project || log.project}
                        onChange={(e) => setEditData({ ...editData, project: e.target.value })}
                        className="w-full px-2 py-1 border border-sand rounded text-sm"
                      >
                        {PROJECTS.map((project) => (
                          <option key={project} value={project}>
                            {project}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2 hidden md:table-cell">
                      <select
                        value={editData.task_type || log.task_type}
                        onChange={(e) => setEditData({ ...editData, task_type: e.target.value })}
                        className="w-full px-2 py-1 border border-sand rounded text-sm"
                      >
                        {TASK_TYPES.map((taskType) => (
                          <option key={taskType} value={taskType}>
                            {taskType}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2 hidden md:table-cell">
                      <input
                        type="text"
                        value={editData.notes ?? log.notes ?? ''}
                        onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                        maxLength={200}
                        className="w-full px-2 py-1 border border-sand rounded text-sm"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        onClick={() => saveEdit(log.id)}
                        className="bg-deep-green text-white px-2 py-1 rounded text-xs mr-1 hover:opacity-80"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:opacity-80"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className="border-b border-sand hover:bg-sand hover:bg-opacity-10">
                      <td className="py-2 px-2 text-sm">
                        {format(new Date(log.log_date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-2 px-2 text-sm">{log.hours}</td>
                      <td className="py-2 px-2 text-sm hidden md:table-cell">{log.project}</td>
                      <td className="py-2 px-2 text-sm hidden md:table-cell">{log.task_type}</td>
                      <td className="py-2 px-2 text-sm hidden md:table-cell">
                        {log.notes ? (
                          <span className="text-gray-700">{log.notes}</span>
                        ) : (
                          <span className="text-gray-400 italic">-</span>
                        )}
                      </td>
                      <td className="py-2 px-2 text-right">
                        {deletingId === log.id ? (
                          <>
                            <button
                              onClick={() => executeDelete(log.id)}
                              className="bg-red-600 text-white px-2 py-1 rounded text-xs mr-1 hover:bg-red-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:opacity-80"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(log)}
                              className="bg-burnt-orange text-white px-2 py-1 rounded text-xs mr-1 hover:bg-terracotta"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDelete(log.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                    {/* Mobile-only expanded view */}
                    <tr className="md:hidden border-b border-sand bg-sand bg-opacity-5">
                      <td colSpan={3} className="py-2 px-2 text-sm">
                        <div className="space-y-1">
                          <div><span className="font-semibold">Project:</span> {log.project}</div>
                          <div><span className="font-semibold">Task:</span> {log.task_type}</div>
                          {log.notes && (
                            <div><span className="font-semibold">Notes:</span> {log.notes}</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
