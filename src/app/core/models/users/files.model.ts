
export interface CustomFile extends File {
  progress: number;
}

export interface IDataFileAsigned {
  nameFile: string;
  linkFile : CustomFile;
  idUser: string;
  idAdmin: string;
}

export interface IDataFileAsignedResponse {
  error: boolean;
  message: string;
}
