// Фоновая картинка
let currentImgBackground = "";
let isAnimating = false;
let backgroundLayer = null;

const initializeBackgroundLayer = () => {
    if (!backgroundLayer) {
        backgroundLayer = document.createElement('div');
        backgroundLayer.classList.add('dynamic-background-layer');
        document.body.appendChild(backgroundLayer);
        backgroundLayer.style.position = 'fixed';
        backgroundLayer.style.top = '-10px';
        backgroundLayer.style.left = '-10px';
        backgroundLayer.style.width = 'calc(100vw + 20px)';
        backgroundLayer.style.height = 'calc(100vh + 20px)';
        backgroundLayer.style.zIndex = '-2';
        backgroundLayer.style.backgroundSize = 'cover';
        backgroundLayer.style.backgroundPosition = 'center';
        backgroundLayer.style.transition = 'opacity 1s ease';
        backgroundLayer.style.willChange = 'opacity, background-image';
        backgroundLayer.style.transform = 'translateZ(0)';
        backgroundLayer.style.filter = 'blur(3px) brightness(0.5)';
    }
};

const updateBackgroundImage = (imgBackground) => {
    if (backgroundLayer) {
        if (backgroundLayer.style.backgroundImage.includes(imgBackground)) {
            return;
        }

        const tempLayer = document.createElement('div');
        tempLayer.style.position = 'fixed';
        tempLayer.style.top = '-10px';
        tempLayer.style.left = '-10px';
        tempLayer.style.width = 'calc(100vw + 20px)';
        tempLayer.style.height = 'calc(100vh + 20px)';
        tempLayer.style.zIndex = '-1';
        tempLayer.style.backgroundSize = 'cover';
        tempLayer.style.backgroundPosition = 'center';
        tempLayer.style.opacity = '0';
        tempLayer.style.transition = 'opacity 1s ease';
        tempLayer.style.backgroundImage = `url(${imgBackground})`;
        tempLayer.style.filter = 'blur(3px) brightness(0.5)';

        const img = new Image();
        img.src = imgBackground;
        img.onload = () => {
            document.body.appendChild(tempLayer);

            requestAnimationFrame(() => {
                tempLayer.style.opacity = '1';

                tempLayer.addEventListener('transitionend', () => {
                    if (backgroundLayer) {
                        backgroundLayer.remove();
                    }
                    backgroundLayer = tempLayer;
                    isAnimating = false;
                });
            });

            isAnimating = true;
        };
    }
};

setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover__IYLwR"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/1000x1000')) {
            imgBackground = img.src.replace('/1000x1000', '/1000x1000');
        }
    });

    if (imgBackground && imgBackground !== currentImgBackground && !isAnimating) {
        initializeBackgroundLayer();
        updateBackgroundImage(imgBackground);
        currentImgBackground = imgBackground;
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

// Скрытие фуллскрина без фуллскрина
function checkAriaHidden() {
    const ariaElement = document.querySelector('[aria-label="Включить текстомузыку Может нарушить доступность"]');
    const l66GiFKS1Ux = document.querySelector('.l66GiFKS1Ux_BNd603Cu');
    const fullscreenPlayerCloseButton = document.querySelector('[data-test-id="FULLSCREEN_PLAYER_CLOSE_BUTTON"]');

    if (ariaElement && l66GiFKS1Ux && fullscreenPlayerCloseButton) {
        if (ariaElement.getAttribute('aria-hidden') === 'true') {
            l66GiFKS1Ux.style.display = 'none';
            fullscreenPlayerCloseButton.style.display = 'none';
        } else if (ariaElement.getAttribute('aria-hidden') === 'false') {
            l66GiFKS1Ux.style.display = '';
            fullscreenPlayerCloseButton.style.display = '';
        }
    }
}

setInterval(checkAriaHidden, 500);

// Авто смена темы Яндекс Музыки на тёмную
setInterval(() => {
  const body = document.body;
  if (!body.classList.contains('ym-dark-theme') && !body.classList.contains('ym-light-theme')) {
    body.classList.add('ym-dark-theme');
  } else if (body.classList.contains('ym-light-theme')) {
    body.classList.replace('ym-light-theme', 'ym-dark-theme');
  }
}, 0);

// Закрытие синк лирики на кнопку синк лирики
setInterval(() => {
    const closeButton = document.querySelector('.FullscreenPlayerDesktop_closeButton__MQ64s');
    const overlayButton = document.querySelector('.openCloseButton');
    const syncLyricsButton = document.querySelector('[aria-label="Включить текстомузыку Может нарушить доступность"]');

    if (!closeButton || !syncLyricsButton) {
        overlayButton?.remove();
        return;
    }

    const isHidden = syncLyricsButton.getAttribute('aria-hidden') === 'true';
    syncLyricsButton.classList.toggle('sync-lyrics-hidden', isHidden);
    syncLyricsButton.classList.toggle('sync-lyrics-visible', !isHidden);

    if (isHidden) {
        overlayButton?.remove();
    } else {
        if (!overlayButton) {
            const openCloseButton = document.createElement('button');
            openCloseButton.className = 'openCloseButton';
            Object.assign(openCloseButton.style, {
                position: 'absolute',
                top: `${syncLyricsButton.getBoundingClientRect().top}px`,
                left: `${syncLyricsButton.getBoundingClientRect().left}px`,
                width: `${syncLyricsButton.offsetWidth}px`,
                height: `${syncLyricsButton.offsetHeight}px`,
                zIndex: '9999',
                opacity: '0',
                cursor: 'pointer',
            });
            document.body.appendChild(openCloseButton);

            openCloseButton.onclick = () => closeButton.click();
            openCloseButton.onmouseenter = () => syncLyricsButton.classList.add('hovered');
            openCloseButton.onmouseleave = () => syncLyricsButton.classList.remove('hovered');
        } else {
            Object.assign(overlayButton.style, {
                top: `${syncLyricsButton.getBoundingClientRect().top}px`,
                left: `${syncLyricsButton.getBoundingClientRect().left}px`,
                width: `${syncLyricsButton.offsetWidth}px`,
                height: `${syncLyricsButton.offsetHeight}px`,
            });
        }

        syncLyricsButton.onmouseenter = () => {
            if (!isHidden) syncLyricsButton.classList.add('hovered');
        };
        syncLyricsButton.onmouseleave = () => {
            if (!isHidden) syncLyricsButton.classList.remove('hovered');
        };
    }
}, 500);