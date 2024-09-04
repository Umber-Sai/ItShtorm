export type ArticleCardType = {
    id: string,
    title: string,
    description: string,
    image: string,
    date: string,
    category: string,
    url: string
}

export type ArticleResponseType = {
    count : number,
    pages: number,
    items : ArticleCardType[]
}