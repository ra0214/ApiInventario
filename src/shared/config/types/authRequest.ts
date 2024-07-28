import { Request } from "express";
import { ClientPayload } from "./clientPayLoad";

export interface AuthRequest extends Request {
    clientData?: ClientPayload;
}