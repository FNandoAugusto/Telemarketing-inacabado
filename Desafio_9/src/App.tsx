import './App.css'
import { MainRoutes } from './routes/routes'
import { MainProvider } from './context/Contexto'

function App() {


  return (
    <MainProvider>
      <MainRoutes />
    </MainProvider>
  )
}

export default App
