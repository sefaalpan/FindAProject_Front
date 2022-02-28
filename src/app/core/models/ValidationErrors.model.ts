import { FieldErrors } from "./FieldErrors.model";

export interface ValidErrors{
    globalErrors: string[];
    fieldErrors: FieldErrors[];
}

