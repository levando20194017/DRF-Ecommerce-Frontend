export const getImageUrl = (imagePath: string): string => {
    const baseUrl = process.env.REACT_APP_IMAGE_URL || ''; // Lấy URL cơ bản từ biến môi trường
    return `${baseUrl}${imagePath}`; // Kết hợp URL cơ bản với đường dẫn ảnh
};
