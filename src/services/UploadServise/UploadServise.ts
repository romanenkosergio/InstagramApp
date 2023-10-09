import {useState} from 'react';
import {Storage} from 'aws-amplify';
import {v4 as uuidV4} from 'uuid';
import {Alert} from 'react-native';
import {StoragePutConfig} from '@aws-amplify/storage/src/types/Storage';

const useUploadService = (hideProgress = false) => {
  const [progress, setProgress] = useState<number>(0);
  const uploadMedia = async (uri: string) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      const s3Config: StoragePutConfig<any> = hideProgress
        ? {}
        : {
            progressCallback: (newProgress: any) =>
              setProgress(newProgress.loaded / newProgress.total),
          };

      const s3Response = await Storage.put(
        `${uuidV4()}.${extension}`,
        blob,
        s3Config,
      );
      return s3Response.key;
    } catch (e) {
      Alert.alert('Error uploading the file', (e as Error).message);
    }
  };
  return {uploadMedia, progress};
};

export default useUploadService;
