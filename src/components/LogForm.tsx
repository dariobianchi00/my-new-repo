import React, { useState } from 'react'
import { format } from 'date-fns'
import { PROJECTS, TASK_TYPES } from '../lib/constants'
import { NewTimeLog } from '../lib/types'

interface LogFormProps {
  onSubmit: (log: NewTimeLog) => Promise<{ success: boolean; error?: string }>
}

export function LogForm({ onSubmit }: LogFormProps) {
  const today = format(new Date(), 'yyyy-MM-dd')

  const [formData, setFormData] = useState({
    log_date: today,
    hours: '',
    project: '',
    task_type: '',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate date
    if (!formData.log_date) {
      newErrors.log_date = 'Date is required'
    } else if (new Date(formData.log_date) > new Date(today)) {
      newErrors.log_date = 'Date cannot be in the future'
    }

    // Validate hours
    const hours = parseFloat(formData.hours)
    if (!formData.hours) {
      newErrors.hours = 'Hours is required'
    } else if (isNaN(hours) || hours < 0.25 || hours > 24) {
      newErrors.hours = 'Hours must be between 0.25 and 24'
    }

    // Validate project
    if (!formData.project) {
      newErrors.project = 'Project is required'
    }

    // Validate task type
    if (!formData.task_type) {
      newErrors.task_type = 'Task type is required'
    }

    // Validate notes
    if (formData.notes && formData.notes.length > 200) {
      newErrors.notes = 'Notes must be 200 characters or less'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    const result = await onSubmit({
      log_date: formData.log_date,
      hours: parseFloat(formData.hours),
      project: formData.project,
      task_type: formData.task_type,
      notes: formData.notes || undefined
    })

    if (result.success) {
      // Clear form on success
      setFormData({
        log_date: today,
        hours: '',
        project: '',
        task_type: '',
        notes: ''
      })
      setErrors({})
    } else if (result.error) {
      setErrors({ submit: result.error })
    }
    setSubmitting(false)
  }

  const handleClear = () => {
    setFormData({
      log_date: today,
      hours: '',
      project: '',
      task_type: '',
      notes: ''
    })
    setErrors({})
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-warm-brown mb-4">
        Log Time Entry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <div>
          <label htmlFor="log_date" className="block text-sm font-medium text-warm-brown mb-1">
            Date *
          </label>
          <input
            type="date"
            id="log_date"
            max={today}
            value={formData.log_date}
            onChange={(e) => setFormData({ ...formData, log_date: e.target.value })}
            className="w-full px-3 py-2 border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-orange"
          />
          {errors.log_date && (
            <p className="text-red-600 text-sm mt-1">{errors.log_date}</p>
          )}
        </div>

        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-warm-brown mb-1">
            Hours * (0.25 - 24)
          </label>
          <input
            type="number"
            id="hours"
            step="0.25"
            min="0.25"
            max="24"
            value={formData.hours}
            onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
            className="w-full px-3 py-2 border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-orange"
            placeholder="e.g., 2.5"
          />
          {errors.hours && (
            <p className="text-red-600 text-sm mt-1">{errors.hours}</p>
          )}
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-medium text-warm-brown mb-1">
            Project *
          </label>
          <select
            id="project"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            className="w-full px-3 py-2 border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-orange"
          >
            <option value="">Select a project</option>
            {PROJECTS.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
          {errors.project && (
            <p className="text-red-600 text-sm mt-1">{errors.project}</p>
          )}
        </div>

        <div>
          <label htmlFor="task_type" className="block text-sm font-medium text-warm-brown mb-1">
            Task Type *
          </label>
          <select
            id="task_type"
            value={formData.task_type}
            onChange={(e) => setFormData({ ...formData, task_type: e.target.value })}
            className="w-full px-3 py-2 border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-orange"
          >
            <option value="">Select a task type</option>
            {TASK_TYPES.map((taskType) => (
              <option key={taskType} value={taskType}>
                {taskType}
              </option>
            ))}
          </select>
          {errors.task_type && (
            <p className="text-red-600 text-sm mt-1">{errors.task_type}</p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-warm-brown mb-1">
            Notes (optional, max 200 chars)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            maxLength={200}
            rows={3}
            className="w-full px-3 py-2 border border-sand rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-orange resize-none"
            placeholder="Add any additional context..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.notes && (
              <p className="text-red-600 text-sm">{errors.notes}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.notes.length}/200
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-burnt-orange hover:bg-terracotta text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-sand hover:bg-warm-brown hover:text-white text-warm-brown font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}
