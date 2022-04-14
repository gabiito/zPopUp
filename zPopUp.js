function zPopUp({
    accentColor = null,
    backColor = 'rgba(0,0,0,.4)',
    buttonTextColor = null,
    cancelButtonText = null,
    color = null,
    customClass = '',
    headerBorder = true,
    headerIcon = null,
    html = '',
    htmlPages = [],
    lastPageButtonText = null,
    mainFont = null,
    nextButtonText = null,
    okButtonText = null,
    outsideClick = 'close',
    popUpBackground = null,
    prevButtonText = null,
    showCancelButton = true,
    showFooter = true,
    showNextButton = false,
    showOkButton = true,
    showPrevButton = false,
    title = '',
    width = null,
    zIndex = null,
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
    const clFOOTER = ['zpopup__footer'];
    const clFOOTER_BUTTONS = ['zpopup__footer__buttons'];
    const clBODY = ['zpopup__body'];
    const clBTN_OK = ['zpopup-btn', 'btn-ok'];
    const clBTN_CANCEL = ['zpopup-btn', 'btn-cancel'];
    const clBTN_PREV = ['zpopup-btn', 'btn-prev'];
    const clBTN_NEXT = ['zpopup-btn', 'btn-next'];
    const clSPINNER_WRAPPER = ['zpopup__spinner__wrapper', 'hidden'];
    const clSPINNER = ['zpopup-spinner'];
    const inSPINNER = `<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>`;
    const clALERT_WRAPPER = ['zpopup__alert__wrapper'];
    const clALERT = ['zpopup__alert'];
    const clALERT_MSG = ['zpopup__alert-msg'];

    //Custom definitions
    const VAR_FONT = '--zpopup-main-font';
    const VAR_COLOR = '--zpopup-color';
    const VAR_ACCENT_COLOR = '--zpopup-accent-color';
    const VAR_MAIN_BACKGROUND = '--zpopup-main-background';
    const VAR_BUTTON_TXT_COLOR = '--zpopup-button-text-color';
    const VAR_WIDTH = '--zpopup-width';
    const VAR_Z_INDEX = '--zpopup-z-index';
    const clHIDDEN = 'hidden';
    const div = 'div';
    const btn = 'button';
    const span = 'span';
    const icon = 'i';
    const SHOW = 'show';
    const evtClose = 'close';
    const evtCancel = 'cancel';
    const evtOk = 'ok';
    const evtNext = 'next';
    const evtPrev = 'prev';

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
    let spinnerWrapper;
    let spinner;
    let alertWrapper;
    let alert;

    let ppBodyPages = {
        count: 0,
        pages: [],
        on: 0
    };

    let beforeCancelCB = function () {
        return new Promise(resolve => {
            resolve(true)
        });
    };

    let beforeConfirmCB = function () {
        return new Promise(resolve => {
            resolve(true)
        });
    };

    let beforeCloseCB = function () {
        return new Promise(resolve => {
            resolve(true)
        });
    };

    let beforeNextCB = function () {
        return new Promise(resolve => {
            resolve(true)
        });
    };

    let beforePrevCB = function () {
        return new Promise(resolve => {
            resolve(true)
        });
    };

    /* BEGIN CONSTRUCTOR */
    (function construct() {
        updateRootVars();
        container = newElem(div, clCONTAINER);
        container.addEventListener('click', (evt) => {
            if (outsideClick === evtClose && evt.target.classList.contains(clCONTAINER[1])) {
                if (!isAlertVisible()) {
                    closePopUp(evtClose);
                }
            }
        });
        mainContent = newElem(div, clMAIN_CONTENT);
        if (width) {
            mainContent.style.width = width;
        }
        container.append(mainContent);

        //HEADER
        header = newElem(div, clHEADER);
        if (!headerBorder) {
            header.style.border = 'none';
        }
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
            btnOk = newElem(btn, clBTN_OK, 'zpopup-Ok');
            btnOk.innerHTML = okButtonText ?? 'OK';
            btnOk.addEventListener('click', async () => {
                closePopUp(evtOk);
            });
            footerButtons.append(btnOk);
            if (!showOkButton) {
                btnOk.innerText = lastPageButtonText ?? 'FINISH';
                setHidden(btnOk);
            }
            if (showPrevButton) {
                btnPrev = newElem(btn, clBTN_PREV, 'zpopup-prev');
                if (prevButtonText) {
                    btnPrev.innerHTML = prevButtonText;
                } else {
                    btnPrev.append(newElem(icon, getIcon(clBTN_PREV[1])));
                }
                btnPrev.addEventListener('click', () => {
                    changePage(evtPrev);
                });
                footerButtons.append(btnPrev);
            }
            if (showNextButton) {
                btnNext = newElem(btn, clBTN_NEXT, 'zpopup-next');
                if (nextButtonText) {
                    btnNext.innerHTML = nextButtonText;
                } else {
                    btnNext.append(newElem(icon, getIcon(clBTN_NEXT[1])));
                }
                btnNext.addEventListener('click', () => {
                    changePage(evtNext);
                });
                footerButtons.append(btnNext);
            }
            if (footerButtons.childElementCount > 0) {
                
                footer.append(footerButtons);
            }
        }
        
        if (footer && footer.childElementCount > 0) {
            mainContent.append(footer);
        }
        
        //set body content
        if (htmlPages.length > 0) {
            htmlPages.forEach(page => {
                addPage(page);
            });
        } else if (html !== '') {
            addPage(html);
        }

        ppBody.innerHTML = ppBodyPages.count > 0 ?
            ppBodyPages.pages[ppBodyPages.on] :
            '<h3>Empty HTML!</h3>';

        //creating spinner
        spinnerWrapper = newElem(div, clSPINNER_WRAPPER);
        spinner = newElem(div, clSPINNER);
        spinner.innerHTML = inSPINNER;
        spinnerWrapper.append(spinner);

    })();

    /* END CONSTRUCTOR */

    function updateRootVars() {
        const root = document.documentElement;
        if (mainFont) {
            root.style.setProperty(VAR_FONT, mainFont);
        }
        if (color) {
            root.style.setProperty(VAR_COLOR, color);
        }
        if (accentColor) {
            root.style.setProperty(VAR_ACCENT_COLOR, accentColor);
        }
        if (popUpBackground) {
            root.style.setProperty(VAR_MAIN_BACKGROUND, popUpBackground);
        }
        if (buttonTextColor) {
            root.style.setProperty(VAR_BUTTON_TXT_COLOR, buttonTextColor);
        }
        if (width) {
            root.style.setProperty(VAR_WIDTH, width);
        }
        if (zIndex) {
            root.style.setProperty(VAR_Z_INDEX, zIndex);
        }
    }

    function newElem(elem, classes = [], id = '') {
        const res = document.createElement(elem);
        if (classes.length > 0) {
            classes.forEach(className => {
                res.classList.add(className);
            });
        }
        if (id) {
            res.id = id;
        }
        return res;
    }


    async function closePopUp(evt = '') {
        let res = false;
        switch (evt) {
            case evtOk:
                res = await checkBefore(beforeConfirmCB);
                break;
            case evtCancel:
                res = await checkBefore(beforeCancelCB);
                break;
            case evtClose:
                res = await checkBefore(beforeCloseCB);
                break;
            default:
                await hide();
        }
        if (res === true) {
            await hide();
        }
    }

    async function checkBefore(action) {
        try {
            let res = await action();
            return new Promise(resolve => {
                resolve(res === true)
            });
        } catch (err) {
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
        if (ppBodyPages.count > 1 && ppBodyPages.on === 0) {
            setHidden(btnPrev);
        } else {
            if (btnPrev) {
                setVisible(btnPrev);
            }
        }
        container.classList.add('show')
        return new Promise((resolve) => setTimeout(() => {
            resolve(fadeIn());
        }, timeout));
    }

    function remove() {
        if (container) {
            container.remove();
        }
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
        } else {
            beforeCloseCB = function () {
                return typeof cb === 'boolean' ? cb : true;
            };
        }
    }

    function onBeforeConfirm(cb = null) {
        if (typeof cb === 'function') {
            beforeConfirmCB = cb;
        } else {
            beforeConfirmCB = function () {
                return typeof cb === 'boolean' ? cb : true;
            };
        }
    }

    async function onBeforeCancel(cb = null) {
        if (typeof cb === 'function') {
            beforeCancelCB = cb;
        } else {
            beforeCancelCB = function () {
                return typeof cb === 'boolean' ? cb : true;
            };
        }
    }

    async function onBeforeNext(cb = null) {
        if (typeof cb === 'function') {
            beforeNextCB = cb;
        } else {
            beforeNextCB = function () {
                return typeof cb === 'boolean' ? cb : true;
            };
        }
    }

    async function onBeforePrev(cb = null) {
        if (typeof cb === 'function') {
            beforePrevCB = cb;
        } else {
            beforePrevCB = function () {
                return (typeof cb === 'boolean') ? cb : true;
            };
        }
    }


    function setTitle(text) {
        if (text === '') {
            setHidden(titleText);
        } else {
            titleText.innerText = text;
        }
    }

    function setTitleIcon(ico) {
        if (getIcon(ico) !== '') {
            setVisible(titleIcon);
            if (titleIcon.childElementCount > 0) {
                titleIcon.firstElementChild.remove();
            }
            titleIcon.append(newElem(icon, getIcon(ico)));
        } else {
            setHidden(titleIcon);
        }
    }

    function getIcon(icon) {
        let ico = '';
        switch (icon) {
            case 'correct':
                ico = ['zpopup-correct'];
                break;
            case 'wrong':
                ico = ['zpopup-wrong'];
                break;
            case 'comment':
                ico = ['zpopup-comment'];
                break;
            case 'danger':
                ico = ['zpopup-danger'];
                break;
            case 'info':
                ico = ['zpopup-info'];
                break;
            case 'mail':
                ico = ['zpopup-mail'];
                break;
            case 'pin':
                ico = ['zpopup-pin'];
                break;
            case 'btn-next':
                ico = ['zpopup-next'];
                break;
            case 'btn-prev':
                ico = ['zpopup-prev'];
                break;
        }
        return ico;
    }

    function getIconsNames() {
        return ['correct', 'wrong', 'comment', 'danger', 'info', 'mail', 'pin', 'btn-next', 'btn-prev'];
    }

    function setHidden(elem) {
        elem.classList.add(clHIDDEN);
    }

    function setVisible(elem) {
        elem.classList.remove(clHIDDEN);
    }

    function setButtonText(btn, text) {
        if (text === '') {
            return;
        }
        switch (btn) {
            case clBTN_OK[1]:
                btnOk.innerText = text;
                break;
            case clBTN_CANCEL[1]:
                btnCancel.innerText = text;
                break;
            case clBTN_NEXT[1]:
                btnNext.innerText = text;
                break;
            case clBTN_PREV[1]:
                btnPrev.innerText = text;
        }
    }

    function showAlert(msg = '', {
        ico = null,
        timeout = 4
    } = {}) {
        if (msg === '') {
            return;
        }
        alertWrapper = newElem(div, clALERT_WRAPPER);
        alert = newElem(div, clALERT);
        if (ico) {
            let i = newElem(icon, getIcon(ico));
            alert.append(i);
        }
        let m = newElem(span, clALERT_MSG);
        m.innerText = msg;
        alert.append(m);
        alertWrapper.append(alert);
        mainContent.append(alertWrapper);
        setTimeout(() => {
            alertWrapper.remove();
        }, timeout * 1000);
    }

    function isAlertVisible() {
        let res = false;
        mainContent.childNodes.forEach(child => {
            if (child.classList.contains(clALERT_WRAPPER[0])) {
                res = true;
            }
        })
        return res;
    }

    function addPage(html) {
        if (!html) {
            return false;
        }
        if (isLastPage()) {
            console.log('last page');
            setVisible(btnNext);
            setHidden(btnOk);
        }
        ppBodyPages.count++;
        ppBodyPages.pages.push(html);
        return true;
    }

    async function changePage(direction) {
        if (direction === evtNext) {
            await showSpinner();
            let res = await checkBefore(beforeNextCB)
            if (res === true) {
                nextPage();
                setVisible(btnPrev);
            }
            hideSpinner();
        } else if (direction === evtPrev) {
            await showSpinner();
            let res = await checkBefore(beforePrevCB)
            if (res === true) {
                prevPage();
            }
            if (ppBodyPages.on === 0) {
                setHidden(btnPrev);
            } else {
                setVisible(btnPrev);
            }

            hideSpinner();
        }
    }

    function showSpinner() {
        let exist = false;
        mainContent.childNodes.forEach(node => {
            if (node === spinnerWrapper) {
                exist = true;
            }
        });
        if (!exist) {
            mainContent.append(spinnerWrapper);
        }
        return new Promise(resolve => {
            setVisible(spinnerWrapper);
            setTimeout(() => {
                spinner.style.opacity = '1';
                resolve(true);
            }, 100);
        });
    }

    function hideSpinner() {
        spinner.style.opacity = '0';
        setTimeout(() => {
            setHidden(spinnerWrapper);
        }, 200);
    }

    function getPageID() {
        return ppBodyPages.on;
    }

    function getPageCount() {
        return ppBodyPages.count;
    }

    function hasNextPage() {
        return ppBodyPages.count - 1 > ppBodyPages.on;
    }

    function hasPrevPage() {
        return ppBodyPages.on > 0;
    }

    function isLastPage() {
        return ppBodyPages.on + 1 === ppBodyPages.count;
    }

    function nextPage() {
        if (hasNextPage()) {
            ppBodyPages.on++;
            ppBody.innerHTML = ppBodyPages.pages[ppBodyPages.on];
            if (isLastPage()) {
                setVisible(btnOk);
                setHidden(btnNext);
            }
            return true;
        } else {
            return false;
        }
    }

    function prevPage() {
        if (hasPrevPage()) {
            ppBodyPages.on--;
            ppBody.innerHTML = ppBodyPages.pages[ppBodyPages.on];
            if (!isLastPage()) {
                setHidden(btnOk);
                setVisible(btnNext);
            }
            return true;
        } else {
            return false;
        }
    }

    return {
        addPage: addPage,
        avaibleIcons: getIconsNames,
        getPageID: getPageID,
        getPageCount: getPageCount,
        hide: hide,
        hideSpinner: hideSpinner,
        onBeforeCancel: onBeforeCancel,
        onBeforeClose: onBeforeClose,
        onBeforeConfirm: onBeforeConfirm,
        onBeforeNext: onBeforeNext,
        onBeforePrev: onBeforePrev,
        remove: remove,
        setTitle: setTitle,
        setTitleIcon: setTitleIcon,
        setButtonText: setButtonText,
        show: show,
        showAlert: showAlert,
        showSpinner: showSpinner
    }
}