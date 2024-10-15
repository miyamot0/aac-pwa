import { useEffect, useState } from 'react'
import { jsx, jsxs, Fragment } from 'react/jsx-runtime'

import type { FC, ReactNode } from 'react'
import type { MDXProps } from 'mdx/types'
import type { EvaluateOptions } from '@mdx-js/mdx'
import { evaluate } from '@mdx-js/mdx'
//import rehypeHighlight from 'rehype-highlight'

type ReactMDXContent = (props: MDXProps) => ReactNode
type Runtime = Pick<EvaluateOptions, 'jsx' | 'jsxs' | 'Fragment'>

import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        p: ({ children }) => <p className="m-0 my-4">{children}</p>,
        h2: ({ children }) => (
            <h2 className="text-center m-0 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-bold m-0 my-4">{children}</h3>
        ),
        h4: ({ children }) => <h4 className="italic m-0 my-4">{children}</h4>,
        ...components
    }
}

const runtime = { jsx, jsxs, Fragment, useMDXComponents } as Runtime

export const MdViewer: FC<{ source?: string }> = ({ source = '' }) => {
    const [MdxContent, setMdxContent] = useState<ReactMDXContent>(
        () => () => null
    )
    const [displayed, setDisplayed] = useState(false)

    useEffect(() => {
        setDisplayed(false)

        evaluate(source, {
            ...runtime,
            remarkPlugins: []
            //rehypePlugins: [rehypeHighlight]
        }).then((r) => {
            setTimeout(function () {
                setMdxContent(() => r.default)
                setDisplayed(true)
            }, 150)
        })
    }, [source])

    return (
        <div
            className={cn('transition-all ease-in-out duration-300', {
                'opacity-100': displayed,
                'opacity-0': !displayed
            })}
        >
            <MdxContent />
        </div>
    )
}
