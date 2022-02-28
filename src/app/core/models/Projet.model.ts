import { Categorie } from "./Categorie.model";
import { User } from "./User.model";

export interface Projet {
    
    projet_id: number;

    titre: string;

    resume: string;

    date: string;

    prix: number;

    categorie: Categorie;

    username : string;

    // user: User;

    reserve: boolean
}
