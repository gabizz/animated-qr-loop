import { unzipSync, unzip } from 'fflate';

// multithreaded = false is slower and blocks the UI thread if the files
// inside are compressed, but it can be faster if they are not.
 export const getFilesFromZip = async (zipFile, multithreaded = true) => {
  let result 

  try {
    const zipBuffer = new Uint8Array(await zipFile.arrayBuffer());
  
    const unzipped = multithreaded && zipBuffer 
      ? await new Promise((resolve, reject) => unzip(
          zipBuffer,
          (err, unzipped) => err
            ? reject(err)
            : resolve(unzipped)
        ))
      : unzipSync(zipBuffer);
    const fileArray = Object.keys(unzipped)
      .filter(filename => unzipped[filename].length > 0)
      .map(filename => new File([unzipped[filename]], filename));
  
      if ( fileArray.length > 0 ) {
          result = fileArray.find( el => el.name.indexOf("semnatura_") < 0 )
      } else {
          result = false
      }
  } catch (error) {
      result = {error: error.toString()}
  }
 return result

}



