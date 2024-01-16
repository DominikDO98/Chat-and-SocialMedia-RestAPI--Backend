import { Request, Response, NextFunction } from "express";

export class ValidationError extends Error {};
export class CustomError extends Error {};
export class InternalError extends Error {};
export class ContentNotFoundError extends Error {};
