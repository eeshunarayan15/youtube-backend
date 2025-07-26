import React from 'react'
import MyForm from './components/MyForm'
import Read from './Read';



const App = () => {
  return (
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center flex-col">
      <MyForm />
      <Read/>
    </div>
  );
}

export default App