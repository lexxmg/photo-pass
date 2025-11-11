const URL: string = 'http://192.168.0.107:8080';

export type Result = {
  message: string;
  photo: string;
  success: boolean;
  text_data: TextData;
};

type TextData = {
  cardNumber: string;
  companyName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  position: string;
  received_at: string;
};

export const sendDataToServer = async (formDataToSend: globalThis.FormData): Promise<Result> => {
  const res = await fetch(URL, {
    method: 'POST',
    body: formDataToSend,
  });

  return res.json();
};
