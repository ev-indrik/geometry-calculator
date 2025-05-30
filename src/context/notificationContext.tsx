import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import type {NotificationArgsProps} from "antd/lib";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type NotificationContextType = {
    openNotification: (type: NotificationType, message: string, description: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useAppNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useAppNotification must be used within a NotificationProvider');
    }
    return context.openNotification;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: NotificationType, message: string, description: string) => {
        api[type]({ message, description, placement: 'bottomRight' });
    };

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};
