export const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export const formatTime = (time: string): string => {
    const date = new Date(time);

    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày, đảm bảo 2 chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (0-indexed), đảm bảo 2 chữ số
    const year = date.getFullYear(); // Lấy năm

    const hours = date.getHours().toString().padStart(2, '0'); // Lấy giờ, đảm bảo 2 chữ số
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Lấy phút, đảm bảo 2 chữ số

    return `${day}/${month}/${year} . ${hours}:${minutes}`;
};
