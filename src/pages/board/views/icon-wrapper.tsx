import { ReactNode } from 'react'

export function IconWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col grow justify-center items-center">
            {children}
        </div>
    )
}
