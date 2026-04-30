const Layout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
            <header>
                <div className="flex items-center justify-around p-8">
                    <h1>Jobly</h1>
                    <div className="flex items-center gap-32">
                        <nav>
                            <ul className="flex items-center gap-16">
                                <li>jobs</li>
                                <li>entreprise</li>
                                <li>salaire</li>
                                <li>conseils</li>
                            </ul>
                        </nav>
                        <nav>
                            <ul className="flex items-center gap-10">
                                <li>sign up</li>
                                <li className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition">inscription</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {children}
        </div>
    )
}

export default Layout