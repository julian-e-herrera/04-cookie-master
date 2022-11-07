import Head from 'next/head'
import React, { FC } from 'react'
import { NavBar } from '../ui'

//this type is to avoid error
type Props = {
    children?: React.ReactElement | React.ReactElement[]
};

export const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Head>  </Head>
            <nav>
                <NavBar />
            </nav>
            <main style={{ padding: '20px 50px' }}>
                {children}
            </main>

        </>
    )
}
