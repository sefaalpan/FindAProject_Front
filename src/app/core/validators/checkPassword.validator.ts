import { AbstractControl, ValidatorFn } from "@angular/forms";


export function checkPassword(): ValidatorFn {

    return (control: AbstractControl) => {
        
        if(control != null && control.value != null) {

            let valueOf = control.value as string;
            const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ as RegExp   
            
            if (!valueOf.match(regex))
            return {
                errorPassword: `Le mot de passe doit être composé de minuscules, d'au moins une majuscule, d'au moins un chiffre et un de ces caractères spéciaux (& | @ # ( § ! { } ) ? ; . : + =)`,
            };
        }

        return null;
    }



}