import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth, Hub} from 'aws-amplify';

type UserType = CognitoUser | null | undefined;

interface AuthContextType {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<UserType>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        setUser(authUser);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data: any) => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }
    };
    const hubListenerCancelToken = Hub.listen('auth', listener);
    return () => hubListenerCancelToken();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
