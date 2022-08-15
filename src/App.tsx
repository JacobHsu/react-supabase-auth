import React from 'react';
import { Auth, Typography, Button } from '@supabase/ui'
import { supabase } from './supabaseClient'
import './App.css';


const Container = (props: { supabaseClient: { auth: { signOut: () => void; }; }; children: any; }) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

function App() {
  return (
    <div className="App">
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}>
          {/* <Auth supabaseClient={supabase} /> */}
          <Auth onlyThirdPartyProviders={true} supabaseClient={supabase} providers={['google', 'facebook', 'github']} />
        </Container>
      </Auth.UserContextProvider>
    </div>
  );
}

export default App;
