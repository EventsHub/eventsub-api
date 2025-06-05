import { config } from "dotenv";
import { CorsOptions } from "cors";

config();

const origin = process.env.MODE === "homolog" ? true : [
    "https://www.eventshub.com.br",
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
