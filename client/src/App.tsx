import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Landing } from './components/Landing/Landing';
import { Home } from './components/Home/Home';
import { Tateti } from './components/Ta-Te-Ti/Tateti';
import { Buscaminas } from './components/Buscaminas/Buscaminas';
import { Test } from './components/Test/Test';
import { SpaceShooter } from './components/SpaceShooter/SpaceShooter';

function App()
{
  return(
    <Routes>
      <Route path='/' element={ <Landing />} />
      <Route path='/home' element={ <Home />} />
      <Route path='/test' element={ <Test />} />
      <Route path='/tateti' element={ <Tateti />} />
      <Route path='/space' element={ <SpaceShooter />} />
      <Route path='/buscaminas' element={ <Buscaminas />} />
    </Routes>
  )
}

export default App;
