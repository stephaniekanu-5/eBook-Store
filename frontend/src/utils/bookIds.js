export const getBookId = (book) => book?._id || book?.id;

export const isSameBook = (book, id) => String(getBookId(book)) === String(id);
