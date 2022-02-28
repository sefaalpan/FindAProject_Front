import { AdresseForm } from "./AdresseForm";

export interface RegisterForm {
    username: string;

    password: string;

    email: string;

    discriminator: string;

    nom: string;

    prenom: string;

    naissance: string;

    address:AdresseForm;

}