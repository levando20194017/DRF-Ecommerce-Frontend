import Breadcrumb from "../../../components/Breadcrumb";
import { OrderStatus } from "../../../components/OrderStatus";
import { Routes } from "../../Routes";
// import "../order.scss"

const OrderStatusPage = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Trạng thái đơn hàng" },
    ];
    return (
        <div>
            <div className="div-empty"></div>
            <div className="order-status-page container">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <div className="mt-4">
                    <OrderStatus />
                </div>
            </div>
        </div>
    );
};

export default OrderStatusPage;
