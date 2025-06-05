import morgan from "morgan";

morgan.token("req-size-mb", (req: any) => {
    const body = req.body;
    if (!body) return "0 MB";

    try {
        const bytes = Buffer.byteLength(JSON.stringify(body));
        const mb = (bytes / (1024 * 1024)).toFixed(2);

        return `${mb} MB`;
    } catch {
        return "error";
    }
});

export default morgan("[:date[iso]] :status :method :url :response-time :remote-addr :req-size-mb");
