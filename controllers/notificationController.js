import db from "../config/db.js";
import { getNotificationRepo } from "../repositories/notification.repo.js";

export const getAllNotification = async (req, res) => {
    try {
        const result = await getNotificationRepo()
        if (result.length === 0) {
            return res.status(404).json({ message: "No notifications found " })
        }
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ message: "server error" })
        // console.error("server",error)
    }

}