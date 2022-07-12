import Head from '../Head'
import Header from '../Header'

export function Layout({ children }) {
  return (
    <div className="bg-mybg-light dark:bg-mybg-dark dark:text-snow dark:font-medium h-screen overflow-scroll scrollbar-hide">
      <Head />
      <Header />
      <main className="z-10 mx-auto max-w-6xl scrollbar-hide my-11 flex flex-col flex-grow">
        {children}
      </main>
      <footer className="mt-auto mb-0"></footer>
    </div>
  )
}
