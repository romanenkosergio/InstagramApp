import {useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';

const useUserService = (
  key?: string,
): {
  imageUri: string | null;
} => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  useEffect(() => {
    if (key) {
      Storage.get(key).then(setImageUri);
    }
  }, [key]);

  return {imageUri};
};

export default useUserService;
