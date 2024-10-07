import { ICommentDTO, TCreateComment, TEditComment } from "../entities/comment.entity/comment";
import { CommentDTO } from "../entities/comment.entity/comment.dto";
import { CommentEntity } from "../entities/comment.entity/comment.enitity";
import { CommentRepository } from "../repositories/comment.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { ValidationError } from "../utils/errors/errors";

export class CommentService {
	private _commentReposiotory = CommentRepository;

	addComment = async (commentData: TCreateComment, userId: string): Promise<ICommentDTO> => {
		const id = AuthUtils.uuid();
		const newComment = new CommentEntity(id, userId, commentData);
		const createdComment = await this._commentReposiotory.addComment(newComment);
		const dto = CommentDTO.createDTO(createdComment);
		return dto;
	};
	editComment = async (commentChanges: TEditComment, userId: string): Promise<ICommentDTO> => {
		const comment = new CommentEntity(commentChanges.id, userId, commentChanges);
		console.log(comment);
		const editedComment = await this._commentReposiotory.editComment(comment);
		if (!editedComment) {
			throw new ValidationError("You can't edit this comment!", 401);
		}
		console.log(editedComment);

		const dto = CommentDTO.createDTO(editedComment);
		return dto;
	};
	deleteComment = async (commentId: string, userId: string): Promise<void> => {
		await this._commentReposiotory.deleteComment(commentId, userId);
	};
	loadComments = async (post_id: string, offset: number): Promise<ICommentDTO[]> => {
		const comments = await this._commentReposiotory.loadComments(post_id, offset);
		const dtos = comments.map((comment) => {
			return CommentDTO.createDTO(comment);
		});
		return dtos;
	};
}
