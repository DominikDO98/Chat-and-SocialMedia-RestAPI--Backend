import { ICommentDTO, TCreateComment, TEditComment } from "../entities/comment.entity/comment";
import { CommentDTO } from "../entities/comment.entity/comment.dto";
import { CommentEntity } from "../entities/comment.entity/comment.enitity";
import { AuthRepository } from "../repositories/auth.repository";
import { CommentRepository } from "../repositories/comment.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { ValidationError } from "../utils/errors/errors";
import { ProfileService } from "./profile.service";

export class CommentService {
	private _commentReposiotory = CommentRepository;
	private _authRepository = AuthRepository;
	private _profileService = new ProfileService();
	addComment = async (commentData: TCreateComment, userId: string): Promise<ICommentDTO> => {
		const id = AuthUtils.uuid();
		const newComment = new CommentEntity(id, userId, commentData);
		const createdComment = await this._commentReposiotory.addComment(newComment);
		const profile = await this._profileService.loadProfile(userId);
		const username = await this._authRepository.getUsernameById(userId);
		const dto = CommentDTO.createDTO(createdComment, username, profile);
		return dto;
	};
	editComment = async (commentChanges: TEditComment, userId: string): Promise<ICommentDTO> => {
		const comment = new CommentEntity(commentChanges.id, userId, commentChanges);
		const editedComment = await this._commentReposiotory.editComment(comment);
		if (!editedComment) {
			throw new ValidationError("You can't edit this comment!", 401);
		}
		const profile = await this._profileService.loadProfile(userId);
		const username = await this._authRepository.getUsernameById(userId);
		const dto = CommentDTO.createDTO(editedComment, username, profile);
		return dto;
	};
	deleteComment = async (commentId: string, userId: string): Promise<void> => {
		await this._commentReposiotory.deleteComment(commentId, userId);
	};
	loadComments = async (post_id: string, offset: number): Promise<ICommentDTO[]> => {
		const comments = await this._commentReposiotory.loadComments(post_id, offset);
		const dtos = await Promise.all(
			comments.map(async (comment) => {
				const profile = await this._profileService.loadProfile(comment.user_id);
				const username = await this._authRepository.getUsernameById(comment.user_id);
				return CommentDTO.createDTO(comment, username, profile);
			}),
		);
		return dtos;
	};
}
