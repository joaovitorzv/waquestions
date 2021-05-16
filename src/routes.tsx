import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Questionary from './pages/Questionary'
import Attempts from './pages/Attempts'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/questionary' component={Questionary} />
        <Route path='/attempts' component={Attempts} />
      </Switch>
    </Router>
  )
}

export default Routes