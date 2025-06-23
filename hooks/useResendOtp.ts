import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

type OtpResendResponse = {
  success: boolean;
  message: string;
};

type OtpResendError = {
  message: string;
  errors?: Record<string, string[]>;
};

type UseResendOtpProps = {
  onSuccess?: (response: OtpResendResponse) => void;
  onError?: (error: OtpResendError) => void;
  debug?: boolean; // Optional debug mode
};

const useResendOtp = ({ 
  onSuccess, 
  onError,
  debug = false 
}: UseResendOtpProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<OtpResendError | null>(null);
  const [response, setResponse] = useState<OtpResendResponse | null>(null);

  const resendOtp = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<OtpResendResponse> = await axios.post(
        '/api/resend-code',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`, 
          },
        }
      );

      const responseData = response.data;
      if (debug) toast.success('Otp sent');
      
      setResponse(responseData);

      if (responseData.success) {
        if (debug) console.log('OTP resend successful');
        if (onSuccess) {
          onSuccess(responseData);
        }
      } else {
        if (onError) {
          onError({ 
            message: responseData.message || 'OTP resend failed' 
          });
        }
      }

      return responseData;
    } catch (error) {
      const axiosError = error as AxiosError<OtpResendError>;
      const errorData = axiosError.response?.data || { 
        message: axiosError.message || 'An unknown error occurred' 
      };

      if (debug) toast.error(errorData.message);
      
      setError(errorData);

      if (onError) {
        onError(errorData);
      }

      return { success: false, ...errorData };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resendOtp,
    isLoading,
    error,
    response,
    reset: () => {
      setError(null);
      setResponse(null);
    }
  };
};

export default useResendOtp;