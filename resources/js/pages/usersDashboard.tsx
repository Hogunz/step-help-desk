import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Messages', href: '/messages' },
];

type Message = {
    id: number;
    ticket_number: string;
    subject: string;
    message: string;
    ticket_status: string;
    created_at: string;
    unread_comments_count?: number;
};

interface UsersDashboardProps {
    messages?: Message[];
}

export default function usersDashboard({ messages = [] }: UsersDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-8 dark:border-sidebar-border">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <a
                            href="/notifications"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Messages
                            <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
                                {messages.reduce((total, m) => total + (m.unread_comments_count || 0), 0)}
                            </span>
                        </a>

                        <a href={route('messages.create')} className="block">
                            <button
                                type="button"
                                className="w-full rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none sm:w-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Create Ticket
                            </button>
                        </a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Ticket Number</th>
                                    <th className="px-4 py-2">Subject</th>
                                    <th className="px-4 py-2">Message</th>
                                    <th className="px-4 py-2">Ticket Status</th>
                                    <th className="px-4 py-2">Created at</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message, index) => (
                                    <tr key={index} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900 dark:text-white">{message.id}</td>
                                        <td className="px-4 py-2">{message.ticket_number}</td>
                                        <td className="px-4 py-2">{message.subject}</td>
                                        <td className="px-4 py-2">{message.message}</td>
                                        <td className="px-4 py-2">
                                            <div
                                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
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
                                        <td className="px-4 py-2">{dayjs(message.created_at).format('MM/DD/YYYY')}</td>
                                        <td className="space-y-1 px-4 py-2">
                                            <a href="#" className="block text-blue-600 hover:underline dark:text-blue-500">
                                                Edit
                                            </a>
                                            <a href={`/messages/${message.id}`} className="block text-green-600 hover:underline dark:text-green-500">
                                                View
                                            </a>
                                            <a href="#" className="block text-red-600 hover:underline dark:text-red-500">
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
