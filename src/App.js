import './App.css';
import ingridients from './utils/data';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'; 
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {

  const bun = ingridients.find((el) => el._id === '60666c42cc7b410027a1a9b1');
  const filling = ingridients.filter((el) => el._id === '60666c42cc7b410027a1a9ba' || el._id === '60666c42cc7b410027a1a9bb' || el._id === '60666c42cc7b410027a1a9b5' || el._id === '60666c42cc7b410027a1a9b6');
  
  return (
    <div className="App">
      <AppHeader />
      <main className='pl-5 pr-5'>
        <section className='ingridients-block'>
          <BurgerIngredients ingridients={ingridients} />
        </section>
        <section className='constructor-block'>
          <BurgerConstructor bun={bun} filling={filling} />
        </section>
      </main>
    </div>
  );
}

export default App;
