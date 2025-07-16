import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#121826]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="w-full lg:grow">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                            <div className="max-w-screen-md">
                                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                    Get the support you need—fast
                                </h2>
                                <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                                    Submit, track, and resolve your concerns—all in one place.
                                </p>
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="mr-2 -ml-1 h-5 w-5"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                            />
                                        </svg>
                                        Register Now!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full rounded-lg bg-white/75 p-6 shadow-lg">
                        <div>
                            <section className="">
                                <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
                                    <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl dark:text-[#121826]">
                                        STEP Help Desk
                                    </h1>
                                    <p className="dark:text-text-[#121826] mb-8 text-lg font-normal text-[#121826]/50 sm:px-16 lg:text-xl xl:px-48">
                                        At STEP Help Desk, we are committed to creating a seamless support experience where efficiency, innovation,
                                        and user needs come together. We help students and faculty resolve concerns quickly and effectively—turning
                                        every interaction into a step forward.
                                    </p>
                                </div>
                            </section>
                            <img className="max-w-full" src="/img/bg-1.png" alt="" />
                        </div>
                    </section>
                </div>
                <div className="mt-8 hidden h-14.5 lg:block">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © {new Date().getFullYear()}{' '}
                        <a href="https://flowbite.com/" className="hover:underline">
                            Arzatech
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </>
    );
}
