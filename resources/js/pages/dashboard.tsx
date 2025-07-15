import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Messages',
        href: '/messages',
    },
];

type Message = {
    id: number;
    ticket_number: string;
    subject: string;
    message: string;
    ticket_status: string;
    created_at: string;
    // name?: string; // Uncomment if you use the name field
};

interface UsersDashboardProps {
    messages?: Message[];
}

export default function usersDashboard({ messages = [] }: UsersDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-8 md:min-h-min dark:border-sidebar-border">
                    {/* <a href={route('messages.create')} className="href">
                        <button
                            type="button"
                            className="me-2 mb-8 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Create Ticket
                        </button>
                    </a> */}
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Ticket Number
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Name
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Subject
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Message
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ticket Status
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Activity Status
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Created at
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, index) => (
                                <tr key={index} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        {message.id}
                                    </th>
                                    <td className="px-6 py-4"> {message.ticket_number}</td>
                                    {/* <td className="px-6 py-4"> {message.name}</td> */}

                                    <td className="px-6 py-4">{message.subject}</td>

                                    <td className="px-6 py-4">{message.message}</td>
                                    <td className="px-6 py-4">
                                        <div
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                                                message.ticket_status.toLowerCase() === 'open'
                                                    ? 'border border-green-500 bg-green-50 text-green-700'
                                                    : 'border border-red-500 bg-red-50 text-red-700'
                                            }`}
                                        >
                                            <span
                                                className={`h-2 w-2 rounded-full ${
                                                    message.ticket_status.toLowerCase() === 'open' ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                            ></span>
                                            {message.ticket_status.charAt(0).toUpperCase() + message.ticket_status.slice(1).toLowerCase()}
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-yellow-500"></div> Unread
                                        </div>
                                    </td> */}
                                    <td className="px-6 py-4">{dayjs(message.created_at).format('MM/DD/YYYY')}</td>
                                    <td className="px-6 py-4">
                                        {/* <div>
                                            {' '}
                                            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                                Edit
                                            </a>
                                        </div> */}
                                        <div>
                                            {' '}
                                            <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                                                Delete
                                            </a>
                                        </div>
                                        <div>
                                            {' '}
                                            <a
                                                href={`/messages/${message.id}`}
                                                className="font-medium text-green-600 hover:underline dark:text-green-500"
                                            >
                                                View
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
