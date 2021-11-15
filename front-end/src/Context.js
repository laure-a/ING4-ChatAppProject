import React, { useState } from 'react'

export const Context = React.createContext({
  user: null,
  setUser: ()=> {}
});

export const ContextProvider = ({
  children
}) => {

  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{

      user, setUser

      /*
      logout: () => {
        setUser(null)
      }*/

    }}>{children}</Context.Provider>
  )
}