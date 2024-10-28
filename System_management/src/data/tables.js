import {
  faGoogle,
  faTwitter,
  faYahoo,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons";

import USAFlag from "../assets/img/flags/united-states-of-america.svg";
import CanadaFlag from "../assets/img/flags/canada.svg";
import GermanyFlag from "../assets/img/flags/germany.svg";
import FranceFlag from "../assets/img/flags/france.svg";
import JapanFlag from "../assets/img/flags/japan.svg";
import ItalyFlag from "../assets/img/flags/italy.svg";
const pageVisits = [
  {
    id: 1,
    views: 4.525,
    returnValue: 255,
    bounceRate: 42.55,
    pageName: "/demo/admin/index.html",
  },
  {
    id: 2,
    views: 2.987,
    returnValue: 139,
    bounceRate: -43.52,
    pageName: "/demo/admin/forms.html",
  },
  {
    id: 3,
    views: 2.844,
    returnValue: 124,
    bounceRate: -32.35,
    pageName: "/demo/admin/util.html",
  },
  {
    id: 4,
    views: 1.22,
    returnValue: 55,
    bounceRate: 15.78,
    pageName: "/demo/admin/validation.html",
  },
  {
    id: 5,
    views: 505,
    returnValue: 3,
    bounceRate: -75.12,
    pageName: "/demo/admin/modals.html",
  },
];

const pageTraffic = [
  {
    id: 1,
    source: "Direct",
    sourceType: "Direct",
    trafficShare: 51,
    content: 2.45,
    sourceIcon: faGlobeEurope,
    sourceIconColor: "gray",
  },
  {
    id: 2,
    source: "Google Search",
    sourceType: "Search / Organic",
    trafficShare: 18,
    change: 17.67,
    sourceIcon: faGoogle,
    sourceIconColor: "info",
  },
  {
    id: 3,
    source: "youtube.com",
    sourceType: "Social",
    category: "Arts and Entertainment",
    rank: 2,
    trafficShare: 27,
    sourceIcon: faYoutube,
    sourceIconColor: "danger",
  },
  {
    id: 4,
    source: "yahoo.com",
    sourceType: "Referral",
    category: "News and Media",
    rank: 11,
    trafficShare: 8,
    change: -9.3,
    sourceIcon: faYahoo,
    sourceIconColor: "purple",
  },
  {
    id: 5,
    source: "twitter.com",
    sourceType: "Social",
    category: "Social Networks",
    rank: 4,
    trafficShare: 4,
    sourceIcon: faTwitter,
    sourceIconColor: "info",
  },
];

const pageRanking = [
  {
    id: 1,
    country: "United States",
    countryImage: USAFlag,
    overallRank: 76,
    overallRankChange: -5,
    travelRank: 3,
    widgetsRank: 32,
    widgetsRankChange: 3,
  },
  {
    id: 2,
    country: "Canada",
    countryImage: CanadaFlag,
    overallRank: 106,
    overallRankChange: 17,
    travelRank: 4,
    widgetsRank: 30,
    widgetsRankChange: 3,
  },
  {
    id: 4,
    country: "France",
    countryImage: FranceFlag,
    overallRank: 112,
    overallRankChange: 10,
    travelRank: 5,
    widgetsRank: 34,
    widgetsRankChange: 7,
  },
  {
    id: 5,
    country: "Japan",
    countryImage: JapanFlag,
    overallRank: 115,
    overallRankChange: 3,
    travelRank: 7,
    travelRankChange: 1,
    widgetsRank: 39,
    widgetsRankChange: -2,
  },
  {
    id: 3,
    country: "Germany",
    countryImage: GermanyFlag,
    overallRank: 147,
    overallRankChange: -12,
    travelRank: 10,
    travelRankChange: -1,
    widgetsRank: 12,
    widgetsRankChange: -5,
  },
  {
    id: 6,
    country: "Italy",
    countryImage: ItalyFlag,
    overallRank: 220,
    overallRankChange: -56,
    travelRank: 11,
    travelRankChange: -3,
    widgetsRank: 89,
    widgetsRankChange: 2,
  },
];

const invoiceItems = [
  {
    id: 1,
    item: "Origin License",
    description: "Extended License",
    price: "999,00",
    quantity: 1,
  },
  {
    id: 2,
    item: "Custom Services",
    description: "Instalation and Customization (cost per hour)",
    price: "150,00",
    quantity: 20,
  },
  {
    id: 3,
    item: "Hosting",
    description: "1 year subcription",
    price: "499,00",
    quantity: 1,
  },
  {
    id: 4,
    item: "Platinum Support",
    description: "1 year subcription 24/7",
    price: "3999,00",
    quantity: 1,
  },
];

// MIN web
const pageContact = [
  {
    id: 1,
    fullName: "John",
    email: "john@gmail.com.vn",
    phone: "0123456789",
    createdAt: "2023-22-20 10:43:13",
    status: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu arcu, feugiat sit amet nulla quis, auctor finibus ipsum. Integer sagittis augue in lectus dapibus, a lobortis magna mollis. Nulla ac laoreet justo, vulputate cursus erat. Quisque semper felis a lacinia auctor. Curabitur ac fermentum ante. Mauris consectetur volutpat elementum. Morbi magna mi, efficitur nec interdum quis, venenatis quis libero. Fusce tempor magna id blandit eleifend. Nullam tristique ut tortor eget mollis. Nulla orci magna, tempor non turpis egestas, lobortis lobortis tellus.",
  },
  {
    id: 2,
    fullName: "David",
    email: "david@gmail.com.vn",
    phone: "9876543210",
    createdAt: "2023-07-20 10:43:13",
    status: 0,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu arcu, feugiat sit amet nulla quis, auctor finibus ipsum. Integer sagittis augue in lectus dapibus, a lobortis magna mollis. Nulla ac laoreet justo, vulputate cursus erat. Quisque semper felis a lacinia auctor. Curabitur ac fermentum ante. Mauris consectetur volutpat elementum. Morbi magna mi, efficitur nec interdum quis, venenatis quis libero. Fusce tempor magna id blandit eleifend. Nullam tristique ut tortor eget mollis. Nulla orci magna, tempor non turpis egestas, lobortis lobortis tellus.",
  },
  {
    id: 3,
    fullName: "Carol",
    email: "carol@gmail.com.vn",
    phone: 3453467899903,
    createdAt: "2023-11-20 10:43:13",
    status: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu arcu, feugiat sit amet nulla quis, auctor finibus ipsum. Integer sagittis augue in lectus dapibus, a lobortis magna mollis. Nulla ac laoreet justo, vulputate cursus erat. Quisque semper felis a lacinia auctor. Curabitur ac fermentum ante. Mauris consectetur volutpat elementum. Morbi magna mi, efficitur nec interdum quis, venenatis quis libero. Fusce tempor magna id blandit eleifend. Nullam tristique ut tortor eget mollis. Nulla orci magna, tempor non turpis egestas, lobortis lobortis tellus.",
  },
];

// MIN web
const pageBlog = [
  {
    id: 1,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    category: {
      id: 1,
      name: "Ecommerce",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    blogStatus: 1, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 2,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    category: {
      id: 1,
      name: "Ecommerce",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    blogStatus: 2, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 3,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    category: {
      id: 1,
      name: "Ecommerce",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    blogStatus: 0, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 4,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    category: {
      id: 1,
      name: "Ecommerce",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    blogStatus: 1, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 5,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    category: {
      id: 1,
      name: "Ecommerce",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    blogStatus: 0, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
];

// MIN web
const pageTag = [
  {
    id: 1,
    name: "modern",
    createdAt: "2023-22-20 10:43:13",
    status: 1,
  },
  {
    id: 2,
    name: "fashion",
    createdAt: "2023-07-20 10:43:13",
    status: 0,
  },
  {
    id: 3,
    name: "design",
    createdAt: "2023-11-20 10:43:13",
    status: 1,
  },
];

// MIN web
const pageCategory = [
  {
    id: 1,
    name: "News",
    description:
      "The Landmarks of Singapore Series features Silver-plated medallions that are beautifully crafted with selective gold-gilding",
    createdAt: "2023-22-20 10:43:13",
    status: 1,
  },
  {
    id: 2,
    name: "City",
    description:
      "The Landmarks of Singapore Series features Silver-plated medallions that are beautifully crafted with selective gold-gilding",
    createdAt: "2023-07-20 10:43:13",
    status: 1,
  },
  {
    id: 3,
    name: "Natural",
    description:
      "The Landmarks of Singapore Series features Silver-plated medallions that are beautifully crafted with selective gold-gilding",
    createdAt: "2023-11-20 10:43:13",
    status: 1,
  },
];

// MIN web
const pageCatalog = [
  {
    id: 1,
    name: "Coin",
    description:
      "The Landmarks of Singapore Series features Silver-plated medallions that are beautifully crafted with selective gold-gilding",
    createdAt: "2023-22-20 10:43:13",
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    status: 1,
  },
  {
    id: 2,
    name: "Assessories",
    description:
      "The Landmarks of Singapore Series features Silver-plated medallions that are beautifully crafted with selective gold-gilding",
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    createdAt: "2023-07-20 10:43:13",
    status: 1,
  },
  {
    id: 3,
    name: "Gift",
    description:
      "The Landmarks of Singapore Series features Silver-plated medallions that are beautifully crafted with selective gold-gilding",
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    createdAt: "2023-11-20 10:43:13",
    status: 1,
  },
];

// MIN web
const pageProduct = [
  {
    id: 1,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    price: 100,
    memberPrice: 80,
    catalog: {
      id: 1,
      name: "Coin",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    productStatus: 1, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 2,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    price: 233,
    memberPrice: 122,
    catalog: {
      id: 1,
      name: "Coin",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    productStatus: 2, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 3,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    price: 666,
    memberPrice: 0,
    catalog: {
      id: 1,
      name: "Frame",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    productStatus: 0, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 4,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    price: 76,
    memberPrice: 0,
    catalog: {
      id: 1,
      name: "Frame",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    productStatus: 1, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
  {
    id: 5,
    imageUrl: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
    title: "4 Expert Tips On How To Choose The Right Men’s Wallet",
    price: 200,
    memberPrice: 280,
    catalog: {
      id: 1,
      name: "Gift",
    },
    author: {
      id: 1,
      name: "Admin",
    },
    blogStatus: 0, // 0-Draft, 1 Puplish, 2 pending
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-22-20 10:43:13",
  },
];
const pageOrder = [
  {
    id: 1,
    guest: {
      id: 1,
      name: "Jack",
    },
    transaction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    total_cost: 100,
    shipping_cost: 80,
    orderStatus: 1, // 0-Draft, 1 Puplish, 2 pending
    location_pickup: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    order_date: "2023-22-20 10:43:13",
    amount: 10,
  },
  {
    id: 1,
    guest: {
      id: 2,
      name: "ALan",
    },
    transaction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    total_cost: 100,
    shipping_cost: 80,
    orderStatus: 0, // 0-Draft, 1 Puplish, 2 pending
    location_pickup: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    order_date: "2023-22-20 10:43:13",
    amount: 10,
  },
  {
    id: 1,
    guest: {
      id: 3,
      name: "Hola",
    },
    transaction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    total_cost: 100,
    shipping_cost: 80,
    orderStatus: 1, // 0-Draft, 1 Puplish, 2 pending
    location_pickup: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    order_date: "2023-22-20 10:43:13",
    amount: 10,
  },
  {
    id: 1,
    guest: {
      id: 4,
      name: "Peter",
    },
    transaction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    total_cost: 100,
    shipping_cost: 80,
    orderStatus: 0, // 0-Draft, 1 Puplish, 2 pending
    location_pickup: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    order_date: "2023-22-20 10:43:13",
    amount: 10,
  },
];

const pageTransaction = [
  {
    id: 1,
    transactionNumber: "Platinum Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 1, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 2,
    transactionNumber: "Platinum Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 1, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 3,
    transactionNumber: "Platinum Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 0, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 4,
    transactionNumber: "Platinum Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 2, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 5,
    transactionNumber: "Platinum Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 1, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 6,
    transactionNumber: "Platinum Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 0, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 7,
    transactionNumber: "Gold Subscription Plan",
    amount: 233,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 0, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 8,
    transactionNumber: "Gold Subscription Plan",
    amount: 243,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 0, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 9,
    transactionNumber: "Gold Subscription Plan",
    amount: 35223,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 2, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
  {
    id: 10,
    transactionNumber: "Gold Subscription Plan",
    amount: 100,
    orderDate: "2023-22-20 10:43:13",
    bankCode: "AA1122",
    bankStatus: 0, // 0-Due, 1 Paid, 2 Cancelled
    createAt: "2023-22-20 10:43:13",
  },
];

export {
  pageVisits,
  pageTraffic,
  pageContact,
  pageBlog,
  pageTag,
  pageCategory,
  pageProduct,
  pageOrder,
  pageCatalog,
  pageRanking,
  pageTransaction,
  invoiceItems,
};
