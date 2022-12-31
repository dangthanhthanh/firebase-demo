function errorMessage(errorCode){
    switch (errorCode) {
        case "auth/email-already-in-use":
            return ("Email được cung cấp đã được người dùng hiện tại sử dụng. Mỗi người dùng phải có một email duy nhất." );
        case 'auth/invalid-email':
            return 'Invalid email'
        case 'auth/wrong-password':
            return 'auth-wrong-password'
        case 'auth/user-not-found':
            return 'auth-user-not-found'
        default:
            break;
    }
}
export default errorMessage;
