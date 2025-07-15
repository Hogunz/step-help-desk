import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

export default function Notifications({ notifications = [] }) {
    return (
        <AppLayout>
            <Head title="Notifications" />

            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold"> Notifications</h1>

                {notifications.length > 0 ? (
                    notifications.map((comment) => (
                        <div key={comment.id} className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm">
                            <p className="text-gray-800">
                                <strong>{comment.user?.name ?? 'Admin'}</strong> replied to your ticket:{' '}
                                <strong>{comment.message?.subject ?? 'Untitled'}</strong>
                            </p>

                            <p className="mt-1 text-sm text-gray-600 italic">
                                "{comment.content.length > 100 ? comment.content.substring(0, 100) + '...' : comment.content}"
                            </p>

                            <button
                                onClick={() => router.visit(`/messages/${comment.message?.id}`)}
                                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
                            >
                                View Message →
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">✅ You're all caught up. No new notifications.</p>
                )}
            </div>
        </AppLayout>
    );
}
