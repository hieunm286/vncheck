import React from "react";
import { ReactElement } from "react";

interface NotificationNavItem {
    eventKey: string;
    label: string;
    className: string;
    _navClassName?: string;
    data?: { icon: HTMLElement | ReactElement; notificationName: string | ReactElement; timestamp: string | ReactElement }[]
}

export const NotificationNavItem: NotificationNavItem[] = [
    { 
        _navClassName: 'nav-item',
        eventKey: 'Alerts',
        label: 'Alerts',
        className: `nav-link show`,
        data: [
            {
                icon: <i className="flaticon2-line-chart text-success"/>,
                notificationName: 'Giám đốc đã từ chối kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-paper-plane text-danger"/>,
                notificationName: 'Kế hoạch đã được duyệt',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            }
        ]
    },
    { 
        eventKey: 'Events',
        label: 'Events',
        className: `nav-link show`,
        data: [
            {
                icon: <i className="flaticon2-line-chart text-success"/>,
                notificationName: 'Giám đốc đã từ chối kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-paper-plane text-danger"/>,
                notificationName: 'Kế hoạch đã được duyệt',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            },
            {
                icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
                notificationName: 'Giám đốc đã bình luận về kế hoạch',
                timestamp: '23 hrs ago'
            }
        ]
    },
    { 
        eventKey: 'Logs',
        label: 'Logs',
        className: `nav-link show`
    }
]