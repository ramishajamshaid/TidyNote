export const formateDate = (date) => {
    const formattedDate = new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
    return formattedDate;
}

export const allNotesCount = (listItem)=>{
    return listItem.filter(item => !item.isTrashed).length
}

export const favNotesCount = (listItem)=>{
    return listItem.filter(item => item.isFavourite === true && !item.isTrashed).length
}

export const trashedNotesCount = (listItem)=>{
    return listItem.filter(item => item.isTrashed).length
}

export const timeAgo = (date) => {
    const now = new Date()
    const updated = new Date(date)

    const diffInSeconds = Math.floor((now - updated) / 1000)

    if (diffInSeconds < 60) {
        return "just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)

    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)

    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`
    }

    const diffInYears = Math.floor(diffInDays / 365)

    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`
}

export const daysLeftInTrash = (trashedAt) => {
    if (!trashedAt) return 0;

    const trashDate = new Date(trashedAt);
    const deleteDate = new Date(trashDate);

    deleteDate.setDate(deleteDate.getDate() + 30);

    const now = new Date();

    const diff = deleteDate - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return Math.max(daysLeft, 0);
};