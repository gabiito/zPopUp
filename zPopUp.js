function zPopUp({
    title = '',
    headerIcon = null,
    showFooter = true,
    backColor = 'rgba(0,0,0,.4)',
    popUpBackground = null,
    color = null,
    accentColor = null,
    buttonTextColor = null,
    showOkButton = true,
    okButtonText = null,
    showCancelButton = true,
    cancelButtonText = null,
    showNextButton = false,
    nextButtonText = null,
    showPrevButton = false,
    prevButtonText = null,
    htmlPages = [],
    html = '',
    width = null,
    zIndex = null,
    outsideClick = 'close',
    customClass = ''
} = {}) {
    //ClasList & HTML declaration
    const clCONTAINER = ['zpopup', 'container'];
    const clMAIN_CONTENT = customClass === '' ? ['zpopup', 'main-content'] : ['zpopup', 'main-content', customClass];
    const clHEADER = ['zpopup__header'];
    const clHEADER_BTN_CLOSE = ['zpopup__header__button-close']
    const inHEADER_BTN_CLOSE_SVG = `<svg viewbox="0 0 40 40"><path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>`;
    const clHEADER_TITLE = ['zpopup__header__title'];
    const clHEADER_TITLE_ICON = ['zpopup__header__title-icon'];
    const clHEADER_TITLE_TEXT = ['zpopup__header__title-text'];
    const clINDICATORS = ['zpopup__header__indicators'];
    const clINDICATORS_DOTS = ['zpopup__header__indicators-dots'];
    const clINDICATORS_DASHES = ['zpopup__header__indicators-dashes'];
    const clINDICATORS_NUMBERS = ['zpopup__header__indicators-numbers'];
    const clFOOTER = ['zpopup__footer'];
    const clFOOTER_BUTTONS = ['zpopup__footer__buttons'];
    const clDOTS = ['zpopup-dot'];
    const clDASH = ['zpopup-dash'];
    const clNUMBER = ['zpopup-number'];
    const clBODY = ['zpopup__body'];
    const clBTN_OK = ['zpopup-btn', 'btn-ok'];
    const clBTN_CANCEL = ['zpopup-btn', 'btn-cancel'];
    const clBTN_PREV = ['zpopup-btn', 'btn-prev'];
    const clBTN_NEXT = ['zpopup-btn', 'btn-next'];
    
    //Custom definitions
    const VAR_COLOR = '--zpopup-color';
    const VAR_ACCENT_COLOR = '--zpopup-accent-color';
    const VAR_MAIN_BACKGROUND = '--zpopup-main-background';
    const VAR_BUTTON_TXT_COLOR = '--zpopup-button-text-color';
    const VAR_WIDTH = '--zpopup-width';
    const VAR_Z_INDEX = '--zpopup-z-index';
    const clHIDDEN = 'hidden';
    const div = 'div';
    const btn = 'button';
    const icon = 'i';
    const NUMBER_INDICATOR = 'number';
    const DOT_INDICATOR = 'dot';
    const DASH_INDICATOR = 'dash';
    const HEADER_POS = 'header';
    const FOOTER_POS = 'footer';
    const SHOW = 'show';
    const evtClose = 'close';
    const evtCancel = 'cancel';
    const evtOk = 'ok';

    //Scope variables
    let container;
    let mainContent;
    let header;
    let close;
    let titleCont;
    let titleIcon;
    let titleText;
    let ppBody;
    let footer;
    let footerButtons;
    let btnOk;
    let btnCancel;
    let btnNext;
    let btnPrev;

    let ppBodyPages = {
        count: 0,
        pages: [],
        on: 0
    };

    let beforeCancelCB = function () { return new Promise(resolve => {resolve(true)}); };
    let beforeConfirmCB = function () { return new Promise(resolve => {resolve(true)}); };
    let beforeCloseCB = function () { return new Promise(resolve => {resolve(true)}); };

    /* BEGIN CONSTRUCTOR */
    (function construct(){
        updateRootVars();
        if (htmlPages.length > 0) {
            htmlPages.forEach(page => {
            addPage(page);
            });
        }
        else if ( html !== '') {
            addPage(html);
        }
        container = newElem(div, clCONTAINER);
        container.addEventListener('click', (evt) => {
            if (outsideClick === evtClose && evt.target.classList.contains(clCONTAINER[1])) {
                closePopUp(evtClose);
            }
        });
        mainContent = newElem(div, clMAIN_CONTENT);
        if (width) { mainContent.style.width = width; }
        container.append(mainContent);

        //HEADER
        header = newElem(div, clHEADER);
        close = newElem(div, clHEADER_BTN_CLOSE);
        close.innerHTML = inHEADER_BTN_CLOSE_SVG;
        
        close.addEventListener('click', () => {
            closePopUp(evtClose);
        });
        
        titleCont = newElem(div, clHEADER_TITLE);
        titleIcon = newElem(div, clHEADER_TITLE_ICON);
        setTitleIcon(headerIcon);
        titleText = newElem(div, clHEADER_TITLE_TEXT);
        setTitle(title);
        titleCont.append(titleIcon);
        titleCont.append(titleText);

        header.append(close);
        header.append(titleCont);

        mainContent.append(header);

        ppBody = newElem(div, clBODY);
        ppBody.innerHTML = ppBodyPages.count > 0 ? 
                                ppBodyPages.pages[0] : 
                                '<h3>Empty HTML!</h3>';
        mainContent.append(ppBody);

        if (showFooter !== false) {
            footer = newElem(div, clFOOTER);
            footerButtons = newElem(div, clFOOTER_BUTTONS);
            if (showCancelButton) {
                btnCancel = newElem(btn, clBTN_CANCEL, 'zpopup-Cancel');
                btnCancel.innerHTML = cancelButtonText ?? 'CANCEL';
                btnCancel.addEventListener('click', () => {
                    closePopUp(evtCancel);
                });
                footerButtons.append(btnCancel);
            }
            if (showOkButton) {
                btnOk = newElem(btn, clBTN_OK, 'zpopup-Ok');
                btnOk.innerHTML = okButtonText ?? 'OK';
                btnOk.addEventListener('click', async () => {
                    closePopUp(evtOk);
                });
                footerButtons.append(btnOk);
            }
            if (showPrevButton) {
                btnPrev = newElem(btn, clBTN_PREV, 'zpopup-prev');
                if (prevButtonText) {
                    btnPrev.innerHTML = prevButtonText;
                }
                else {
                    btnPrev.append(newElem(icon, getIcon(clBTN_PREV[1])));
                }
                footerButtons.append(btnPrev);
            }
            if (showNextButton) {
                btnNext = newElem(btn, clBTN_NEXT, 'zpopup-next');
                if (nextButtonText) {
                    btnNext.innerHTML = nextButtonText;
                }
                else {
                    btnNext.append(newElem(icon, getIcon(clBTN_NEXT[1])));
                }
                footerButtons.append(btnNext);
            }
            if (footerButtons.childElementCount > 0) {

                footer.append(footerButtons);
            }
        }
        
        if (footer.childElementCount > 0) {
            mainContent.append(footer); 
        }
    })();
    /* END CONSTRUCTOR */
    
    function updateRootVars() {
        const root = document.documentElement;
        if (color) { root.style.setProperty(VAR_COLOR, color); }
        if (accentColor) { root.style.setProperty(VAR_ACCENT_COLOR, accentColor); }
        if (popUpBackground) { root.style.setProperty(VAR_MAIN_BACKGROUND, popUpBackground); }
        if (buttonTextColor) { root.style.setProperty(VAR_BUTTON_TXT_COLOR, buttonTextColor); }
        if (width) { root.style.setProperty(VAR_WIDTH, width); }
        if (zIndex) { root.style.setProperty(VAR_Z_INDEX, zIndex); }
    }

    function newElem(elem, classes = [], id = '') {
        const res = document.createElement(elem);
        classes.forEach(className => {
            res.classList.add(className);
        });
        if (id) { res.id = id; }
        return res;
    }

    async function closePopUp(evt = '') { 
        switch (evt) {
            case evtOk:
                await checkBefore(beforeConfirmCB);
                break;
            case evtCancel:
                await checkBefore(beforeCancelCB);
                break;
            case evtClose:
                await checkBefore(beforeCloseCB);
                break;
            default: await hide();
        }
    }

    async function checkBefore(action) {
        try {
            let res = await action();
            if (res === true) {
                await hide();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function hide(timeout = 200) {
        container.style.background = 'transparent';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.opacity = '0';
        return new Promise(resolve => setTimeout(() => {
            resolve(fadeOut());
        }, timeout));
    }
    
    async function show(timeout = 150) {
        if (!document.querySelector(`.${clCONTAINER.join('.')}`)) {
            document.body.append(container);
        }
        container.classList.add('show')
        return new Promise((resolve) => setTimeout(() => {
            resolve(fadeIn());
        }, timeout));
    }
    
    function fadeIn() {
        container.style.background = backColor;
        mainContent.style.transform = 'translateY(-10px)';
        mainContent.style.opacity = '1';
        
    }
    
    function fadeOut() {
        container.classList.remove(SHOW);
    }
    
    async function onBeforeClose(cb = null) {
        if (typeof cb === 'function') {
            beforeCloseCB = cb;
        }
        else {
            beforeCloseCB = function() { 
                return typeof cb === 'boolean' ? cb : true; 
            };
        }
    }

    function onBeforeConfirm(cb = null) {
        if (typeof cb === 'function') {
            beforeConfirmCB = cb;
        }
        else {
            beforeConfirmCB = function() { 
                return typeof cb === 'boolean' ? cb : true; 
            };
        }
    }

    async function onBeforeCancel(cb = null) {
        if (typeof cb === 'function') {
            beforeCancelCB = cb;
        }
        else {
            beforeCancelCB = function() { 
                return typeof cb === 'boolean' ? cb : true; 
            };
        }
    }

    function setTitle(text) {
        if (text === '') { setHidden(titleText); }
        else { titleText.innerHTML = text; }
    }

    function setTitleIcon(ico) {
        if (getIcon(ico) !== '') {
            setVisible(titleIcon);
            if (titleIcon.childElementCount > 0) { titleIcon.firstElementChild.remove(); }
            titleIcon.append(newElem(icon, getIcon(ico)));
        }
        else {
            setHidden(titleIcon);
        } 
    }

    function getIcon(icon) {
        let ico = '';
        switch (icon) {
            case 'correct': ico = ['zpopup-correct'];
                break;
            case 'wrong': ico = ['zpopup-wrong'];
                break;
            case 'comment': ico = ['zpopup-comment'];
                break;
            case 'danger': ico = ['zpopup-danger'];
                break;
            case 'info': ico = ['zpopup-info'];
                break;
            case 'mail': ico = ['zpopup-mail'];
                break;
            case 'pin': ico = ['zpopup-pin'];
                break;
            case 'btn-next': ico = ['zpopup-next'];
                break;
            case 'btn-prev': ico = ['zpopup-prev'];
                break;
        }
        return ico;
    }

    function addPage(html) {
        if (!html) { return false; }
        ppBodyPages.count ++;
        ppBodyPages.pages.push(html);
    }

    function setHidden(elem) {
        elem.classList.add(clHIDDEN);
    }

    function setVisible(elem) {
        elem.classList.remove(clHIDDEN);
    }

    return {
        show: show,
        onBeforeClose: onBeforeClose,
        onBeforeConfirm: onBeforeConfirm,
        onBeforeCancel: onBeforeCancel,
        setTitle: setTitle,
        setTitleIcon: setTitleIcon
    }
}