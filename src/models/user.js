import { userService } from "../services/user.service";

export class User {
    constructor(username, password, fullname, profileImg) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.profileImg = profileImg;
    }

    static async validateUsername(username) {
        if (username.trim() === '') {
            return { type: 'denied', text: '* username cannot be empty' };
        } else if (username.trim().length < 3 || username.trim().length > 25) {
            return { type: 'denied', text: '* username must be between 3 and 25 characters' };
        }

        try {
            const exists = await userService.checkUsernameExists(username);
            return {
                type: exists ? 'denied' : 'approved',
                text: exists ? '* username already exists' : '* username available'
            };
        } catch {
            return { type: 'denied', text: 'Error checking username' };
        }
    }

    static validatePassword(password) {
        if (password.trim() === '') {
            return { type: 'denied', text: '* password cannot be empty' };
        } else if (password.trim().length < 5 || password.trim().length > 12) {
            return { type: 'denied', text: '* password must be between 5 and 12 characters' };
        }

        return { type: 'approved', text: '' };
    }

    static validateFullname(fullname) {
        if (fullname.trim() === '') {
            return { type: 'denied', text: '* full name cannot be empty' };
        }

        return { type: 'approved', text: '' };
    }

    static async validateUserData(user) {
        const usernameFeedback = await User.validateUsername(user.username);
        const passwordFeedback = User.validatePassword(user.password);
        const fullnameFeedback = User.validateFullname(user.fullname);

        const isValid = usernameFeedback.type === 'approved' &&
                        passwordFeedback.type === 'approved' &&
                        fullnameFeedback.type === 'approved';

        return {
            feedback: {
                usernameFeedback,
                passwordFeedback,
                fullnameFeedback
            },
            isValid
        };
    }
}
