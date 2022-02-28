import { CategorieForm } from "./CategorieForm";

export interface ProjetForm {

    titre: string;

    resume: string;

    date: string;

    prix: number;

    userSimpleForm: { username: string };

    categorie: CategorieForm;

}