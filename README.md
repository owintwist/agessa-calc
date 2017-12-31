# agessa-calc

Deal with AGESSA


Installation
------------

Via NPM

```
npm install --save agessa-calc
```

Via GitHub

```
npm install --save https://github.com/owintwist/agessa-calc
```

Utilisation
-----------

```javascript
const agessa = require('agessa-calc')
```

API
---

### Barème à Points

Le Barème des Œuvres de Commande en Publicité — aussi appelé _Barème à Points_ — est le seul barème officiel de cession de droits d'utilisation pour les œuvres de commande en publicité. Il découle de la décision du 23 février 1987, publiée au Journal Officiel le 2 mai 1987. **Ce barème est obligatoire**.

```javascript
agessa.commande.calcul ( bareme, volume [ , verbose ] )

return {  
  bareme: nom du barème  
  volume: volume  
  tranche: tranche  
  basePoints: points de base de la tranche  
  points: total des points  
  ajust: valeur
}
```
Calcul le nombre de points par `bareme` en fonction du `volume`

_Number_ `bareme` :

 * `0` Presse et publications assimilées
 * `1` Affichages < 10m²
 * `2` Affichages > 10m²
 * `3` Publicité sur Lieu de Vente (PLV)
 * `4` Catalogues de Vente par Correspondance
 * `5` Posters, affichettes, objets publicitaires
 * `6` Autres catalogues, brochures et imprimés divers

ou

_String_ `bareme` :

 * `presse` Presse et publications assimilées
 * `affichette` Affichages < 10m²
 * `affiche` Affichages > 10m²
 * `plv` Publicité sur Lieu de Vente (PLV)
 * `vpc` Catalogues de Vente par Correspondance
 * `poster` Posters, affichettes, objets publicitaires
 * `divers` Autres catalogues, brochures et imprimés divers

_Number_ `volume`

_Boolean_ `verbose`

### Cotisations sociales

```javascript
agessa.cotisations.calcul ( remunerationArtistique, annee )

return {
  auteur: {
    details: {
      secu: "montant de la Contribution Diffuseur",
      csg: "montant de la Contribution Sociale Généralisée",
      crds: "montant de la Contribution au Remboursement de la Dette Sociale",
      cafp: "montant de la Contribution de l'Auteur à la Formation Professionnelle"
    },
    total: "total des cotisations imputables à l'Auteur"
  },
  diffuseur: {
    details: {
      agessa: "montant de la Contribution diffuseur « 1% diffuseur »",
      cdfp: "montant de la Contribution du Diffuseur à la Formation Professionnelle"
    },
    total: "total des cotisations imputables au Diffuseur"
  }
}
```

Calcul les montants des Cotisations Sociales pour la `remunerationArtistique` avec les taux de l'`annee`.

_Number_ `remunerationArtistique`

_Number_ `annee`
