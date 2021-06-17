document.addEventListener('DOMContentLoaded', () => {

    "use strict";
    // ----------------- variables 
    const header = document.querySelector(".hero__title");
    const nameInput = document.querySelector(".form__name");
    const emailInput = document.querySelector(".form__email");
    const inputWrap = document.querySelector(".form__input-wrapper");
    const ancors = document.querySelectorAll(".header__nav-item, .hero__link-more");
    const form = document.querySelector(".form");
    const responseBlock = document.querySelector(".response");
    const responseText = document.querySelector(".response__container p");
    const button = document.querySelector(".form__btn");
    
    // create new elemenet for type another content in header
    let string = document.createElement('h1');
    string.innerHTML = `Front-end developer`;
    
    // ----------------- functions
    
    // ancors move block
    ancors.forEach((el) => {
        el.addEventListener("click", (event) => {
            event.preventDefault();
    
            let ancor = el.getAttribute('href').slice(1);
    
            document.getElementById(ancor).scrollIntoView({
                block: 'start',
                behavior: 'smooth',
            });
        });
    });

    const checkValueOfInput = () => {
        if (nameInput.value !== '' || emailInput.value !== '') {
            button.disabled = false;
        } else {
            button.disabled = true;
            return;
        }
    };
    
    // check inputs
    const checkName = (event) => {
        nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-Я]+$/g, '');

        event.preventDefault();
    };

    // const checkEmail = (event) => {
        
    //     if (emailInput.value !== '') {
    //         button.disabled = false;
    //     } else {
    //         button.disabled = true;
    //         return;
    //     }

    //     event.preventDefault();
    // };

    // type text function
    function typeText () {
        let design = header.textContent;
        let front = string.textContent;
        let i = 0;
    
        
        let funcType = function () {
            if (i <= design.length) {
                header.innerHTML = header.textContent;
                header.innerHTML = design.substring(0, i);
                setTimeout(funcType, 200);
            }        
            i++;
        };
    
        let funcClear = function () {
            if (i >= 0) {
                header.innerHTML = design.substring(0, i);
                setTimeout(funcClear, 100);
            }
            i--;
        }
    
        let frontType = function () {
            if(i <= front.length) {
                header.innerHTML = front.substring(0, i);
                setTimeout(frontType, 200);
            }
            i++;
        }
    
        let frontClear = function () {
            if(i >= 0) {
                header.innerHTML = front.substring(0, i);
                setTimeout(frontClear, 100);
            }
            i--;
        };
        
        let callFunctions = setTimeout(function tick() {
            funcType();
            setTimeout(funcClear, 5000);
            setTimeout(frontType, 7000);
            setTimeout(frontClear, 15000);
            callFunctions = setTimeout(tick, 18000);
        }, 18000);
        
        funcType();
        setTimeout(funcClear, 5000);
        setTimeout(frontType, 7000);
        setTimeout(frontClear, 15000);
    };

    const addClass = function () {
        responseBlock.classList.toggle('response--active');
    };
    
    const formSend = () => {
        
        const statusError = "Ooops, something wrong"

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (nameInput.value !== '') {
                // nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-Я]+$/g, '');
                button.disabled = false;
            } else {
                button.disabled = true;
                return;
            }

            if (emailInput.value !== '') {
                button.disabled = false;
            } else {
                button.disabled = true;
                return;
            }

            let xhr = new XMLHttpRequest();
            
            xhr.open('POST', './send.php');
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            let formData = new FormData(form);
            let objectData = {};

            formData.forEach((elem, i) => {
                objectData[i] = elem;
            });

            xhr.send(JSON.stringify(objectData));

            xhr.addEventListener('readystatechange', () => {
                if (xhr.status === 200) {
                    addClass(setTimeout(addClass, 4000));
                    form.reset();
                } 
                if (xhr.status === 404) {
                    addClass(setTimeout(addClass, 4000));
                    responseText.textContent = statusError;
                }
            });

        });
    };
    
    // ------------ functions calls
    typeText();
    checkValueOfInput();
    formSend();
    
    // ------------ eventListeners 
    // emailInput.addEventListener("input", checkEmail);
    nameInput.addEventListener("input", checkName);
    inputWrap.addEventListener("input", checkValueOfInput);
});