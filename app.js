// Application state
const appState = {
    currentPage: 'intro',
    scores: {
        q1: 0,
        q2: 0,
        q3: 0
    },
    finalScores: {
        organisation: 0,
        offre: 0,
        environnement: 0
    },
    questionnairCompleted: false
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    loadSavedAnswers();
});

// Start questionnaire
function startQuestionnaire() {
    goToPage('question1');
}

// Navigate between pages
function goToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageName;
        
        // Update progress bars
        updateProgress();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Update progress bars
function updateProgress() {
    const progress1 = 33;
    const progress2 = 67;
    const progress3 = 100;
    
    // Update progress bar widths
    const fill1 = document.getElementById('progress-fill');
    const fill2 = document.getElementById('progress-fill2');
    const fill3 = document.getElementById('progress-fill3');
    
    if (fill1) fill1.style.width = progress1 + '%';
    if (fill2) fill2.style.width = progress2 + '%';
    if (fill3) fill3.style.width = progress3 + '%';
}

// Validate questionnaire
function validateQuestionnaire() {
    // Calculate scores
    calculateScores();
    
    // Mark as completed
    appState.questionnairCompleted = true;
    
    // Save answers
    saveAnswers();
    
    // Go to validation page
    goToPage('validation');
}

// Calculate scores for all questions
function calculateScores() {
    // Question 1 - Organisation
    const q1Checkboxes = document.querySelectorAll('input[name="q1"]:checked');
    let score1 = q1Checkboxes.length;
    if (score1 === 0) score1 = 1;
    appState.scores.q1 = score1;
    
    // Question 2 - Offre
    const q2Checkboxes = document.querySelectorAll('input[name="q2"]:checked');
    let score2 = q2Checkboxes.length;
    if (score2 === 0) score2 = 1;
    appState.scores.q2 = score2;
    
    // Question 3 - Environnement
    const q3Checkboxes = document.querySelectorAll('input[name="q3"]:checked');
    let score3 = q3Checkboxes.length;
    if (score3 === 0) score3 = 1;
    appState.scores.q3 = score3;
    
    // Calculate final scores (note / 9 * 5, rounded up)
    appState.finalScores.organisation = Math.ceil((score1 / 9) * 5);
    appState.finalScores.offre = Math.ceil((score2 / 9) * 5);
    appState.finalScores.environnement = Math.ceil((score3 / 9) * 5);
    
    // Ensure scores don't exceed 5
    appState.finalScores.organisation = Math.min(appState.finalScores.organisation, 5);
    appState.finalScores.offre = Math.min(appState.finalScores.offre, 5);
    appState.finalScores.environnement = Math.min(appState.finalScores.environnement, 5);
}

// Show results page
function showResults() {
    if (!appState.questionnairCompleted) {
        alert('Veuillez d\'abord compléter le questionnaire');
        return;
    }
    
    // Display scores in table
    document.getElementById('score-org').textContent = appState.finalScores.organisation;
    document.getElementById('score-offre').textContent = appState.finalScores.offre;
    document.getElementById('score-env').textContent = appState.finalScores.environnement;
    
    // Create radar chart
    createRadarChart();
    
    // Display interpretation
    displayInterpretation();
    
    // Go to results page
    goToPage('results');
}

// Create radar chart
function createRadarChart() {
    const ctx = document.getElementById('radarChart');
    
    // Destroy existing chart if it exists
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
    }
    
    const data = {
        labels: ['Organisation', 'Offre', 'Environnement / Contexte'],
        datasets: [
            {
                label: 'Zone de confort',
                data: [2, 2, 2],
                backgroundColor: 'rgba(144, 238, 144, 0.3)',
                borderColor: 'rgba(144, 238, 144, 0.8)',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                label: 'Zone de pilotage',
                data: [5, 5, 5],
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(200, 200, 200, 0.3)',
                borderWidth: 1,
                pointRadius: 0
            },
            {
                label: 'Votre situation',
                data: [
                    appState.finalScores.organisation,
                    appState.finalScores.offre,
                    appState.finalScores.environnement
                ],
                backgroundColor: 'rgba(223, 156, 110, 0)',
                borderColor: 'rgb(223, 156, 110)',
                borderWidth: 4,
                pointBackgroundColor: 'rgb(223, 156, 110)',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 14,
                            family: 'Arimo'
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 16,
                            family: 'Arimo',
                            weight: 'bold'
                        },
                        color: 'rgb(83, 87, 87)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Arimo'
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14,
                        family: 'Arimo'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Arimo'
                    },
                    padding: 12
                }
            }
        }
    };
    
    window.radarChartInstance = new Chart(ctx, config);
}

// Display interpretation based on scores
function displayInterpretation() {
    const org = appState.finalScores.organisation;
    const offre = appState.finalScores.offre;
    const env = appState.finalScores.environnement;
    
    // Calculate average score (rounded up)
    const avgScore = (org + offre + env) / 3;
    const avgScoreRetenue = Math.ceil(avgScore);
    
    const interpretationDiv = document.getElementById('interpretation-content');
    
    let content = '';
    
    // Determine which interpretation to show
    if (org <= 2 && offre <= 2 && env <= 2) {
        // All scores <= 2: Zone de confort
        content = getZoneConfortContent();
    } else if (avgScore < 2 && (org > 2 || offre > 2 || env > 2)) {
        // Average < 2 but at least one domain > 2: Zone de pilotage (base)
        content = getZonePilotageBaseContent();
    } else if (avgScoreRetenue === 3) {
        // Average rounded to 3
        content = getZonePilotageBaseContent();
    } else if (avgScoreRetenue === 4) {
        // Average rounded to 4
        content = getZonePilotageAvanceeContent();
    } else if (avgScoreRetenue >= 5) {
        // Average rounded to 5
        content = getZonePilotageExpertContent();
    } else {
        // Default: Zone de pilotage base
        content = getZonePilotageBaseContent();
    }
    
    interpretationDiv.innerHTML = content;
}

// Zone de confort content
function getZoneConfortContent() {
    return `
        <div class="interpretation-title">
            Vous évoluez dans une zone de confort. Le niveau de service fourni par la DAF et/ou le Contrôle de Gestion peut se limiter au contenu suivant :
        </div>
        
        <div class="interpretation-tables">
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Le niveau de service fourni par la Direction Financière :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Positionnement - Rôle</td>
                            <td>Elaboration et suivi du budget sur la base d'éléments analytiques</td>
                        </tr>
                        <tr>
                            <td>Champ d'intervention</td>
                            <td>Indicateurs et flux financiers élémentaires</td>
                        </tr>
                        <tr>
                            <td>Production et gestion de l'information</td>
                            <td>La donnée est organisée par destinataire, premier niveau d'automatisation et premières analyses des résultats concentrés sur le reporting financier</td>
                        </tr>
                        <tr>
                            <td>Réactivité face aux demandes des clients</td>
                            <td>Les nouvelles demandes peuvent être envisagées, pas de visibilité sur le délai de réponse</td>
                        </tr>
                        <tr>
                            <td>Indice de confiance des clients</td>
                            <td>Confiance limitée aux données comptables</td>
                        </tr>
                        <tr>
                            <td>Diffusion de la culture de gestion</td>
                            <td>L'intérêt se porte sur les résultats, il se limite à la DG</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Votre niveau de maîtrise des outils de gestion :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Compréhension de l'organisation Maîtrise des productions</td>
                            <td>Positionnement clair des responsabilités budgétaires et maîtrise de la fonction production</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des coûts et de la valeur</td>
                            <td>L'affectation des coûts est opérée pour la composante directe et variable<br>Direct Costing - Coût complet</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus prévisionnel</td>
                            <td>Exercice budgétaire centralisé, concentré sur les prévisions de chiffre d'affaires et de coûts directs. Il est complété par une reconduction des budgets de dépenses antérieurs.</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus d'arrêté des comptes</td>
                            <td>Un enregistrement régulier de l'ensemble des flux en comptabilité</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du reporting</td>
                            <td>Un suivi des dépenses alimente un reporting de gestion centralisé</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des tableaux de bord</td>
                            <td>Quelques indicateurs opérationnels produits avec le reporting financier. Quelques tableaux de bord sont utilisés dans les fonctions de production</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du système d'information</td>
                            <td>Les sources de données de production sont exploitées</td>
                        </tr>
                        <tr>
                            <td>Outillage</td>
                            <td>Utilisation avancée d'Excel pour extraire et traiter la donnée</td>
                        </tr>
                        <tr>
                            <td>Organisation et process</td>
                            <td>Une organisation centrale et un plan de consolidation des données existe, les unités locales restent autonomes, les référentiels et les règles de gestion demeurent spécifiques</td>
                        </tr>
                        <tr>
                            <td>Capital humain</td>
                            <td>Le Contrôle de Gestion émerge, il est partagé avec la fonction comptable</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Zone de pilotage base content
function getZonePilotageBaseContent() {
    return `
        <div class="interpretation-title">
            Vous évoluez dans la zone de pilotage. Le niveau de service fourni par la DAF et/ou le Contrôle de Gestion doit correspondre à minima au contenu suivant :
        </div>
        
        <div class="interpretation-tables">
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Le niveau de service fourni par la Direction Financière :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Positionnement - Rôle</td>
                            <td>Implication aux côtés des opérationnels pour accompagner et partager l'élaboration et le suivi du budget</td>
                        </tr>
                        <tr>
                            <td>Champ d'intervention</td>
                            <td>Compilation des indicateurs financiers et opérationnels basiques</td>
                        </tr>
                        <tr>
                            <td>Production et gestion de l'information</td>
                            <td>La production de données est organisée et automatisée de manière à produire de l'information, l'analyse progresse et dépasse le champ du reporting</td>
                        </tr>
                        <tr>
                            <td>Réactivité face aux demandes des clients</td>
                            <td>Les nouvelles demandes sont traitées dans un délai maximum d'un mois</td>
                        </tr>
                        <tr>
                            <td>Indice de confiance des clients</td>
                            <td>La confiance est accordée sur les données du reporting</td>
                        </tr>
                        <tr>
                            <td>Diffusion de la culture de gestion</td>
                            <td>Les opérationnels sont responsables de leurs résultats</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Votre niveau de maîtrise des outils de gestion :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Compréhension de l'organisation Maîtrise des productions</td>
                            <td>Positionnement des responsabilités et des productions appliqué à l'ensemble de l'organisation</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des coûts et de la valeur</td>
                            <td>L'ensemble des coûts est traité, la notion d'inducteur est appliquée<br>Coûts à base d'activités / productions</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus prévisionnel</td>
                            <td>Le budget est détaillé par fonction et par responsable. Il couvre l'ensemble des natures de charges.</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus d'arrêté des comptes</td>
                            <td>Des arrêtés intermédiaires permettant de produire une ou plusieurs situations en cours d'année</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du reporting</td>
                            <td>Le reporting est diffusé auprès des opérationnels, il se concentre sur les euros</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des tableaux de bord</td>
                            <td>Les indicateurs de performance sont présents dans l'ensemble de l'organisation par fonction.</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du système d'information</td>
                            <td>Un référentiel analytique est utilisé, les indicateurs opérationnels sont extraits du SI</td>
                        </tr>
                        <tr>
                            <td>Outillage</td>
                            <td>Utilisation d'Excel en complément d'un outil de reporting / BI</td>
                        </tr>
                        <tr>
                            <td>Organisation et process</td>
                            <td>Organisation, processus et référentiels de gestion sont centralisés, les passerelles entre entités sont sécurisées</td>
                        </tr>
                        <tr>
                            <td>Capital humain</td>
                            <td>Des ressources sont dédiées au Contrôle de Gestion</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Zone de pilotage avancée content (note = 4)
function getZonePilotageAvanceeContent() {
    return `
        <div class="interpretation-title">
            Vous évoluez dans la zone de pilotage. Le niveau de service fourni par la DAF et/ou le Contrôle de Gestion doit correspondre à minima au contenu suivant :
        </div>
        
        <div class="interpretation-tables">
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Le niveau de service fourni par la Direction Financière :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Positionnement - Rôle</td>
                            <td>La dimension opérationnelle de l'activité vient compléter le financier, positionnement de business partner</td>
                        </tr>
                        <tr>
                            <td>Champ d'intervention</td>
                            <td>Capacité à aligner le financier et l'opérationnel, les indicateurs sont contextualisés</td>
                        </tr>
                        <tr>
                            <td>Production et gestion de l'information</td>
                            <td>La production du reporting et des tableaux de bord est automatisée, l'analyse couvre l'ensemble de l'information produite</td>
                        </tr>
                        <tr>
                            <td>Réactivité face aux demandes des clients</td>
                            <td>Toutes les nouvelles demandes sont traitées dans un délai établi, inférieur à quinze jours</td>
                        </tr>
                        <tr>
                            <td>Indice de confiance des clients</td>
                            <td>La confiance est étendue à l'ensemble des informations produites</td>
                        </tr>
                        <tr>
                            <td>Diffusion de la culture de gestion</td>
                            <td>Les opérationnels sont responsables de leurs résultats et maîtrisent les leviers d'action sur leur performance</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Votre niveau de maîtrise des outils de gestion :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Compréhension de l'organisation Maîtrise des productions</td>
                            <td>Les mesures de production et de capacité sont maîtrisées sur tous les périmètres</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des coûts et de la valeur</td>
                            <td>Le modèle de coût est utilisé pour une approche prospective des coûts lors de la conception des offres<br>Design to Cost et Target Costing</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus prévisionnel</td>
                            <td>Le budget devient la traduction opérationnelle et financière des objectifs de la Direction Générale. Une réflexion sur les capacités est possible dans toute l'organisation. La reprévision est mensuelle</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus d'arrêté des comptes</td>
                            <td>Un arrêté de gestion mensuel intégrant la gestion des flux d'intercos</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du reporting</td>
                            <td>Le reporting mensuel est consolidé</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des tableaux de bord</td>
                            <td>Des tableaux de bord de direction ou opérationnels sont déployés par fonction sans coordination d'ensemble</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du système d'information</td>
                            <td>L'ensemble de la donnée financière et opérationnelle est industrialisé, les référentiels sont maîtrisés, l'accès est partagé et sécurisé</td>
                        </tr>
                        <tr>
                            <td>Outillage</td>
                            <td>Utilisation d'une solution pour accompagner le processus budgétaire et l'élaboration du reporting</td>
                        </tr>
                        <tr>
                            <td>Organisation et process</td>
                            <td>Les services financiers des entités sont rattachés hiérarchiquement à la Finance Groupe.</td>
                        </tr>
                        <tr>
                            <td>Capital humain</td>
                            <td>Une bonne connaissance des savoir-faire et des savoir-être Contrôle de Gestion est partagée et reconnue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Zone de pilotage expert content (note = 5)
function getZonePilotageExpertContent() {
    return `
        <div class="interpretation-title">
            Vous évoluez dans la zone de pilotage. Le niveau de service fourni par la DAF et/ou le Contrôle de Gestion doit correspondre à minima au contenu suivant :
        </div>
        
        <div class="interpretation-tables">
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Le niveau de service fourni par la Direction Financière :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Positionnement - Rôle</td>
                            <td>La fonction est partie prenante à la définition et à l'exécution de la stratégie</td>
                        </tr>
                        <tr>
                            <td>Champ d'intervention</td>
                            <td>La fonction concentre l'ensemble de l'information de gestion et d'aide au pilotage stratégique et opérationnel</td>
                        </tr>
                        <tr>
                            <td>Production et gestion de l'information</td>
                            <td>Approche proactive, anticipation des besoins, focus sur l'animation et le dialogue de gestion Connaissance</td>
                        </tr>
                        <tr>
                            <td>Réactivité face aux demandes des clients</td>
                            <td>Toutes les nouvelles demandes sont traitées dans un délai établi, inférieur à cinq jours</td>
                        </tr>
                        <tr>
                            <td>Indice de confiance des clients</td>
                            <td>Le Contrôle de Gestion contrôle et garantit l'ensemble de l'information produite mensuellement</td>
                        </tr>
                        <tr>
                            <td>Diffusion de la culture de gestion</td>
                            <td>Les opérationnels maîtrisent parfaitement les relations de cause à effet entre l'opérationnel et le financier</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="result-table">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'évaluation :</th>
                            <th>Votre niveau de maîtrise des outils de gestion :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Compréhension de l'organisation Maîtrise des productions</td>
                            <td>Une vision transverse des productions est partagée au sein de l'organisation</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des coûts et de la valeur</td>
                            <td>La réflexion sur les coûts est indissociable de la réflexion sur la valeur et l'empreinte carbone</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus prévisionnel</td>
                            <td>Budget, tableaux de bord et reportings sont liés. Le rolling forecast est maîtrisé il inclut la gestion prévisionnelle de la trésorerie</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du processus d'arrêté des comptes</td>
                            <td>Un arrêté comptable mensuel incluant une gestion de l'appurement des comptes de tiers</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du reporting</td>
                            <td>Le reporting offre une analyse du réalisé concentrée sur les hypothèses opérationnelles du budget.</td>
                        </tr>
                        <tr>
                            <td>Maîtrise des tableaux de bord</td>
                            <td>Le tableau de bord stratégique est décliné dans l'organisation en tableaux de bord opérationnels sur l'ensemble des dimensions du pilotage</td>
                        </tr>
                        <tr>
                            <td>Maîtrise du système d'information</td>
                            <td>L'ensemble de la donnée financière et opérationnelle est processée, les référentiels sont maîtrisés, l'accès est sécurisé, le SI de gestion est évolutif</td>
                        </tr>
                        <tr>
                            <td>Outillage</td>
                            <td>L'ensemble des process du Contrôle de Gestion est porté par un SI de gestion intégré</td>
                        </tr>
                        <tr>
                            <td>Organisation et process</td>
                            <td>L'ensemble des règles de gestion, des process, des choix d'outillage et de recrutement est centralisé puis décliné dans les entités du Groupe</td>
                        </tr>
                        <tr>
                            <td>Capital humain</td>
                            <td>On passe du contrôle à l'animation de la maîtrise à l'expertise</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Save answers to localStorage
function saveAnswers() {
    const answers = {
        q1: [],
        q2: [],
        q3: []
    };
    
    // Save Q1
    document.querySelectorAll('input[name="q1"]').forEach((checkbox, index) => {
        answers.q1.push(checkbox.checked);
    });
    
    // Save Q2
    document.querySelectorAll('input[name="q2"]').forEach((checkbox, index) => {
        answers.q2.push(checkbox.checked);
    });
    
    // Save Q3
    document.querySelectorAll('input[name="q3"]').forEach((checkbox, index) => {
        answers.q3.push(checkbox.checked);
    });
    
    localStorage.setItem('opteva_answers', JSON.stringify(answers));
}

// Load saved answers from localStorage
function loadSavedAnswers() {
    const savedAnswers = localStorage.getItem('opteva_answers');
    if (!savedAnswers) return;
    
    try {
        const answers = JSON.parse(savedAnswers);
        
        // Restore Q1
        const q1Checkboxes = document.querySelectorAll('input[name="q1"]');
        if (answers.q1 && answers.q1.length === q1Checkboxes.length) {
            q1Checkboxes.forEach((checkbox, index) => {
                checkbox.checked = answers.q1[index];
            });
        }
        
        // Restore Q2
        const q2Checkboxes = document.querySelectorAll('input[name="q2"]');
        if (answers.q2 && answers.q2.length === q2Checkboxes.length) {
            q2Checkboxes.forEach((checkbox, index) => {
                checkbox.checked = answers.q2[index];
            });
        }
        
        // Restore Q3
        const q3Checkboxes = document.querySelectorAll('input[name="q3"]');
        if (answers.q3 && answers.q3.length === q3Checkboxes.length) {
            q3Checkboxes.forEach((checkbox, index) => {
                checkbox.checked = answers.q3[index];
            });
        }
    } catch (e) {
        console.error('Error loading saved answers:', e);
    }
}