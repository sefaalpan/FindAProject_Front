import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localedate'
})
export class LocaledatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    //ANNEE-MOIS-JOUR
    let valeur = value as string;
    let date : string[] = valeur.split("-")
    let annee = date[0];
    let mois = date[1];
    let jour = date[2];

    return jour+'-'+mois+'-'+annee;
  }

}
