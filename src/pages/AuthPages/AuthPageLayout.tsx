import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0'>
      <div className='relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0'>
        {children}
        <div className='items-center hidden w-full h-full lg:w-1/2 bg-brand-900 dark:bg-white/5 lg:grid'>
          <div className='relative flex items-center justify-center z-1'>
            <div className='flex flex-col items-center max-w-xs'>
              <img
                width={300}
                height={48}
                src='/images/logo/logo-negativo.png'
                alt='Logo'
              />
              <p className='text-center text-gray-400 dark:text-white/60 mt-4'>
                Leading company in sensor technology and data transformation.
              </p>
            </div>
          </div>
        </div>
        <div className='fixed z-50 hidden bottom-6 right-6 sm:block'>
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  )
}
