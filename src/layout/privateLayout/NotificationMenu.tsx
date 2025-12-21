import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

interface NotificationMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ open, onOpenChange }) => {
    const { t } = useTranslation();
    // Sample notifications data - Replace with real data from API
    const notifications: Notification[] = [
        {
            id: 1,
            title: "New Message",
            message: "You have received a new message from admin",
            time: "5 min ago",
            read: false
        },
        {
            id: 2,
            title: "System Update",
            message: "System maintenance scheduled for tonight",
            time: "1 hour ago",
            read: false
        },
        {
            id: 3,
            title: "Payment Received",
            message: "Your payment has been processed successfully",
            time: "2 hours ago",
            read: true
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-lg"
                    className="relative"
                >
                    <Bell className="size-6" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute  -top-1 -start-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">{t('header.notifications.title')}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-0"
                align="start"
                sideOffset={8}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{t('header.notifications.title')}</h3>
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                                {unreadCount} {t('header.notifications.unread')}
                            </Badge>
                        )}
                    </div>
                    <Separator className="mb-3" />
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                {t('header.notifications.noNotifications')}
                            </p>
                        ) : (
                            notifications.map((notification, index) => (
                                <React.Fragment key={notification.id}>
                                    <div
                                        className={`p-3 rounded-md transition-colors hover:bg-accent cursor-pointer ${!notification.read ? 'bg-accent/50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-foreground">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0"></div>
                                            )}
                                        </div>
                                    </div>
                                    {index < notifications.length - 1 && (
                                        <Separator />
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </div>
                    {notifications.length > 0 && (
                        <>
                            <Separator className="my-3" />
                            <Button
                                variant="primary"
                                className="w-full text-sm"
                                onClick={() => onOpenChange(false)}
                            >
                                {t('header.notifications.viewAll')}
                            </Button>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationMenu;
