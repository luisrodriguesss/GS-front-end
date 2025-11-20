document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  function closeMenu() {
    if (menu) menu.classList.remove('menu-open');
    if (toggle) {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('menu-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('menu-open')) {
        closeMenu();
      }
    });

    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeMenu()));
  }

  const form = document.querySelector(".formulario-contato");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const assunto = document.getElementById("assunto");
  const mensagem = document.getElementById("mensagem");

  function mostrarErro(campo, mensagem) {
    campo.style.borderColor = "#ff4d4d";

    let erro = campo.parentElement.querySelector(".erro-msg");

    if (!erro) {
      erro = document.createElement("small");
      erro.classList.add("erro-msg");
      erro.style.color = "#ff4d4d";
      erro.style.marginTop = "4px";
      campo.parentElement.appendChild(erro);
    }

    erro.innerText = mensagem;
  }

  function limparErro(campo) {
    campo.style.borderColor = "#e0f7fa";

    const erro = campo.parentElement.querySelector(".erro-msg");
    if (erro) erro.remove();
  }

  [nome, email, telefone, assunto, mensagem].forEach(campo => {
    campo.addEventListener("input", () => limparErro(campo));
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valido = true;

    if (nome.value.trim() === "") {
      mostrarErro(nome, "Digite seu nome completo.");
      valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      mostrarErro(email, "Digite um email válido.");
      valido = false;
    }

    if (assunto.value === "") {
      mostrarErro(assunto, "Selecione um assunto.");
      valido = false;
    }

    if (mensagem.value.trim().length < 10) {
      mostrarErro(mensagem, "A mensagem deve ter pelo menos 10 caracteres.");
      valido = false;
    }

    if (valido) {
      alert("Mensagem enviada com sucesso!");
      form.reset();
    }
  });


});
