# agessa-calc
Deal whith AGESSA

Installation
------------

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

```javascript
agessa.commande.calcul ( bareme, volume [ , debug ] )
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

_Boolean_ `debug`

return _Object_ { `bareme`, `volume`, `tranche`, `basePoints`, `points`, `ajust` }


### Cotisations sociales

```javascript
agessa.cotisations.calcul ( remunerationArtistique, annee )
```

Calcul les montants des Cotisations Sociales pour la `remunerationArtistique` avec les taux de l'`annee`.

_Number_ `remunerationArtistique`

_Number_ `annee`

return _Object_ { `auteur`, `diffuseur` }
