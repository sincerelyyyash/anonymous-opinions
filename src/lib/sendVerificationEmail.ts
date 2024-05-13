import {resend} from "@/lib/resend"
import emailTemplate  from "@/lib/EmailTemplate"
import { ApiResponse } from "@/types/apiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'Anonymous Opinions | Verification code',
            react: emailTemplate({username, otp: verifyCode}),
        });
        return {success: true , message: 'Verification email sent successfully'}
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {success: false, message: 'Failed to send verificatione email'}
    }
}