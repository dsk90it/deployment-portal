import DeploymentCard from '@/exercise/DeploymentCard'
import { data } from '@/data/MOCK_DATA'

function App() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="mb-6 text-3xl font-bold">Deployment Queue</h1>

      {data.length === 0 ? (
        <p className="text-muted-foreground">No deployments found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((deployment) => (
            <DeploymentCard key={deployment.id} deployment={deployment} />
          ))}
        </div>
      )}
    </main>
  )
}

export default App
