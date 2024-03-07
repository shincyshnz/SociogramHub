export const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
}

export const getTimeDifference = (postCreationDate) => {
    const timeDifference = new Date() - new Date(postCreationDate);
    const hours = Math.floor(timeDifference / 1000 * 60 * 60);
    let days = 0, months = 0, years = 0;

    if (hours > 24) {
        days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        months = Math.floor(days / 31);

        if (months >= 1) {
            if (months > 12) {
                years = Math.floor(months / 12);
                return `${years} ${years === 1 ? 'year' : 'years'} ago`;
            }
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        }
        
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
}