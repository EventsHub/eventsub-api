import { config } from "dotenv";
import { CorsOptions } from "cors";

config();

const origin = process.env.MODE === "homolog" ? true : [
    'eventsub.vercel.app',
    'eventsub-leoohhs-projects.vercel.app',
];

export default {
    credentials: true,
    origin,
    methods: [
        "GET",
        "POST",
        "PATCH",
        "DELETE",
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Date",
        "Origin",
        "Accept",
        "Cookie",
        "Set-Cookie",
        "X-XSRF-TOKEN",
        "Accept-Language",
    ],
} as CorsOptions;
