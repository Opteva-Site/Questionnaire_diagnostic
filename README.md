# Questionnaire de Diagnostic Opteva

## Description

Application web interactive pour évaluer le niveau de pilotage d'une entreprise à travers un questionnaire en 3 dimensions :
- **Organisation** : structure, processus et moyens de production
- **Offre** : produits, services et relation client
- **Environnement** : marché, concurrence et contraintes externes

## Fonctionnalités implémentées

✅ **Page d'introduction complète**
- Présentation du contexte et des objectifs du diagnostic
- Explication des 3 dimensions évaluées
- Design professionnel avec charte graphique Opteva

✅ **Questionnaire en 3 étapes**
- 9 propositions par question (cases à cocher)
- Navigation fluide (Précédent/Suivant)
- Barre de progression dynamique (33%, 67%, 100%)
- Sauvegarde automatique des réponses dans le navigateur
- Possibilité de modifier les réponses à tout moment

✅ **Système de notation automatique**
- Calcul selon la formule : (score obtenu / 9) × 5, arrondi à l'entier supérieur
- Score minimum par défaut = 1 (si aucune case cochée)
- Scores limités à un maximum de 5
- Calcul de la note moyenne retenue (arrondie à l'entier supérieur)

✅ **Page de validation**
- Confirmation de la complétion du questionnaire
- Barre de progression verte à 100%
- Options : "Modifier vos réponses" ou "Voir les résultats"

✅ **Page de résultats interactive**
- Tableau récapitulatif des 3 notes sur 5
- Graphique radar professionnel avec Chart.js
  - Zone de confort (vert pâle) : valeur fixe à 2 pour chaque axe
  - Zone de pilotage (blanc) : de 2 à 5
  - Votre situation (tracé orange) : basé sur vos réponses
- Affichage conditionnel des tableaux de recommandations selon le score moyen :
  - **Zone de confort** : tous les scores ≤ 2
  - **Zone de pilotage (base)** : note moyenne < 3
  - **Zone de pilotage (intermédiaire)** : note moyenne = 3
  - **Zone de pilotage (avancée)** : note moyenne = 4
  - **Zone de pilotage (expert)** : note moyenne = 5

✅ **Charte graphique Opteva**
- Couleurs : Blanc (80%), Gris (10%), Orange (7%), Rouge (3%)
- Police : Arimo (via Google Fonts)
- Design moderne et épuré
- Responsive (adapté mobile/tablette/desktop)

## Structure du projet

```
/
├── index.html              # Page principale (single page application)
├── css/
│   └── style.css          # Styles et charte graphique
├── js/
│   └── app.js             # Logique de l'application
├── images/
│   └── logo.svg           # Logo Opteva
└── README.md              # Documentation
```

## Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes, animations, responsive design
- **JavaScript (Vanilla)** : Logique métier, navigation, calculs
- **Chart.js** : Graphique radar interactif
- **Google Fonts** : Police Arimo
- **LocalStorage** : Sauvegarde des réponses

## Points d'entrée et navigation

### URL principale
- **/** ou **/index.html** : Point d'entrée de l'application

### Navigation interne (pages)
1. **Page d'introduction** (`#intro-page`) - Page d'accueil
2. **Question 1 - Organisation** (`#question1-page`)
3. **Question 2 - Offre** (`#question2-page`)
4. **Question 3 - Environnement** (`#question3-page`)
5. **Page de validation** (`#validation-page`)
6. **Page de résultats** (`#results-page`)

## Utilisation

1. **Démarrer le test** : Cliquer sur "Commencer le test" depuis la page d'introduction
2. **Répondre aux questions** : Cocher les propositions qui correspondent à votre situation
3. **Naviguer** : Utiliser les boutons "Précédent" et "Suivant"
4. **Valider** : Cliquer sur "Valider" après la question 3
5. **Consulter les résultats** : Cliquer sur "Voir les résultats"
6. **Modifier les réponses** : Possible à tout moment via le bouton "Modifier vos réponses"

## Logique de calcul

### Calcul des scores par domaine
```
Pour chaque question :
- Compter le nombre de cases cochées (0 à 9)
- Si score = 0, alors score = 1 (valeur par défaut)
- Note finale = ARRONDI_SUP((score / 9) × 5)
- Maximum : 5
```

### Calcul de la note moyenne
```
Note moyenne = (Score Organisation + Score Offre + Score Environnement) / 3
Note moyenne retenue = ARRONDI_SUP(Note moyenne)
Maximum : 5
```

### Logique d'affichage des résultats

| Condition | Interprétation affichée |
|-----------|-------------------------|
| Tous les scores ≤ 2 | Zone de confort |
| Note moyenne < 2 ET au moins un score > 2 | Zone de pilotage (base) |
| Note moyenne retenue = 3 | Zone de pilotage (base) |
| Note moyenne retenue = 4 | Zone de pilotage (avancée) |
| Note moyenne retenue ≥ 5 | Zone de pilotage (expert) |

## Fonctionnalités non implémentées

⚠️ **Fichiers externes non intégrés**
- Logo Opteva personnalisé (utilisation d'un placeholder SVG)
- Flèche orange pour les puces (utilisation de symboles Unicode)
- Document Introduction.docx (contenu intégré manuellement)

🔄 **Améliorations possibles**
- Export PDF des résultats
- Envoi des résultats par email
- Comparaison avec d'autres entreprises du secteur
- Historique des diagnostics pour suivre l'évolution
- Base de données backend pour centraliser les résultats

## Prochaines étapes recommandées

1. **Personnalisation visuelle**
   - Remplacer le logo SVG placeholder par le logo Opteva réel
   - Intégrer les images de flèche orange pour les puces personnalisées
   - Ajuster les couleurs exactes si nécessaire

2. **Améliorations fonctionnelles**
   - Ajouter une fonctionnalité d'export PDF
   - Implémenter un système de partage des résultats
   - Créer une page "À propos" avec plus d'informations sur Opteva

3. **Optimisations**
   - Ajouter des animations de transition entre les pages
   - Améliorer l'accessibilité (ARIA labels, navigation clavier)
   - Optimiser pour le référencement (SEO)

4. **Analytics**
   - Intégrer Google Analytics ou équivalent
   - Suivre le taux de complétion du questionnaire
   - Analyser les scores moyens obtenus

## Support navigateurs

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Navigateurs mobiles modernes (iOS Safari, Chrome Android)

## Licence

© Opteva - Tous droits réservés

---

**Date de création** : 2025-11-07
**Version** : 1.0.0
**Statut** : Production Ready ✅