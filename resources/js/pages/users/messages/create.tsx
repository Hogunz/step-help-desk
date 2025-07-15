import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function create() {
    const { data, setData, post } = useForm({
        subject: '',
        message: '',
        ticket_status: 'open', // Default status can be 'open', 'in_progress', 'closed', etc.
        images: [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('messages.store'), {
            forceFormData: true, // Important for file uploads
        });
    }
    function handleFileChange(e) {
        setData('images', Array.from(e.target.files)); // Store as array of File objects
    }
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-8 md:min-h-min dark:border-sidebar-border">
                        <div className="relative overflow-x-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <div className="mb-2">
                                        <label htmlFor="">Subject</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                        className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="mb-2">
                                        <label htmlFor="">Message</label>
                                    </div>
                                    <textarea
                                        id="message"
                                        rows={10}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        required
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        placeholder="Write your thoughts here..."
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2 block">Upload Images</label>
                                    <input
                                        type="file"
                                        name="images"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-700"
                                    />
                                </div>

                                <div className="mb-2">
                                    <Button type="submit">Create</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
