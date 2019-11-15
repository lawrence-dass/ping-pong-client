import React from 'react'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { isAuthenticated: false }

  constructor() {
    super()
    this.updateAuthState = this.updateAuthState.bind(this)
    // this.logout = this.logout.bind(this)
  }

  updateAuthState(authState) {
    this.setState(() => {
      return { isAuthenticated: authState }
    })
  }

  // logout() {
  //   this.setState({ isAuthenticated: false })
  // }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
          updateAuthState: this.updateAuthState,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
