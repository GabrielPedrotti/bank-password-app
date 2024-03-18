import axiosInstance from '../axios/axios'

export const getUserAccount = async (accountNumber: string) => {
  const response = await axiosInstance.get(`/bankId/${accountNumber}`);
  return response.data;
};

export const getPasswordKeyboard = async (accountNumber: string, sessionId: string) => {
  const response = await axiosInstance.get(`/user/${accountNumber}/bank-keyboard`, {headers: {sessionId}});
  return response.data;
}

export const checkPassword = async (accountNumber: string, password: Array<any>, sessionId: string) => {
  const object ={
    "bankId": accountNumber,
    "keyboardPassword": password
  }
  const response = await axiosInstance.put(`/check-password`, object, {headers: {sessionId}});
  return response.data;
}