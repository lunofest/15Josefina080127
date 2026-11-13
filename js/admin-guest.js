/* =========================================================
 * Acceso privado a la planilla de confirmaciones
 * =======================================================*/
(function () {
    'use strict';

    /* Contraseña de acceso (hardcodeada) */
    var ADMIN_PASSWORD = 'Josefina26';

    /* Planilla de Google Sheets */
    var SHEET_URL = 'https://docs.google.com/spreadsheets/d/1gvtShs2ZCK_QQPY8uowhgjAJ6yOjLStYz-pR5iA6gk0/edit?gid=0#gid=0';

    var openBtn = document.getElementById('admin_guest_open');
    var modal = document.getElementById('admin_guest_modal');
    var input = document.getElementById('admin_guest_pass');
    var error = document.getElementById('admin_guest_error');
    var acceptBtn = document.getElementById('admin_guest_accept');
    var cancelBtn = document.getElementById('admin_guest_cancel');
    var toggleBtn = document.getElementById('admin_guest_toggle');

    if (!openBtn || !modal || !input || !acceptBtn || !cancelBtn || !toggleBtn) return;

    function mostrarClave(visible) {
        input.type = visible ? 'text' : 'password';
        toggleBtn.textContent = visible ? 'Ocultar' : 'Ver';
        toggleBtn.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    }

    function abrirModal() {
        error.hidden = true;
        input.value = '';
        mostrarClave(false);
        modal.hidden = false;
        setTimeout(function () {
            input.focus();
        }, 30);
    }

    function cerrarModal() {
        modal.hidden = true;
        input.value = '';
        error.hidden = true;
        mostrarClave(false);
    }

    function aceptar() {
        if (input.value.trim() === ADMIN_PASSWORD) {
            window.open(SHEET_URL, '_blank', 'noopener');
            cerrarModal();
        } else {
            error.hidden = false;
            input.select();
        }
    }

    openBtn.addEventListener('click', abrirModal);
    cancelBtn.addEventListener('click', cerrarModal);
    acceptBtn.addEventListener('click', aceptar);

    toggleBtn.addEventListener('click', function () {
        mostrarClave(input.type === 'password');
        input.focus();
    });

    modal.addEventListener('click', function (event) {
        if (event.target.hasAttribute('data-admin-close')) {
            cerrarModal();
        }
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            aceptar();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modal.hidden) {
            cerrarModal();
        }
    });
})();
