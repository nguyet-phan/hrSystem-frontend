export const adminMenu = [
    { //quản lý nhân sự
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

        ]
    },
    { //quản lý lương
        name: 'menu.admin.salary',
        menus: [
            {
                name: 'menu.admin.manage-salary-year', link: '/system/manage-salary-year'
            },
            {
                name: 'menu.admin.manage-salary-month', link: '/system/manage-salary-month'
            },
            {
                name: 'menu.admin.manage-salary', link: '/system/manage-salary'
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

    { //thông tin tài khoản
        name: 'menu.admin.profile',
        menus: [
            {
                name: 'menu.admin.user-profile', link: '/system/user-profile'
            },
        ]
    },
];

export const staffMenu = [
    { //quản lý lương
        name: 'menu.staff.salary',
        menus: [
            {
                name: 'menu.staff.manage-salary-year', link: '/system/manage-salary-year'
            },
            {
                name: 'menu.staff.manage-salary-month', link: '/system/manage-salary-month'
            },
            {
                name: 'menu.staff.manage-salary', link: '/system/manage-salary'
            },
        ]
    },

    { //quản lý sự kiện
        name: 'menu.staff.event',
        menus: [
            {
                name: 'menu.staff.calender', link: '/system/calender'
            },
        ]
    },

    { //thông tin tài khoản
        name: 'menu.admin.profile',
        menus: [
            {
                name: 'menu.admin.user-profile', link: '/system/user-profile'
            },
        ]
    },
];