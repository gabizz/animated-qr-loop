import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export  function AppContextProvider({ children, value }) {

    const [state, setState] = useState(value||{})
    
    const dispatch = data => setState({...state, ...data})

  return (
    <AppContext.Provider value={[state, dispatch] }>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = (props) => useContext(AppContext)