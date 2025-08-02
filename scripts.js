// Estado de la aplicación
let isFirstCandidate = true;
let autoUpdateInterval = null;

// Datos de candidatos
const candidates = [
    {
        name: 'Samuel Doria Medina (Líder Actual)',
        emoji: '👨‍💼',
        gradient: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
        nftUrl: '' // Añade la URL del NFT aquí cuando la tengas
    },
    {
        name: 'Jorge Quiroga (Segundo Lugar)',
        emoji: '👔',
        gradient: 'linear-gradient(45deg, #ffecd2, #fcb69f)',
        nftUrl: '' // Añade la URL del NFT aquí cuando la tengas
    }
];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeAnimations();
    initializeChart();
    updateCandidateNFT();
});

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('toggle-candidate').addEventListener('click', toggleCandidate);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar animaciones
function initializeAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-in');
        }, index * 200);
    });
}

// Alternar candidato y actualizar NFT
function toggleCandidate() {
    isFirstCandidate = !isFirstCandidate;
    const currentCandidate = isFirstCandidate ? candidates[0] : candidates[1];
    
    const candidateImage = document.getElementById('candidate-image');
    const candidateName = document.getElementById('candidate-name');
    const toggleButton = document.getElementById('toggle-candidate');
    const nftImage = document.getElementById('nft-image');
    
    candidateImage.style.transform = 'scale(0.8)';
    candidateImage.style.opacity = '0.5';
    
    setTimeout(() => {
        if (currentCandidate.nftUrl) {
            nftImage.src = currentCandidate.nftUrl;
            nftImage.style.display = 'block';
            candidateImage.style.background = 'none';
            candidateImage.textContent = ''; // Clear emoji when image is present
        } else {
            nftImage.style.display = 'none';
            nftImage.src = ''; // Clear image source when no image is present
            candidateImage.style.background = currentCandidate.gradient;
            candidateImage.textContent = currentCandidate.emoji;
        }
        candidateName.textContent = currentCandidate.name;
        toggleButton.textContent = isFirstCandidate ? 'Ver Segundo Lugar' : 'Ver Candidato Líder';
        
        candidateImage.style.transform = 'scale(1)';
        candidateImage.style.opacity = '1';
    }, 200);
}

// Actualizar la imagen del NFT al cargar la página
function updateCandidateNFT() {
    const currentCandidate = isFirstCandidate ? candidates[0] : candidates[1];
    const nftImage = document.getElementById('nft-image');
    const candidateImage = document.getElementById('candidate-image');
    
    if (currentCandidate.nftUrl) {
        nftImage.src = currentCandidate.nftUrl;
        nftImage.style.display = 'block';
        candidateImage.style.background = 'none';
    } else {
        nftImage.style.display = 'none';
        candidateImage.style.background = currentCandidate.gradient;
        candidateImage.textContent = currentCandidate.emoji;
    }
}

// Inicializar gráfico de tendencias
function initializeChart() {
    const ctx = document.getElementById('trends-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [
                {
                    label: 'Samuel Doria Medina (Polymarket)',
                    data: [45, 47, 49, 50, 51, 51],
                    borderColor: '#ff6b6b',
                    fill: false
                },
                {
                    label: 'Samuel Doria Medina (Medios)',
                    data: [20, 22, 23, 24, 24.5, 24.5],
                    borderColor: '#ff9a9e',
                    fill: false,
                    borderDash: [5, 5]
                },
                {
                    label: 'Jorge Quiroga (Polymarket)',
                    data: [30, 31, 32, 33, 33, 33],
                    borderColor: '#4ecdc4',
                    fill: false
                },
                {
                    label: 'Jorge Quiroga (Medios)',
                    data: [18, 19, 20, 21, 22, 22.9],
                    borderColor: '#66b3aa',
                    fill: false,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje (%)',
                        color: '#fff'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                        color: '#fff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

// Función para mostrar información de la herramienta
function showTool(toolType) {
    const messages = {
        'risk': 'Análisis de Riesgo: Evaluando factores de incertidumbre electoral... (Funcionalidad en desarrollo)',
        'ai': 'Insights de IA: Analizando patrones en datos históricos... (Funcionalidad en desarrollo)',
        'optimization': 'Optimización: Calibrando modelos predictivos... (Funcionalidad en desarrollo)',
        'social': 'Análisis Social: Monitoreando tendencias en redes sociales... (Funcionalidad en desarrollo)'
    };
    alert(messages[toolType] || 'Herramienta en desarrollo. ¡Pronto más funcionalidades!');
}


