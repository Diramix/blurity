let currentImgBackground = "";

setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover__IYLwR"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/1000x1000')) {
            imgBackground = img.src.replace('/1000x1000', '/1000x1000');
        }
    });

    if (imgBackground && imgBackground !== currentImgBackground) {
        const bodyElement = document.querySelector('body');

        if (bodyElement) {
            let backgroundLayer1 = document.querySelector('.dynamic-background-layer-1');
            let backgroundLayer2 = document.querySelector('.dynamic-background-layer-2');

            if (!backgroundLayer1) {
                backgroundLayer1 = document.createElement('div');
                backgroundLayer1.classList.add('dynamic-background-layer-1');
                backgroundLayer1.classList.add('dynamic-background');
                bodyElement.appendChild(backgroundLayer1);
                backgroundLayer1.style.position = 'fixed';
                backgroundLayer1.style.top = '0';
                backgroundLayer1.style.left = '0';
                backgroundLayer1.style.width = '100vw';
                backgroundLayer1.style.height = '100vh';
                backgroundLayer1.style.zIndex = '-2';
                backgroundLayer1.style.backgroundSize = 'cover';
                backgroundLayer1.style.backgroundPosition = 'center';
                backgroundLayer1.style.transition = 'opacity 1s ease';
                backgroundLayer1.style.opacity = '1';
                backgroundLayer1.style.willChange = 'opacity, background-image';
            }

            if (!backgroundLayer2) {
                backgroundLayer2 = document.createElement('div');
                backgroundLayer2.classList.add('dynamic-background-layer-2');
                backgroundLayer2.classList.add('dynamic-background');
                bodyElement.appendChild(backgroundLayer2);
                backgroundLayer2.style.position = 'fixed';
                backgroundLayer2.style.top = '0';
                backgroundLayer2.style.left = '0';
                backgroundLayer2.style.width = '100vw';
                backgroundLayer2.style.height = '100vh';
                backgroundLayer2.style.zIndex = '-3';
                backgroundLayer2.style.backgroundSize = 'cover';
                backgroundLayer2.style.backgroundPosition = 'center';
                backgroundLayer2.style.transition = 'opacity 1s ease';
                backgroundLayer2.style.opacity = '0';
                backgroundLayer2.style.willChange = 'opacity, background-image';
            }

            const img = new Image();
            img.src = imgBackground;

            img.onload = () => {
                backgroundLayer2.style.backgroundImage = `url(${imgBackground})`;
                backgroundLayer2.style.opacity = '1';

                setTimeout(() => {
                    backgroundLayer1.style.opacity = '0';
                }, 500);

                setTimeout(() => {
                    backgroundLayer1.style.backgroundImage = backgroundLayer2.style.backgroundImage;
                    backgroundLayer1.style.opacity = '1';
                    backgroundLayer2.style.opacity = '0';
                }, 1500);
            };

            img.onerror = () => {
                console.error(`Ошибка загрузки изображения: ${imgBackground}`);
            };

            currentImgBackground = imgBackground;
        }
    }
}, 1000);

// Отключение тупого даблклика
function disableDoubleClick() {
    const elements = document.querySelectorAll('.PlayerBar_root__cXUnU');

    elements.forEach(element => {
        element.addEventListener('dblclick', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, true);
    });
}

setInterval(disableDoubleClick, 1000);

function checkHeight() {
    const contentElement = document.querySelector('.DefaultLayout_content__md70Z');
    const mneLenElement = document.querySelector('.mneLen');

    if (contentElement && mneLenElement) {
        const currentHeight = contentElement.clientHeight;
        const windowHeight = window.innerHeight;
        const thresholdHeight = windowHeight * 0.8;

        if (currentHeight < thresholdHeight) {
            mneLenElement.style.display = 'block';
        } else {
            mneLenElement.style.display = 'none';
        }
    }
}

setInterval(checkHeight, 100);

var mneLen = document.createElement('div');
mneLen.className = 'mneLen';
mneLen.textContent = 'Мне лень оптимизировать';
document.body.appendChild(mneLen);

function checkAndReplaceText() {
    const element = document.querySelector('.ReleaseNotesModal_paragraph___laDJ');
    if (element) {
        const currentText = element.textContent.trim();
        const targetText = 'Выбираем весёлое настроение в Моей волне! Какой повод? Мы снова справились со всеми багами — теперь ничто не помешает вам открывать новую музыку';
        const replacementText = 'В этом обновлении Diramix в край ахуел и забил на тему YouTube а также на оптимизацию этой темы. Она выглядит хуёво и скорее всего не будет обновляться. Можете написать об ошибках в теме Дирамиксу и ему будет похуй!';
        if (currentText === targetText) {
            element.textContent = replacementText;
        }
    }
}

setInterval(checkAndReplaceText, 1000);
