//CSS
import './App.css'

//Importing Components
 import WebsiteName from './components/WebsiteName';
 import Hero from './components/Hero';
 import InputElement from './components/InputElement';
 import OutputElement from './components/OutputElement';
 import Error from './components/Error';

//Hooks
import { useSelector } from 'react-redux';
function App() {
  const error = useSelector(store => store.errors);
  return (
    <>
      <div className='main_container'>
        <WebsiteName />
        <Hero />
        <InputElement />
        {error && <Error error = {error.errorMessage}/>}
        <OutputElement />
      </div>
    </>
  )
}

export default App
