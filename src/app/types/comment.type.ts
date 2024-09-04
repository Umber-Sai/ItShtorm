export type CommentsResponseType = {
    allCount: number,
    comments : CommentType[]
}

export type CommentType = {
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    user: {
        id: string,
        name: string
    }
    action?:CommentActionType
}

export type CommentActionsType = {
    comment: string,
    action : CommentActionType
}

export enum CommentActionType {
    like = 'like',
    dislike = 'dislike'
}