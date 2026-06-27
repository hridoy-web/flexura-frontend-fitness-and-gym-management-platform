import { 
    FaThLarge, FaBook, FaUserCheck, FaHeart, 
    FaPlusCircle, FaChalkboardTeacher, FaPenSquare, 
    FaUsers, FaFolderOpen, FaExchangeAlt, FaComments 
} from "react-icons/fa";

export const dashboardMenu = [
    //  USER LINKS
    {
        title: "Overview",
        path: "/dashboard",
        icon: FaThLarge,
        roles: ["user", "trainer", "admin"]
    },
    {
        title: "Booked Classes",
        path: "/dashboard/booked-classes",
        icon: FaBook,
        roles: ["user"]
    },
    {
        title: "Apply as Trainer",
        path: "/dashboard/apply-trainer",
        icon: FaUserCheck,
        roles: ["user"]
    },
    {
        title: "Favorite Classes",
        path: "/dashboard/favorite-classes",
        icon: FaHeart,
        roles: ["user"]
    },

    //  TRAINER LINKS
    {
        title: "Add Class",
        path: "/dashboard/add-class",
        icon: FaPlusCircle,
        roles: ["trainer"]
    },
    {
        title: "My Classes",
        path: "/dashboard/my-classes",
        icon: FaChalkboardTeacher,
        roles: ["trainer"]
    },
    {
        title: "Add Forum Post",
        path: "/dashboard/trainer/add-forum",
        icon: FaPenSquare,
        roles: ["trainer"]
    },
    {
        title: "My Forum Posts",
        path: "/dashboard/trainer/my-forums",
        icon: FaPenSquare,
        roles: ["trainer"]
    },

    //  ADMIN LINKS
    {
        title: "Manage Users",
        path: "/dashboard/admin/manage-users",
        icon: FaUsers,
        roles: ["admin"]
    },
    {
        title: "Applied Trainers",
        path: "/dashboard/admin/applied-trainers",
        icon: FaUserCheck,
        roles: ["admin"]
    },
    {
        title: "Manage Trainers",
        path: "/dashboard/admin/manage-trainers",
        icon: FaChalkboardTeacher,
        roles: ["admin"]
    },
    {
        title: "Manage Classes",
        path: "/dashboard/admin/manage-classes",
        icon: FaFolderOpen,
        roles: ["admin"]
    },
    {
        title: "Transactions",
        path: "/dashboard/admin/transactions",
        icon: FaExchangeAlt,
        roles: ["admin"]
    },
    {
        title: "Manage Forum Posts",
        path: "/dashboard/admin/manage-forums",
        icon: FaComments,
        roles: ["admin"]
    },
    {
        title: "Add Forum Post (Admin)",
        path: "/dashboard/admin/add-forum",
        icon: FaPenSquare,
        roles: ["admin"]
    }
];