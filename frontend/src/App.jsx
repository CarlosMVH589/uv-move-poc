import { useEffect, useState } from "react";
import LoginScreen from "./pages/LoginScreen";
import UVMove from "./pages/UVMove";
import { isSupabaseConfigured, supabase } from "./services/supabaseClient";

function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return undefined;

    let isMounted = true;
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (isMounted) {
        setSession(currentSession);
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="uvm-auth-loading">Verificando sesión...</div>;
  }

  return session ? <UVMove session={session} /> : <LoginScreen />;
}

export default App;

