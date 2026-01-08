import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { sendSuccess, sendError } from "../utils/response.js";
import { generateRawResetToken, hashResetToken } from "../utils/resetToken.js";
import { getUserByEmail, updateUserPasswordById } from "../models/userModel.js";
import { createPasswordReset, findValidResetByTokenHash, markResetUsed, invalidateAllResetsForUser } from "../models/passwordResetModel.js";

dotenv.config();

// Get environment variables
const RESET_MINUTES = Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 15);
const FRONTEND_RESET_URL = process.env.FRONTEND_RESET_URL || "http://localhost:5173/password/reset";

// Forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);

        // Security best-practice: don't reveal if email exists
        if (!user) {
            return sendSuccess(res, "If the email exists, you will receive a reset link.");
        }

        // Invalidate previous active tokens for this user
        await invalidateAllResetsForUser(user.id);

        // Generate password reset token
        const rawToken = generateRawResetToken();
        const tokenHash = hashResetToken(rawToken);
        const expiresAt = new Date(Date.now() + RESET_MINUTES * 60 * 1000);

        // Insert token in the table
        await createPasswordReset(user.id, tokenHash, expiresAt);

        // Return reset link (instead of sending email)
        const resetLink = `${FRONTEND_RESET_URL}?token=${rawToken}`;
        return sendSuccess(res, "If the email exists, you will receive a reset link", { resetLink, expiresInMinutes: RESET_MINUTES });

    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const tokenHash = hashResetToken(token);

        // Check if that token exists in the table
        const resetRow = await findValidResetByTokenHash(tokenHash);

        if (!resetRow) {
            return sendError(res, "Invalid or expired reset token", 400);
        }

        // Update password
        const hashedPassword = await bcrypt.hash(password, 10);
        await updateUserPasswordById(resetRow.user_id, hashedPassword);

        // Mark password reset token as used
        await markResetUsed(resetRow.id)

        return sendSuccess(res, "Password reset successfully");

    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
}