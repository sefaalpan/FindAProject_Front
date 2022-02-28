import { Adresse } from "./Adresse.model";

export interface User {
    id: number;
    prenom: string;
    nom: string;
    naissance: string;
    email: string;
    username: string;
    roles: string[];
    adresse: Adresse;
    token ?: string;
    discriminator : string;
}

// export class User {
//     id: number = 0;
//     prenom: string = '';
//     nom: string = '';
//     naissance: string = '';
//     email: string = '';
//     username: string = '';
//     roles: string[] = [];
//     adresse: Adresse = new Adresse();


// }