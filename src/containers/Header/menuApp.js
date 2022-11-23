export const adminMenu = [
    { //quản lý nhân sự
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

        ]
    },
    { //quản lý phòng ban
        name: 'menu.admin.department',
        menus: [
            {
                name: 'menu.admin.manage-department', link: '/system/manage-department'
            },
        ]
    },
    { //quản lý sự kiện
        name: 'menu.admin.event',
        menus: [
            {
                name: 'menu.admin.manage-event', link: '/system/manage-event'
            },
            {
                name: 'menu.admin.calender', link: '/system/calender'
            },
        ]
    },
    { //quản lý lương
        name: 'menu.admin.salary',
        menus: [
            {
                name: 'menu.admin.manage-salary', link: '/system/manage-salary'
            },
        ]
    },
];

export const staffMenu = [

    { //quản lý sự kiện
        name: 'menu.staff.event',
        menus: [
            {
                name: 'menu.staff.calender', link: '/system/calender'
            },
        ]
    },
    { //quản lý lương
        name: 'menu.staff.salary',
        menus: [
            {
                name: 'menu.staff.manage-salary', link: '/system/manage-salary'
            },
        ]
    },
];