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

function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h2: ({ children }) => (
            <h2 style={{ textAlign: 'center' }}>{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 style={{ fontWeight: 'bold' }}>{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 style={{ fontStyle: 'italic' }}>{children}</h4>
        ),
        ...components
    }
}

const runtime = { jsx, jsxs, Fragment, useMDXComponents } as Runtime

export const MdViewer: FC<{ source?: string }> = ({ source = '' }) => {
    const [MdxContent, setMdxContent] = useState<ReactMDXContent>(
        () => () => null
    )

    useEffect(() => {
        evaluate(source, {
            ...runtime,
            remarkPlugins: []
            //rehypePlugins: [rehypeHighlight]
        }).then((r) => setMdxContent(() => r.default))
    }, [source])

    return <MdxContent />
}
