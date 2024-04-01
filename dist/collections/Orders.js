"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var utils_1 = require("../lib/utils");
var yourOwn = function (_a) {
    var req = _a.req;
    var user = req.user;
    if (!user) {
        return false;
    }
    if (user.role === 'admin') {
        return true;
    }
    return {
        user: {
            equals: user.id,
        },
    };
};
exports.Orders = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Your Orders',
        description: 'A summary of all your orders.',
    },
    access: {
        read: yourOwn,
        update: utils_1.colletionAccessOnlyAdmins,
        delete: utils_1.colletionAccessOnlyAdmins,
        create: utils_1.colletionAccessOnlyAdmins,
    },
    fields: [
        {
            name: '_isPaid',
            type: 'checkbox',
            access: {
                read: utils_1.fiedlAccessOnlyAdmins,
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: 'user',
            type: 'relationship',
            hasMany: false,
            admin: {
                hidden: true,
            },
            relationTo: 'users',
            required: true,
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: true,
        },
    ],
};
