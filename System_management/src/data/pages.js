
import OverviewImg from "../assets/img/pages/overview.jpg";
import NotFoundImg from "../assets/img/pages/404.jpg";
import ServerErrorImg from "../assets/img/pages/500.jpg";

import { Routes } from "../routes";


export default [
    {
        "id": 1,
        "name": "Overview",
        "image": OverviewImg,
        "link": Routes.DashboardOverview.path
    },
    {
        "id": 9,
        "name": "404",
        "image": NotFoundImg,
        "link": Routes.NotFound.path
    },
    {
        "id": 10,
        "name": "500",
        "image": ServerErrorImg,
        "link": Routes.ServerError.path
    }
];