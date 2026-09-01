import { MailTransport } from "../mail";
import { NotificationTransport } from "../types/notification-types";

const transports: NotificationTransport[] = []

export const createNotificationTransport = (type: "mail" | "sms") => {
  switch (type) {
    case "mail":{
        const requiredTransportCache = transports.find((transport)=> transport instanceof MailTransport)
        if(requiredTransportCache) return requiredTransportCache
        const instance = new MailTransport()
        transports.push(instance)
        return instance
    }
    case "sms":
        return new Error("Sms notification is not supported")  
    default:
        return new Error(`${type} Notification provider is not supported`)     
  }
};
