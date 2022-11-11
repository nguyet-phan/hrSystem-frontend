export const adminMenu = [
    { //quản lý nhân sự
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-PM', link: '/system/user-PM'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
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