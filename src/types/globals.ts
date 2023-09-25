type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N 
? Acc[number] 
: Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = F extends T 
? F 
: Exclude<Enumerate<T>, Enumerate<F>> extends never 
    ? never 
    : Exclude<Enumerate<T>, Enumerate<F>> | T




type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

type HSL = `hsl(${number}, ${number}%, ${number}%)`
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`

type CssGlobals = 'inherit' | 'initial' | 'revert' | 'unset'

export type CssColor = RGB | RGBA | HEX | HSL | HSLA | CssGlobals

export type CssSize = `${number}px` | `${number}em` | `${number}rem`
