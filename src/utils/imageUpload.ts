export const encodeFile = async (fileBlob: any) => {
  const reader = new FileReader();

  if (!fileBlob) return;

  return new Promise((resolve: any) => {
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      const result: any = reader.result;
      resolve(result);
    };
  });
};

export const onFileReaderChange = async (e: any) => {
  const { files } = e.target;
  if (!files || !files[0]) return;
  const uploadImage = files[0];
  console.log(uploadImage);
  return uploadImage;
};
