export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export interface DefaultErrorResponse {
  message: string;
}

//For parsing the response Errors
export const checkHasProperty = (obj: unknown, propertyName: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, propertyName);

const checkDefaultIsError = (error: unknown): error is Error => checkHasProperty(error, 'message');
const checkIsErrorResponse = (error: unknown): error is ErrorResponse => checkHasProperty(error, 'response');

export const parseResponseErrors = (error: string | ErrorResponse | Error | DefaultErrorResponse | unknown): string => {
  let notificationString = 'Something went wrong!';

  if (!error) {
    return notificationString;
  }

  const isDefaultError = checkDefaultIsError(error);
  const isErrorResponse = checkIsErrorResponse(error);

  if (typeof error === 'string') {
    notificationString = error;
  } else if (isDefaultError && !isErrorResponse) {
    notificationString = error.message;
  } else if (!isErrorResponse) {
    notificationString = 'Network error!';
  } else if (isErrorResponse) {
    if (error.response.data.message) {
      notificationString = error.response.data.message;
    }
  }

  return notificationString;
};
