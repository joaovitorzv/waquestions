import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Questionary from './pages/Questionary'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/questionary' component={Questionary} />
      </Switch>
    </Router>
  )
}

export default Routes