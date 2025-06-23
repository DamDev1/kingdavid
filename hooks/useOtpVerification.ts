import axios, { AxiosError, AxiosResponse } from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";

type OtpVerificationResponse = {
    message: string,
    success: boolean,
    token?: string
}

type OtpVerificationError = {
    message: string,
    error?: Record<string, string[]>
}

type UseOtpVerificationProps = {
    onSuccess: (response: OtpVerificationResponse) => void,
    onError: (response: OtpVerificationError) => void
    debug?: boolean;
}

const useOtpVerification = ({ onSuccess, onError, debug = false }: UseOtpVerificationProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<OtpVerificationError | null>(null)
    const [isVerified, setIsVerified] = useState(false)
    const [response, setResponse] = useState<OtpVerificationResponse | null>(null)
    const navigate = useRouter()


    const verifyOtp = async (code: string, email: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response: AxiosResponse<OtpVerificationResponse> = await axios.post(
                '/api/validate-code', // Replace with your actual API endpoint
                { code, email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers here
                    },
                }
            );
            const responseData = response.data
            if (debug) toast.success(
                "Verification successful"
            )
            navigate.push('/login')
            setResponse(responseData)
            setIsVerified(responseData?.success)

            if (responseData.success && onSuccess) {
                onSuccess(responseData);
            }

            return responseData;
        } catch (error) {
            const axiosError = error as AxiosError<OtpVerificationError>;
            const errorData = axiosError.response?.data || { message: 'An unknown error occurred' };

            if (debug) toast.error(errorData.message);

            if (errorData.message === "User already verified. Please login.") {
                setTimeout(() => {
                    window.location.href = '/login'; // or use your routing method
                }, 1000);
            }
            setError(errorData);
            setIsVerified(false);

            if (onError) {
                onError(errorData);
            }

            return { success: false, ...errorData };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        verifyOtp,
        isLoading,
        error,
        isVerified,
        response,
        reset: () => {
            setError(null);
            setIsVerified(false);
            setResponse(null);
        },
    };
}

export default useOtpVerification;