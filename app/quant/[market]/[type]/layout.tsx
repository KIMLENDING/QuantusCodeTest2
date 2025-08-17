
import QuantTypeHeader from '@/app/components/QuantTypeHeader';
import React from 'react'

const Layout = async ({ children }: Readonly<{
    children: React.ReactNode;

}>) => {


    return (
        <main className="w-full flex-grow mx-auto">
            <QuantTypeHeader />
            <div className="flex-grow flex flex-col h-full">
                <div className="min-h-[calc(100vh-400px)] w-full">

                    {children}
                </div>
            </div>
        </main>

    )
}

export default Layout