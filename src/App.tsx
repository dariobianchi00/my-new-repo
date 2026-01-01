import { Layout } from './components/Layout'
import { LogForm } from './components/LogForm'
import { WeeklyChart } from './components/WeeklyChart'
import { LogsList } from './components/LogsList'
import { useLogs } from './hooks/useLogs'

function App() {
  const { logs, loading, error, addLog, updateLog, deleteLog } = useLogs()

  if (loading) {
    return (
      <Layout>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-burnt-orange"></div>
          <p className="mt-4 text-warm-brown">Loading your time logs...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <LogForm onSubmit={addLog} />

      <WeeklyChart logs={logs} />

      <LogsList
        logs={logs}
        onUpdate={updateLog}
        onDelete={deleteLog}
      />
    </Layout>
  )
}

export default App
