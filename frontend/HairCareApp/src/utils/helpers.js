export const formatErrorMessage = (errorDetail, otherMsg) => {
    try {
        if (typeof errorDetail === 'object' && errorDetail !== null && errorDetail.length > 0) {
            const field = errorDetail[0]["loc"][1].replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            const message = errorDetail[0]["msg"];
            return `${field}: ${message}`;
        } else {
            return JSON.stringify(errorDetail) || otherMsg;
        }
    } catch (error) {
        console.error('Error formatting message:', error);
        return JSON.stringify(errorDetail);
    }
};
