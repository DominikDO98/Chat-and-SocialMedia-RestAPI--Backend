import { IPostDTO, IPostEntity, TCretePost, TEditPost } from "../entities/post.entity/post";
import { PostDTO } from "../entities/post.entity/post.dto";
import { PostEntity } from "../entities/post.entity/post.entity";
import { CommentRepository } from "../repositories/comment.repository";
import { LikeRepository } from "../repositories/like.repository";
import { PostRepository } from "../repositories/post.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { ValidationError } from "../utils/errors/errors";

export class PostService {
	private _postRepository = PostRepository;
	private _likeRepository = LikeRepository;
	private _commentRepository = CommentRepository;

	createPost = async (newPost: TCretePost, userId: string): Promise<IPostDTO> => {
		const id = AuthUtils.uuid();
		const post = new PostEntity(id, userId, newPost);
		const createdPost = await this._postRepository.createPost(post);
		const dto = new PostDTO(createdPost, 0, 0, false);
		return dto;
	};
	editPost = async (postEdit: TEditPost, userId: string): Promise<IPostDTO> => {
		const post = new PostEntity(postEdit.id, userId, postEdit);
		const editedPost = await this._postRepository.editPost(post);
		if (!editedPost) {
			throw new ValidationError("You can't edit this post!", 401);
		}
		const likes = await this._likeRepository.countLikes(editedPost.id);
		const comments = await this._commentRepository.countComments(editedPost.id);
		const liked = Boolean(await this._likeRepository.getLike(userId, editedPost.id));
		const dto = new PostDTO(editedPost, likes, comments, liked);
		return dto;
	};
	deletePost = async (userId: string, postId: string): Promise<void> => {
		await this._postRepository.deletePost(userId, postId);
	};
	loadUserPosts = async (userId: string, offset: number): Promise<IPostDTO[]> => {
		const userPosts: IPostEntity[] = await this._postRepository.loadUserPosts(userId, offset);
		const dtos = await Promise.all(
			userPosts.map(async (post) => {
				const likes = await this._likeRepository.countLikes(post.id);
				const comments = await this._commentRepository.countComments(post.id);
				const liked = Boolean(await this._likeRepository.getLike(userId, post.id));
				const dto = PostDTO.createDTO(post, likes, comments, liked);
				return dto;
			}),
		);
		return dtos;
	};
	loadPost = async (userId: string, postId: string): Promise<IPostDTO> => {
		const post = await this._postRepository.loadPost(postId);
		const likes = await this._likeRepository.countLikes(post.id);
		const comments = await this._commentRepository.countComments(post.id);
		const liked = Boolean(await this._likeRepository.getLike(userId, post.id));
		const dto = PostDTO.createDTO(post, likes, comments, liked);
		return dto;
	};
}
