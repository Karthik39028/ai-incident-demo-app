import React from 'react'
import './styles.css'
import { getHealth } from './api'

function DashboardItem({label, value}) {
  return (
    <div className="item">
      <span className="label">{label}:</span>
      <span className="value">{value}</span>
    </div>
  )
}

export default function App() {
  const [health, setHealth] = React.useState({status: 'loading', service: ''})
  const [environment] = React.useState(process.env.NODE_ENV || 'development')
  const [lastDeploy] = React.useState(new Date().toLocaleString())

  React.useEffect(() => {
    getHealth().then(data => setHealth(data)).catch(() => setHealth({status: 'unreachable', service: 'incident-lab-api'}))
  }, [])

  const appStatus = health.status === 'healthy' ? 'Healthy' : 'Unhealthy'

  return (
    <div className="dashboard">
      <h1>Incident Lab Dashboard</h1>
      <DashboardItem label="Application Status" value={appStatus} />
      <DashboardItem label="API Health" value={health.status} />
      <DashboardItem label="Environment" value={environment} />
      <DashboardItem label="Last Deployment" value={lastDeploy} />
      <DashboardItem label="Deployment Status" value={'Check Netlify'} />
      <DashboardItem label="Incident Simulation" value={'Toggle netlify.toml to broken config'} />
    </div>
  )
}
