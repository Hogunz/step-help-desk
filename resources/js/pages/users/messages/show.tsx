import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Tooltip } from '@material-tailwind/react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'View Message', href: '/messages' },
];

export default function Show({ messages }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [zoomed, setZoomed] = useState(false);

    const handleCloseTicket = (e) => {
        e.preventDefault();
        const confirmed = confirm('⚠️ Are you sure you want to close this ticket? This action cannot be undone.');
        if (!confirmed) return;

        router.patch(
            route('messages.close', messages.id),
            {},
            {
                onSuccess: () => window.location.reload(),
                onError: () => alert('Failed to close the ticket.'),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Message: ${messages.subject}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-8 dark:border-sidebar-border">
                    <div className="mx-auto w-full max-w-3xl rounded border border-gray-300 bg-white p-4 shadow-sm sm:p-6">
                        {/* Header */}
                        <header className="mb-4 flex flex-col border-b border-gray-300 pb-3 sm:flex-row sm:items-center sm:justify-between">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{messages.subject}</h1>
                            <span
                                className={`mt-2 rounded-full px-3 py-1 text-sm font-semibold sm:mt-0 ${
                                    messages.ticket_status === 'open'
                                        ? 'border border-green-300 bg-green-100 text-green-800'
                                        : 'border border-red-300 bg-red-100 text-red-800'
                                }`}
                            >
                                {messages.ticket_status.charAt(0).toUpperCase() + messages.ticket_status.slice(1)}
                            </span>
                        </header>

                        {/* Message */}
                        <section className="mb-6 border-b border-gray-300 pb-6 text-sm leading-relaxed whitespace-pre-line text-gray-700">
                            {messages.message}
                        </section>

                        {/* Images with modal */}
                        {messages.images && messages.images.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {messages.images.map((img) => (
                                    <img
                                        key={img.id}
                                        src={`/storage/${img.path}`}
                                        alt="Attachment"
                                        className="w-full cursor-pointer rounded border border-gray-300 shadow-sm"
                                        onClick={() => setSelectedImage(`/storage/${img.path}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-gray-500">No attachments found.</p>
                        )}

                        {/* Modal Viewer */}
                        {selectedImage && (
                            <div className="bg-opacity-70 fixed inset-0 z-[9999] flex items-center justify-center bg-black">
                                <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-4 shadow-lg">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-4 right-4 z-10 rounded bg-white px-3 py-1 text-sm font-medium text-black shadow hover:bg-gray-200"
                                    >
                                        ✕ Close
                                    </button>
                                    <img src={selectedImage} alt="Preview" className="mx-auto max-h-[80vh] w-auto rounded object-contain" />
                                </div>
                            </div>
                        )}

                        {/* Close Ticket */}
                        {messages.ticket_status === 'open' && (
                            <form method="POST" onSubmit={handleCloseTicket} className="mt-4">
                                <Tooltip content="Click this button to close the ticket" placement="top">
                                    <button
                                        type="submit"
                                        className="w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 sm:w-auto"
                                    >
                                        Close Ticket
                                    </button>
                                </Tooltip>
                            </form>
                        )}

                        {/* Comment Form */}
                        <div className="mt-6">
                            {messages.ticket_status !== 'closed' ? (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target);
                                        router.post(route('comments.store', messages.id), formData, {
                                            onSuccess: () => {
                                                e.target.reset();
                                                router.visit(route('messages.show', messages.id), { replace: true });
                                            },
                                            onError: () => alert('Failed to post comment.'),
                                        });
                                    }}
                                >
                                    <textarea
                                        name="content"
                                        className="w-full rounded border border-gray-300 p-2 text-sm text-gray-700"
                                        placeholder="Write your comment here..."
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 sm:w-auto"
                                    >
                                        Reply
                                    </button>
                                </form>
                            ) : (
                                <p className="text-sm text-gray-500 italic">This ticket is closed. You can no longer reply.</p>
                            )}
                        </div>

                        {/* Replies */}
                        <div className="mt-10">
                            <h2 className="mb-4 text-base font-semibold text-gray-900 sm:text-xl">Replies</h2>

                            {messages.comments && messages.comments.length > 0 ? (
                                [...messages.comments]
                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .map((comment) => (
                                        <div key={comment.id} className="mb-4 rounded border border-gray-300 bg-gray-50 p-4 shadow-sm">
                                            <p className="text-sm text-gray-700">{comment.content}</p>
                                            <footer className="mt-2 text-xs text-gray-500">
                                                Posted by: <span className="font-medium text-gray-800">{comment.user.name}</span> on{' '}
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </footer>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-500">No comments yet.</p>
                            )}
                        </div>

                        {/* Submitter Info */}
                        <footer className="mt-6 border-t border-gray-300 pt-3 text-sm text-gray-500">
                            Submitted by: <span className="font-medium text-gray-800">{messages.user?.name}</span> ({messages.user?.email})
                        </footer>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
