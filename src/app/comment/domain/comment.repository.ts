export interface CommentRepository {
  getItemComment(id: string): Promise<string[]>;
}
export const CommentRepository = Symbol('CommentRepository');
