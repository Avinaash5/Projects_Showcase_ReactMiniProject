import './App.css'
import MainPage from './components/MainPage'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
const App = () => (
  <>
    <MainPage categoriesList={categoriesList} />
  </>
)

export default App
