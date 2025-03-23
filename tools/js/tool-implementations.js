
// Sentiment Analysis
async function analyzeSentimentText(text) {
    // This is a simple implementation. In a real application,
    // you would want to use a proper NLP library or API
    const words = text.toLowerCase().split(/\s+/);
    
    const sentimentScores = {
        positive: ['good', 'great', 'awesome', 'excellent', 'happy', 'love'],
        negative: ['bad', 'awful', 'terrible', 'hate', 'angry', 'sad'],
        emotions: {
            'Joy': ['happy', 'delighted', 'excited'],
            'Sadness': ['sad', 'unhappy', 'depressed'],
            'Anger': ['angry', 'furious', 'annoyed'],
            'Fear': ['scared', 'afraid', 'worried'],
            'Surprise': ['amazed', 'astonished', 'surprised']
        }
    };

    let score = 0;
    const emotions = {};

    // Calculate basic sentiment
    words.forEach(word => {
        if (sentimentScores.positive.includes(word)) score += 0.3;
        if (sentimentScores.negative.includes(word)) score -= 0.3;
    });

    // Normalize score between -1 and 1
    score = Math.max(-1, Math.min(1, score));

    // Calculate emotion scores
    Object.entries(sentimentScores.emotions).forEach(([emotion, keywords]) => {
        const matches = words.filter(word => keywords.includes(word)).length;
        emotions[emotion] = Math.min(1, matches * 0.3);
    });

    return {
        score,
        label: score > 0.3 ? 'Positive' : score < -0.3 ? 'Negative' : 'Neutral',
        emotions
    };
}

// Image Converter
function convertImage(file, format) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                try {
                    const dataUrl = canvas.toDataURL(`image/${format}`);
                    resolve(dataUrl);
                } catch (error) {
                    reject('Format not supported');
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// Helper functions
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
