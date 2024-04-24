import { AuthProvider} from './src/AuthContext.js';

import AppNav from './src/Navigation/AppNav.js';

export default function App() {

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );

}