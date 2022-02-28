import { Adresse } from "./Adresse.model";
import { User } from "./User.model";
import { Projet } from "./Projet.model";

export interface Freelance extends User {

    // id: number;
    // prenom: string;
    // nom: string;
    // naissance: string;
    // email: string;
    // username: string;
    // roles: string[];
    // adresse: Adresse;
    projets ?: Projet[];
}
// export class Freelance extends User {

//     // id: number;
//     // prenom: string;
//     // nom: string;
//     // naissance: string;
//     // email: string;
//     // username: string;
//     // roles: string[];
//     // adresse: Adresse;
//     projets: Projet[] = [];
// }