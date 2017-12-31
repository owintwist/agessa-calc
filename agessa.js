/*
 *  Barème des Œuvres de Commande en Publicité
 *  « Barème à Points »
 *
 *  Décision du 23 février 1987 de la comission créé par l'article  14 de la
 *  loi n°85-660 du 3 juillet 1985 modifiée relative aux droits d'auteur et aux
 *  droits des artistes interprètes, des producteurs de phonogrammess et de
 *  vidéogrammes et des entreprises de communication audiovisuelles
 *
 *  https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000000879411
 *
 */

'use strict'

const agessa = {
  commande: {
    grid: [
      {
        name: 'Presse et publications assimilées',
        shortName: 'presse',
        ajust: 1000,
        volumeName: 'Diffusion cumulée',
        volumeBase: 200000,
        pts: [ 250, 375, 563, 845, 1268, 1902, 2853, 4280, 6420, 9630, 14445, 21668 ]
      },
      {
        name: 'Affichages < 10m²',
        shortName: 'affichette',
        ajust: 1,
        volumeName: 'Emplacement × jours',
        volumeBase: 500,
        pts: [ 160, 240, 360, 540, 810, 1216, 1824, 2736, 4104, 6156, 9234, 13852 ]
      },
      {
        name: 'Affichages > 10m²',
        shortName: 'affiche',
        ajust: 1,
        volumeName: 'Emplacement × jours',
        volumeBase: 500,
        pts: [ 400, 600, 900, 1350, 2026, 3040, 4560, 6840, 10260, 15390, 23086, 34630 ]
      },
      {
        name: 'Publicité sur Lieu de Vente (PLV)',
        shortName: 'plv',
        ajust: 1,
        volumeName: 'Tirages',
        volumeBase: 50,
        pts: [ 80, 120, 180, 270, 406, 610, 916, 1374, 2062, 3094, 4642, 6964 ]
      },
      {
        name: 'Catalogues de Vente par Correspondance',
        shortName: 'vpc',
        ajust: 1000,
        volumeName: 'Tirages',
        volumeBase: 50000,
        pts: [ 34, 50, 76, 114, 170, 256, 384, 576, 865, 1297 ]
      },
      {
        name: 'Posters, affichettes, objets publicitaires',
        shortName: 'poster',
        ajust: 1,
        volumeName: 'Tirages',
        volumeBase: 100,
        pts: [ 10, 15, 22, 34, 50, 76, 114, 170, 256, 384, 576, 865 ]
      },
      {
        name: 'Autres catalogues, brochures et imprimés divers',
        shortName: 'divers',
        ajust: 1,
        volumeName: 'Tirages',
        volumeBase: 1000,
        pts: [ 34, 50, 76, 114, 170, 256, 384, 576, 865, 1297, 1946 ]
      }
    ],
    calcul: (bareme, volume, verbose) => {
      if (typeof bareme === 'number') bareme = agessa.commande.grid[bareme]
      else if (typeof bareme === 'string') {
        switch (bareme) {
          case 'presse':
            bareme = 0
            break
          case 'affichette':
            bareme = 1
            break
          case 'affiche':
            bareme = 2
            break
          case 'plv':
            bareme = 3
            break
          case 'vpc':
            bareme = 4
            break
          case 'poster':
            bareme = 5
            break
          case 'divers':
            bareme = 6
            break
          // default:
        }
        bareme = agessa.commande.grid[bareme]
      }

      let tranche = 0
      let min = 1
      let max = bareme.volumeBase
      let basePts = bareme.pts[0]
      let maxPts
      let its = 0
      let points

      if (verbose) console.log('Barème:', bareme.name)

      if (volume && volume > 0) {
        while (!points && tranche < 1000) {
          tranche++
          if (tranche > 1) {
            min = max
            max = max * 2
            if (tranche > 2) basePts = bareme.pts[tranche - 2] || Math.ceil(basePts * 1.5)
            maxPts = bareme.pts[tranche - 1] || Math.ceil(basePts * 1.5)
            its = (maxPts - basePts) / ((max - min) / bareme.ajust)
          } else if (verbose) {
            maxPts = basePts
          }

          if (verbose) console.log(' * Tranche ' + tranche + ':', min + ' => ' + max, basePts + ' => ' + maxPts, '/', its)

          if (volume >= min && volume < max) {
            if (tranche > 1) points = basePts + ((volume - min) / bareme.ajust * its)
            else points = basePts
          }
        }
      }
      return {
        bareme: bareme.name,
        volume: volume,
        tranche: tranche || '-',
        min: min,
        max: max,
        basePoints: basePts,
        ajust: (volume - min),
        ajustPoints: (volume - min) / bareme.ajust * its,
        points: points || 0
      }
    }
  },
  cotisations: {
    grid: {
      2018: {
        secu: { assiette: 1, taux: 0.004 },
        csg: { assiette: 0.9825, taux: 0.092 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 1, taux: 0.001 }
      },
      2017: {
        secu: { assiette: 1, taux: 0.0115 },
        csg: { assiette: 0.9825, taux: 0.075 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 1, taux: 0.001 }
      },
      2016: {
        secu: { assiette: 1, taux: 0.011 },
        csg: { assiette: 0.9825, taux: 0.075 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 1, taux: 0.001 }
      },
      2015: {
        secu: { assiette: 1, taux: 0.0105 },
        csg: { assiette: 0.9825, taux: 0.075 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 1, taux: 0.001 }
      },
      2014: {
        secu: { assiette: 1, taux: 0.01 },
        csg: { assiette: 0.9825, taux: 0.075 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 1, taux: 0.001 }
      },
      2013: {
        secu: { assiette: 1, taux: 0.0085 },
        csg: { assiette: 0.9825, taux: 0.075 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 0, taux: 0 }
      },
      2012: {
        secu: { assiette: 1, taux: 0.0085 },
        csg: { assiette: 0.9825, taux: 0.075 },
        crds: { assiette: 0.9825, taux: 0.005 },
        cafp: { assiette: 1, taux: 0.0035 },
        agessa: { assiette: 1, taux: 0.01 },
        cdfp: { assiette: 0, taux: 0 }
      }
    },
    calcul: function (remunerationArtistique, annee) {
      if (!agessa.cotisations.grid[annee]) {
        console.error("La grille de taux de cotisation sociale pour l'année " + annee + " n'est pas disponible.")
        return false
      } else {
        let ret = {
          auteur: {
            details: {
              secu: Math.round(remunerationArtistique * agessa.cotisations.grid[annee].secu.assiette * agessa.cotisations.grid[annee].secu.taux * 100) / 100,
              csg: Math.round(remunerationArtistique * agessa.cotisations.grid[annee].csg.assiette * agessa.cotisations.grid[annee].csg.taux * 100) / 100,
              crds: Math.round(remunerationArtistique * agessa.cotisations.grid[annee].crds.assiette * agessa.cotisations.grid[annee].crds.taux * 100) / 100,
              cafp: Math.round(remunerationArtistique * agessa.cotisations.grid[annee].cafp.assiette * agessa.cotisations.grid[annee].cafp.taux * 100) / 100
            }
          },
          diffuseur: {
            details: {
              agessa: Math.round(remunerationArtistique * agessa.cotisations.grid[annee].agessa.assiette * agessa.cotisations.grid[annee].agessa.taux * 100) / 100,
              cdfp: Math.round(remunerationArtistique * agessa.cotisations.grid[annee].cdfp.assiette * agessa.cotisations.grid[annee].cdfp.taux * 100) / 100
            }
          }
        }
        ret.auteur.total = Math.round((ret.auteur.details.secu + ret.auteur.details.csg + ret.auteur.details.crds + ret.auteur.details.cafp) * 100) / 100
        ret.diffuseur.total = Math.round((ret.diffuseur.details.agessa + ret.diffuseur.details.cdfp) * 100) / 100
        return ret
      }
    }
  }
}

module.exports = agessa
