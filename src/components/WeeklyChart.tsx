import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { startOfWeek, format, subWeeks, parseISO, isWithinInterval, startOfDay } from 'date-fns'
import { TimeLog } from '../lib/types'
import { PROJECTS, PROJECT_COLORS } from '../lib/constants'

interface WeeklyChartProps {
  logs: TimeLog[]
}

export function WeeklyChart({ logs }: WeeklyChartProps) {
  const chartData = useMemo(() => {
    const today = startOfDay(new Date())
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 }) // Monday = 1

    // Generate 4 weeks of data (current week + 3 previous weeks)
    const weeks = Array.from({ length: 4 }, (_, i) => {
      const weekStart = subWeeks(currentWeekStart, 3 - i)
      return {
        weekStart,
        weekLabel: `Week of ${format(weekStart, 'MMM dd')}`,
        data: {} as Record<string, number>
      }
    })

    // Initialize all projects to 0 for each week
    weeks.forEach(week => {
      PROJECTS.forEach(project => {
        week.data[project] = 0
      })
    })

    // Aggregate logs by week and project
    logs.forEach(log => {
      const logDate = parseISO(log.log_date)

      weeks.forEach(week => {
        const weekEnd = new Date(week.weekStart)
        weekEnd.setDate(weekEnd.getDate() + 7)

        if (isWithinInterval(logDate, { start: week.weekStart, end: weekEnd })) {
          week.data[log.project] = (week.data[log.project] || 0) + log.hours
        }
      })
    })

    // Format for Recharts
    return weeks.map(week => ({
      week: week.weekLabel,
      ...week.data
    }))
  }, [logs])

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-warm-brown mb-4">
        Weekly Time Distribution
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E8C4A0" />
          <XAxis
            dataKey="week"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#8B5A3C', fontSize: 12 }}
          />
          <YAxis
            label={{
              value: 'Hours',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#8B5A3C', fontSize: 14, fontWeight: 'bold' }
            }}
            tick={{ fill: '#8B5A3C' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #E8C4A0',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#8B5A3C', fontWeight: 'bold' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px'
            }}
            iconType="square"
          />
          {PROJECTS.map((project) => (
            <Bar
              key={project}
              dataKey={project}
              stackId="a"
              fill={PROJECT_COLORS[project]}
              name={project}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-3 bg-sand bg-opacity-20 rounded-md">
        <p className="text-sm text-warm-brown">
          <strong>Tip:</strong> Track your time daily to see patterns emerge.
          Are you spending enough time on strategic work vs administrative tasks?
        </p>
      </div>
    </div>
  )
}
