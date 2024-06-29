/**
 *CommentRepository
 */
export interface CommentRepository {
  /**
   *記事についているコメントすべて取得
   */
  getItemComment(id: string): Promise<string[]>
}
/** CommentRepositorySymbol */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CommentRepository = Symbol('CommentRepository')
