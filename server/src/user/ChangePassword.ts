import { getAuth, updatePassword } from "firebase/auth";

const changePassword = async (newPassword: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    try {
        if (user) {
            await updatePassword(user, newPassword);
            return { success: true, message: 'Password updated successfully' };
        } else {
            throw new Error('User not authenticated');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

export { changePassword };